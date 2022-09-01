import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { createSelector } from '@reduxjs/toolkit'
import { State, DeserializedNftFarm, SerializedNftFarm, DeserializedNftFarmUserData } from '../types'
import { deserializeToken } from 'state/user/hooks/helpers'

const selectFarmByKey = (key: string, value: string | number) => (state: State) =>
  state.nftFarms.data.find((f) => f[key] === value)
const deserializeFarmUserData = (farm: SerializedNftFarm): DeserializedNftFarmUserData => {
    return {
        tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
        tokenBalanceIDs: farm.userData ? farm.userData.tokenBalanceIDs : [],
        stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
        stakedBalanceIDs: farm.userData ? farm.userData.stakedBalanceIDs : [],
        earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
    }
}
const deserializeFarm = (farm: SerializedNftFarm): DeserializedNftFarm => {
    const { lpAddresses, lpSymbol, pid, dual, multiplier, isCommunity } = farm

    return {
        lpAddresses,
        lpSymbol,
        pid,
        dual,
        multiplier,
        isCommunity,
        token: deserializeToken(farm.token),
        quoteToken: deserializeToken(farm.quoteToken),
        userData: deserializeFarmUserData(farm),
        totalStakedLP: farm.totalStakedLP ? new BigNumber(farm.totalStakedLP) : BIG_ZERO,
        tokenAmountTotal: farm.tokenAmountTotal ? new BigNumber(farm.tokenAmountTotal) : BIG_ZERO,
        quoteTokenAmountTotal: farm.quoteTokenAmountTotal ? new BigNumber(farm.quoteTokenAmountTotal) : BIG_ZERO,
        lpTotalInQuoteToken: farm.lpTotalInQuoteToken ? new BigNumber(farm.lpTotalInQuoteToken) : BIG_ZERO,
        lpTotalSupply: farm.lpTotalSupply ? new BigNumber(farm.lpTotalSupply) : BIG_ZERO,
        tokenPriceVsQuote: farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO,
        poolWeight: farm.poolWeight ? new BigNumber(farm.poolWeight) : BIG_ZERO,
    }
}
export const farmSelector = createSelector(
    (state: State) => {
        return state.nftFarms
    },
    (nftFarms) => {
        const deserializedFarmsData = nftFarms.data.map(deserializeFarm)
        const { loadArchivedFarmsData, userDataLoaded, poolLength } = nftFarms
        return {
            loadArchivedFarmsData,
            userDataLoaded,
            data: deserializedFarmsData,
            poolLength,
        }
    },
)
export const makeUserFarmFromPidSelector = (pid: number) =>
    createSelector([selectFarmByKey('pid', pid)], (farm) => {
        const { userData } = deserializeFarm(farm)
        const { tokenBalance, tokenBalanceIDs, stakedBalance, stakedBalanceIDs, earnings } = userData
        return {
            tokenBalance,
            tokenBalanceIDs,
            stakedBalance,
            stakedBalanceIDs,
            earnings,
        }
    })