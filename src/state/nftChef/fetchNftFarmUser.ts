import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import nftABI from 'config/abi/positionNft.json'
import nftChefABI from 'config/abi/nftChef.json'
import multicall from 'utils/multicall'
import { getAddress, getNftChefAddress, getPositionNftAddress } from 'utils/addressHelpers'
import { SerializedNftFarmConfig } from 'config/constants/types'

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: SerializedNftFarmConfig[]) => {
  const nftAddress = getPositionNftAddress()
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: nftAddress,
      name: 'getTokenIDForLP',
      params: [account, lpContractAddress],
    }
  })

  const rawTokenBalances = await multicall(nftABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(non_zero_cnt(tokenBalance[0])).toJSON()
  })
  const _parsedTokenIDs = rawTokenBalances.map((tokenBalance) => {
    return non_zero(tokenBalance[0])
  })
  const parsedBalanceIDs = await Promise.all(_parsedTokenIDs.map(async (balanceID, index): Promise<Array<Array<BigNumber>>>=> {
    const callForLpAmount = balanceID.map((id)=>{
      return {
        address: nftAddress,
        name: 'tokenLiquidity',
        params: [id],
      }
    })
    const rawLpResult = await multicall(nftABI, callForLpAmount)
    const parsedTokenIDsResult = rawLpResult.map((lpResult, idx)=>{
      return [balanceID[idx], lpResult[0]]
    })
    return parsedTokenIDsResult
  }))
  return [parsedTokenBalances, parsedBalanceIDs]
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: SerializedNftFarmConfig[]) => {
  const nftChefAddress = getNftChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: nftChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(nftChefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance.depositedCount).toJSON()
  })

  const nftAddress = getPositionNftAddress()
  const callsForIDs = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: nftAddress,
      name: 'getTokenIDForLP',
      params: [nftChefAddress, lpContractAddress],
    }
  })
  const rawStakedBalanceIDs = await multicall(nftABI, callsForIDs)
  const parsedStakedBalanceIDs = await Promise.all(rawStakedBalanceIDs.map(async (stakedBalanceID, index): Promise<Array<Array<BigNumber>>>=> {
    const ids = non_zero(stakedBalanceID[0])
    const callsForCheck = ids.map((id) => {
      return {
        address: nftChefAddress,
        name: 'isStaked',
        params: [farmsToFetch[index].pid, account, id],
      }
    })
    const rawCheckedResult = await multicall(nftChefABI, callsForCheck)
    const res = rawCheckedResult.map((checkResult, idx)=>{
      if(checkResult)
        return ids[idx]
      else
        return 0
    })
    const filteredIDs = non_zero(res)
    const callForLpAmount = filteredIDs.map((id)=>{
      return {
        address: nftAddress,
        name: 'tokenLiquidity',
        params: [id],
      }
    })
    const rawLpResult = await multicall(nftABI, callForLpAmount)
    return rawLpResult.map((lpResult, idx)=>{
      return [filteredIDs[idx], lpResult[0]]
    })
  }))
  return [parsedStakedBalances, parsedStakedBalanceIDs]
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: SerializedNftFarmConfig[]) => {
  const masterChefAddress = getNftChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingBabel',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(nftChefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const non_zero = (a)=>{  
  let result = []
  for (let i = 0; i < a.length; i++)
      if (a[i] != 0)
          result.push(a[i])
  return result;
}

export const non_zero_cnt = (a)=>{  
  let count = 0;
  for (let i = 0; i < a.length; i++)
      if (a[i] != 0)
          count++;
  return count;
}