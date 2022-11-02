import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Button, Flex, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useRouter } from 'next/router'
import { useLpTokenPrice, useFarmUser, usePriceCakeBusd } from 'state/farms/hooks'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import useUnstakeFarms from '../../hooks/useUnstakeFarms'
import useStakeFarms from '../../hooks/useStakeFarms'
import { FarmWithStakedValue } from '../types'
import StakedLP from '../StakedLP'
import { useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { usePairContract, useMasterchef } from 'hooks/useContract'
import { Contract } from '@ethersproject/contracts'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { splitSignature } from '@ethersproject/bytes'
import { getDecimalAmount } from 'utils/formatBalance'
import { BigNumber } from 'bignumber.js'

interface FarmCardActionsProps extends FarmWithStakedValue {
  lpLabel?: string
  addLiquidityUrl?: string
  displayApr?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  lpAddresses,
  quoteToken,
  token,
  lpSymbol,
  pid,
  multiplier,
  apr,
  displayApr,
  addLiquidityUrl,
  lpLabel,
  lpTotalSupply,
  tokenAmountTotal,
  quoteTokenAmountTotal,
}) => {
  const { t } = useTranslation()
  const { onStake, onStakeWithPermit } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const { tokenBalance, stakedBalance } = useFarmUser(pid)
  const cakePrice = usePriceCakeBusd()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const lpPrice = useLpTokenPrice(lpSymbol)
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError } = useCatchTxError()
  const { account, chainId, library } = useActiveWeb3React()
  // pair contract
  const pairContract: Contract | null = usePairContract(lpAddresses[chainId])
  const deadline = useTransactionDeadline()

  const handleStake = async (amount: string) => {
    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account)
    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'BabelSwap LPs',
      version: '1',
      chainId,
      verifyingContract: lpAddresses[chainId],
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
      const receipt = await fetchWithCatchTxError(() => {
        return onStakeWithPermit(amount, deadline.toNumber(), signature.v, signature.r, signature.s)
      })
      if (receipt?.status) {
        toastSuccess(
          `${t('Staked')}!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Your funds have been staked in the farm')}
          </ToastDescriptionWithTx>,
        )
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      }
    }catch(ex){
      
    }
  }

  const handleUnstake = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => {
      return onUnstake(amount)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Unstaked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your earnings have also been harvested to your wallet')}
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    }
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      multiplier={multiplier}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr}
      displayApr={displayApr}
      addLiquidityUrl={addLiquidityUrl}
      cakePrice={cakePrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => router.pathname.includes(item))}
      >
        {t('Stake LP')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton
          variant="tertiary"
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => router.pathname.includes(item))}
        >
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <StakedLP
        stakedBalance={stakedBalance}
        lpSymbol={lpSymbol}
        quoteTokenSymbol={quoteToken.symbol}
        tokenSymbol={token.symbol}
        lpTotalSupply={lpTotalSupply}
        tokenAmountTotal={tokenAmountTotal}
        quoteTokenAmountTotal={quoteTokenAmountTotal}
      />
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
