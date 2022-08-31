import { FarmConfigBaseProps } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BIG_TEN, BIG_ZERO } from '../../utils/bigNumber'
import { fetchPublicFarmsData } from './fetchPublicNftFarmData'
import { fetchNftChefData } from './fetchNftChefData'
import { SerializedNftFarm } from '../types'

const fetchFarms = async (farmsToFetch: FarmConfigBaseProps[]): Promise<SerializedNftFarm[]> => {
  const farmResult = await fetchPublicFarmsData(farmsToFetch)
  const masterChefResult = await fetchNftChefData(farmsToFetch)

  return farmsToFetch.map((farm, index) => {
    const [tokenBalanceLP, lpTokenBalanceMC] =
      farmResult[index]

    const [info, totalAllocPoint] = masterChefResult[index]

    // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
    // const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

    // Raw amount of token in the LP, including those not staked
    // const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    // const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

    // Amount of quoteToken in the LP that are staked in the MC
    // const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

    // Total staked in LP, in quote token value
    // const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))

    const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

    return {
      ...farm,
      lpTotalSupply: new BigNumber(tokenBalanceLP[0].length).toJSON(),
      poolWeight: poolWeight.toJSON(),
      multiplier: `${allocPoint.div(100).toString()}X`,
    }
  })
}

export default fetchFarms
