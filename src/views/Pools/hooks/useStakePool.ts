import { useCallback } from 'react'
import { stakeFarm, enterStakingWithPermit } from 'utils/calls'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { useMasterchef, useSousChef, usePairContract } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import tokens from 'config/constants/tokens'
import { Contract } from '@ethersproject/contracts'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { splitSignature } from '@ethersproject/bytes'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { getDecimalAmount } from 'utils/formatBalance'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), {
    ...options,
    gasPrice,
  })
}

const sousStakeBnb = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), {
    ...options,
    gasPrice,
  })
}

const useStakePool = (sousId: number, isUsingBnb = false, isMasterChef = false, isMirror = false) => {
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const { account, chainId, library } = useActiveWeb3React()
  // token contract
  const babelContract: Contract | null = usePairContract(tokens.cake.address)
  const mirrorContract: Contract | null = usePairContract(tokens.mirror.address)
  const deadline = useTransactionDeadline()

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0 || isMasterChef) {
        if(sousId === 0) {
          // try to gather a signature for permission
          const nonce = await (isMirror?mirrorContract:babelContract).nonces(account)
          const EIP712Domain = [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ]
          const domain = {
            name: (isMirror?tokens.mirror:tokens.cake).name,
            version: '1',
            chainId,
            verifyingContract: isMirror?tokens.mirror.address:tokens.cake.address,
          }
          const Permit = [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
          ]
          const message = {
            owner: account,
            spender: getMasterChefAddress(),
            value: getDecimalAmount(new BigNumber(amount)),
            nonce: nonce.toHexString(),
            deadline: deadline.toNumber(),
          }
          const data = JSON.stringify({
            types: {
              EIP712Domain,
              Permit,
            },
            domain,
            primaryType: 'Permit',
            message,
          })
          try{
            const signature = await library.send('eth_signTypedData_v4', [account, data]).then(splitSignature) 
            // return babelContract.permit(account, getMasterChefAddress(), getDecimalAmount(new BigNumber(amount)).toString(), deadline.toNumber(), signature.v, signature.r, signature.s)       
            return enterStakingWithPermit(masterChefContract, isMirror, amount, deadline, signature.v, signature.r, signature.s)
          }catch(ex){
            return
          }
        }
        return stakeFarm(masterChefContract, sousId, amount, BIG_TEN.pow(decimals), isMirror)
      }
      if (isUsingBnb) {
        return sousStakeBnb(sousChefContract, amount)
      }
      return sousStake(sousChefContract, amount, decimals)
    },
    [isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStakePool
