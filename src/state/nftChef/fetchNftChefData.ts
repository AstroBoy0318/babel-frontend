import masterchefABI from 'config/abi/nftChef.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { FarmConfigBaseProps } from '../../config/constants/types'
import { SerializedNftFarm } from '../types'
import { getNftChefAddress } from '../../utils/addressHelpers'
import { getNftChefContract } from '../../utils/contractHelpers'

const masterChefAddress = getNftChefAddress()
const masterChefContract = getNftChefContract()

export const fetchNftChefFarmPoolLength = async () => {
  const poolLength = await masterChefContract.poolLength()
  return poolLength
}

const nftChefFarmCalls = (farm: SerializedNftFarm) => {
  const { pid } = farm
  return pid || pid === 0
    ? [
        {
          address: masterChefAddress,
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: masterChefAddress,
          name: 'totalAllocPoint',
        },
      ]
    : [null, null]
}

export const fetchNftChefData = async (farms: FarmConfigBaseProps[]): Promise<any[]> => {
  const masterChefCalls = farms.map((farm) => nftChefFarmCalls(farm))
  const chunkSize = masterChefCalls.flat().length / farms.length
  const masterChefAggregatedCalls = masterChefCalls
    .filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
    .flat()
  const masterChefMultiCallResult = await multicallv2(masterchefABI, masterChefAggregatedCalls)
  const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
  let masterChefChunkedResultCounter = 0
  return masterChefCalls.map((masterChefCall) => {
    if (masterChefCall[0] === null && masterChefCall[1] === null) {
      return [null, null]
    }
    const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
    masterChefChunkedResultCounter++
    return data
  })
}
