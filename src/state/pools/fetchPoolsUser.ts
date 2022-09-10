import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import masterChefABI from 'config/abi/masterchef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0 && pool.version !== undefined)
const masterPools = poolsConfig.filter((pool) => pool.version === undefined)
const masterChefContract = getMasterchefContract()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  // const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)
  const calls1 = masterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [p.sousId, account],
  }))
  console.log(calls1)
  const userInfo1 = await multicall(masterChefABI, calls1)
  console.log(userInfo1)
  const stakedBalances1 = masterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo1[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedBalances, ...stakedBalances1 }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  // const pendingReward = await masterChefContract.pendingBabel('0', account)
  const calls1 = masterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingBabel',
    params: [p.sousId, account],
  }))
  const res1 = await multicall(masterChefABI, calls1)
  const pendingRewards1 = masterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res1[index]).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards, ...pendingRewards1 }
}
