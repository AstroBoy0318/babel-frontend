import { Heading, Flex } from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { useCallback } from 'react'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'

interface StackedLPProps {
  stakedBalance: BigNumber
  tokenSymbol: string
  lpTotalSupply: BigNumber
  tokenAmountTotal: BigNumber
}

const StakedLP: React.FunctionComponent<StackedLPProps> = ({
  stakedBalance,
  tokenSymbol,
  lpTotalSupply,
  tokenAmountTotal,
}) => {
  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance, 0)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(0, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance()}</Heading>
      {stakedBalance.gt(0) && (
        <>
          {/* <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={0}
            value={getBalanceNumber(stakedBalance,0)}
            unit=""
            prefix="~"
          /> */}
          {/* <Flex style={{ gap: '4px' }}>
            <Balance
              fontSize="12px"
              color="textSubtle"
              decimals={2}
              value={stakedBalance.div(lpTotalSupply).times(tokenAmountTotal).toNumber()}
              unit={` ${tokenSymbol}`}
            />
          </Flex> */}
        </>
      )}
    </Flex>
  )
}

export default StakedLP
