import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Button, Flex, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchNftFarmUserDataAsync } from 'state/nftChef'
import { useRouter } from 'next/router'
import { useLpTokenPrice, usePriceCakeBusd } from 'state/farms/hooks'
import { useNftFarmUser } from 'state/nftChef/hooks'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import useUnstakeNftFarms from '../../hooks/useUnstakeNftFarms'
import useStakeNftFarms from '../../hooks/useStakeNftFarms'
import { NftFarmWithStakedValue } from '../types'
import StakedLP from '../StakedLP'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useNftChefContract, usePositionNftContract } from 'hooks/useContract'

interface FarmCardActionsProps extends NftFarmWithStakedValue {
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
  lpSymbol,
  pid,
  multiplier,
  addLiquidityUrl,
  lpLabel,
  lpTotalSupply,
  tokenAmountTotal,
}) => {
  const { t } = useTranslation()
  const { onStake, onStakeWithPermit } = useStakeNftFarms(pid)
  const { onUnstake } = useUnstakeNftFarms(pid)
  const { tokenBalance, tokenBalanceIDs, stakedBalance, stakedBalanceIDs } = useNftFarmUser(pid)
  const cakePrice = usePriceCakeBusd()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError } = useCatchTxError()
  const { account, chainId, library } = useActiveWeb3React()
  const deadline = useTransactionDeadline()
  const nftChefContract = useNftChefContract()
  const positionNftContract = usePositionNftContract()

  const handleStake = async (tokenID: string) => {
    // try to gather a signature for permission
    const nonce = await positionNftContract.nonces(tokenID)
    const name = await positionNftContract.name()
    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: name,
      version: '1',
      chainId,
      verifyingContract: positionNftContract.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
        owner: account,
        spender: nftChefContract.address,
        tokenId: tokenID,
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
        const signature = await library.send('eth_signTypedData_v4', [account, data])        
        const receipt = await fetchWithCatchTxError(() => {
          return onStakeWithPermit(tokenID, deadline.toNumber(), signature)
        })
        if (receipt?.status) {
          toastSuccess(
            `${t('Staked')}!`,
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Your funds have been staked in the farm')}
            </ToastDescriptionWithTx>,
          )
          dispatch(fetchNftFarmUserDataAsync({ account, pids: [pid] }))
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
      dispatch(fetchNftFarmUserDataAsync({ account, pids: [pid] }))
    }
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      tokenIDs={tokenBalanceIDs}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      multiplier={multiplier}
      lpLabel={lpLabel}
      addLiquidityUrl={addLiquidityUrl}
      cakePrice={cakePrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} tokenIDs={stakedBalanceIDs} onConfirm={handleUnstake} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => router.pathname.includes(item))}
      >
        {t('Stake NFT')}
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
        lpTotalSupply={lpTotalSupply}
        tokenSymbol="Babel"
        tokenAmountTotal={tokenAmountTotal}
      />
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
