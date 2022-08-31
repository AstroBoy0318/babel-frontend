import BigNumber from 'bignumber.js'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Modal, LinkExternal, CalculateIcon, IconButton, Skeleton } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import { getInterestBreakdown } from 'utils/compoundApyHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

const TokenItems = styled(Flex) <{ selected?: boolean }>`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  :hover{
    background: ${({ theme }) => theme.colors.cardBorder};
  }
  ${({ selected, theme }) => (selected ? 'background: '.concat(theme.colors.cardBorder) : '')};
`

interface DepositModalProps {
  max: BigNumber
  stakedBalance: BigNumber
  multiplier?: string
  lpLabel?: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  tokenIDs: Array<Array<BigNumber>>
  addLiquidityUrl?: string
  cakePrice?: BigNumber
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  stakedBalance,
  onConfirm,
  onDismiss,
  tokenName = '',
  multiplier,
  lpLabel,
  addLiquidityUrl,
  cakePrice,
  tokenIDs
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()

  const lpTokensToStake = new BigNumber(val)

  return (
    <Modal title={t('Stake LP position NFT tokens')} onDismiss={onDismiss}>
      <Flex flexDirection="column" maxHeight={300} overflow="auto">
        {tokenIDs.map((ID) => {
          return (
            <TokenItems selected={val == ID[0].toString()} onClick={() => { setVal(ID[0].toString()) }}>
              Liquidity Amount: {getFullDisplayBalance(new BigNumber(ID[1].toString()))}
            </TokenItems>
          )
        })}
      </Flex>
      {/* <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={t('Stake')}
        decimals={0}
      /> */}
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          width="100%"
          disabled={
            pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || !lpTokensToStake.gt(0)
          }
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            onDismiss?.()
            setPendingTx(false)
          }}
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ModalActions>
      {/* <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {t('Get %symbol%', { symbol: tokenName })}
      </LinkExternal> */}
    </Modal>
  )
}

export default DepositModal
