import { ChainId } from '@pancakeswap/sdk'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { nftchef } from 'config/constants'
import { CHAIN_ID } from 'config/constants/networks'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchNftFarmsPublicDataAsync, fetchNftFarmUserDataAsync, nonArchivedFarms } from '.'
import {
  farmSelector, makeUserFarmFromPidSelector,
} from './selectors'
import { DeserializedNftFarmsState, DeserializedNftFarmUserData } from 'state/types'

export const usePollFarmsWithUserData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useSlowRefreshEffect(() => {
    const farmsToFetch = nftchef
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchNftFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchNftFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, account])
}

export const useNftFarms = (): DeserializedNftFarmsState => {
    return useSelector(farmSelector)
}

export const useNftFarmUser = (pid): DeserializedNftFarmUserData => {
  const farmFromPidUser = useMemo(() => makeUserFarmFromPidSelector(pid), [pid])
  return useSelector(farmFromPidUser)
}