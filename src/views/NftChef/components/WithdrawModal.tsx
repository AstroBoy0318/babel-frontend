import BigNumber from 'bignumber.js'
import { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Flex } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'

const TokenItems = styled(Flex) <{ selected?: boolean }>`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  :hover{
    background: ${({ theme }) => theme.colors.cardBorder};
  }
  ${({ selected, theme }) => (selected ? 'background: '.concat(theme.colors.cardBorder) : '')};
`

interface WithdrawModalProps {
  max: BigNumber
  tokenIDs: Array<Array<BigNumber>>
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenIDs }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, 0)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  return (
    <Modal title={t('Unstake LP tokens')} onDismiss={onDismiss}>
      {/* <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={t('Unstake')}
      /> */}
      <Flex flexDirection="column" maxHeight={300} overflow="auto">
        {tokenIDs.map((ID) => {
          return (
            <TokenItems selected={val == ID[0].toString()} onClick={() => { setVal(ID[0].toString()) }}>
              Liquidity Amount: {getFullDisplayBalance(new BigNumber(ID[1].toString()))}
            </TokenItems>
          )
        })}
      </Flex>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || !valNumber.gt(0)}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            onDismiss?.()
            setPendingTx(false)
          }}
          width="100%"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
