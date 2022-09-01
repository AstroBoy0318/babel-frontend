import type {
    UnknownAsyncThunkFulfilledAction,
    UnknownAsyncThunkPendingAction,
    UnknownAsyncThunkRejectedAction,
    // eslint-disable-next-line import/no-unresolved
  } from '@reduxjs/toolkit/dist/matchers'
  import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
  import stringify from 'fast-json-stable-stringify'
  import nftchef from 'config/constants/nftchef'
  import isArchivedPid from 'utils/farmHelpers'
  import type { AppState } from 'state'
  import priceHelperLpsConfig from 'config/constants/priceHelperLps'
  import fetchFarms from './fetchNftFarms'
  import {
    fetchFarmUserEarnings,
    fetchFarmUserTokenBalances,
    fetchFarmUserStakedBalances,
  } from './fetchNftFarmUser'
  import { SerializedNftFarm, SerializedNftFarmsState } from '../types'
  import { fetchNftChefFarmPoolLength } from './fetchNftChefData'
  import { resetUserState } from '../global/actions'
import { BigNumber } from '@ethersproject/bignumber'
import getFarmsPrices from './getNftFarmsPrices'
  
  const noAccountFarmConfig = nftchef.map((farm) => ({
    ...farm,
    userData: {
      tokenBalance: '0',
      tokenBalanceIDs: new Array<Array<BigNumber>>(),
      stakedBalance: '0',
      stakedBalanceIDs: new Array<Array<BigNumber>>(),
      earnings: '0',
    },
  }))
  
  const initialState: SerializedNftFarmsState = {
    data: noAccountFarmConfig,
    loadArchivedFarmsData: false,
    userDataLoaded: false,
    loadingKeys: {},
  }
  
  export const nonArchivedFarms = nftchef
  
  // Async thunks
  export const fetchNftFarmsPublicDataAsync = createAsyncThunk<
    [SerializedNftFarm[], number],
    number[],
    {
      state: AppState
    }
  >(
    'nftchef/fetchNftFarmsPublicDataAsync',
    async (pids) => {
      const poolLength = await fetchNftChefFarmPoolLength()
      const farmsToFetch = nftchef.filter((farmConfig) => pids.includes(farmConfig.pid))
      const farmsCanFetch = farmsToFetch.filter((f) => poolLength.gt(f.pid))
  
      // Add price helper farms
      // const farmsWithPriceHelpers = farmsCanFetch.concat(priceHelperLpsConfig)
      const farmsWithPriceHelpers = farmsCanFetch
      const farms = await fetchFarms(farmsWithPriceHelpers)
  
      // Filter out price helper LP config farms
      return [farms, poolLength.toNumber()]
    },
    {
      condition: (arg, { getState }) => {
        const { farms } = getState()
        if (farms.loadingKeys[stringify({ type: fetchNftFarmsPublicDataAsync.typePrefix, arg })]) {
          console.debug('farms action is fetching, skipping here')
          return false
        }
        return true
      },
    },
  )
  
  interface FarmUserDataResponse {
    pid: number
    tokenBalance: string
    tokenBalanceIDs: Array<Array<BigNumber>>
    stakedBalance: string
    stakedBalanceIDs: Array<Array<BigNumber>>
    earnings: string
  }
  
  export const fetchNftFarmUserDataAsync = createAsyncThunk<
    FarmUserDataResponse[],
    { account: string; pids: number[] },
    {
      state: AppState
    }
  >(
    'nftchef/fetchNftFarmUserDataAsync',
    async ({ account, pids }) => {
      const poolLength = await fetchNftChefFarmPoolLength()
      const farmsToFetch = nftchef.filter((farmConfig) => pids.includes(farmConfig.pid))
      const farmsCanFetch = farmsToFetch.filter((f) => poolLength.gt(f.pid))
      const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsCanFetch)
      const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsCanFetch)
      const userFarmEarnings = await fetchFarmUserEarnings(account, farmsCanFetch)
  
      return userFarmEarnings.map((balance, index) => {
        return {
          pid: farmsCanFetch[index].pid,
          tokenBalance: userFarmTokenBalances[0][index],
          tokenBalanceIDs: userFarmTokenBalances[1][index],
          stakedBalance: userStakedBalances[0][index],
          stakedBalanceIDs: userStakedBalances[1][index],
          earnings: userFarmEarnings[index],
        }
      })
    },
    {
      condition: (arg, { getState }) => {
        const { farms } = getState()
        if (farms.loadingKeys[stringify({ type: fetchNftFarmUserDataAsync.typePrefix, arg })]) {
          console.debug('farms user action is fetching, skipping here')
          return false
        }
        return true
      },
    },
  )
  
  type UnknownAsyncThunkFulfilledOrPendingAction =
    | UnknownAsyncThunkFulfilledAction
    | UnknownAsyncThunkPendingAction
    | UnknownAsyncThunkRejectedAction
  
  const serializeLoadingKey = (
    action: UnknownAsyncThunkFulfilledOrPendingAction,
    suffix: UnknownAsyncThunkFulfilledOrPendingAction['meta']['requestStatus'],
  ) => {
    const type = action.type.split(`/${suffix}`)[0]
    return stringify({
      arg: action.meta.arg,
      type,
    })
  }
  
  export const nftFarmsSlice = createSlice({
    name: 'nftFarms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(resetUserState, (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state.data = state.data.map((farm) => {
          return {
            ...farm,
            userData: {
              tokenBalance: '0',
              tokenBalanceIDs: new Array<Array<BigNumber>>(),
              stakedBalance: '0',
              stakedBalanceIDs: new Array<Array<BigNumber>>(),
              earnings: '0',
            },
          }
        })
        state.userDataLoaded = false
      })
      // Update farms with live data
      builder.addCase(fetchNftFarmsPublicDataAsync.fulfilled, (state, action) => {
        const [farmPayload, poolLength] = action.payload
        state.data = state.data.map((farm) => {
          const liveFarmData = farmPayload.find((farmData) => farmData.pid === farm.pid)
          return { ...farm, ...liveFarmData }
        })
        state.poolLength = poolLength
      })
  
      // Update farms with user data
      builder.addCase(fetchNftFarmUserDataAsync.fulfilled, (state, action) => {
        action.payload.forEach((userDataEl) => {
          const { pid } = userDataEl
          const index = state.data.findIndex((farm) => farm.pid === pid)
          state.data[index] = { ...state.data[index], userData: userDataEl }
        })
        state.userDataLoaded = true
      })
  
      builder.addMatcher(isAnyOf(fetchNftFarmUserDataAsync.pending, fetchNftFarmsPublicDataAsync.pending), (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
      })
      builder.addMatcher(
        isAnyOf(fetchNftFarmUserDataAsync.fulfilled, fetchNftFarmsPublicDataAsync.fulfilled),
        (state, action) => {
          state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
        },
      )
      builder.addMatcher(
        isAnyOf(fetchNftFarmsPublicDataAsync.rejected, fetchNftFarmUserDataAsync.rejected),
        (state, action) => {
          state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
        },
      )
    },
  })
  
  export default nftFarmsSlice.reducer
  