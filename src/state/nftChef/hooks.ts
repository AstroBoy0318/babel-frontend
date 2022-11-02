import { useWeb3React } from '@web3-react/core'
import { nftchef } from 'config/constants'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { DeserializedNftFarmsState, DeserializedNftFarmUserData } from 'state/types'
import { fetchNftFarmsPublicDataAsync, fetchNftFarmUserDataAsync } from '.'
import {
  farmSelector, makeUserFarmFromPidSelector,
} from './selectors'

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