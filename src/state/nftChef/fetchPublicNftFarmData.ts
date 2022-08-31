import erc20 from 'config/abi/erc20.json'
import positionNft from 'config/abi/positionNft.json'
import chunk from 'lodash/chunk'
import { getAddress, getPositionNftAddress, getNftChefAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { SerializedNftFarm } from '../types'
import { FarmConfigBaseProps } from '../../config/constants/types'

const fetchFarmCalls = (farm: SerializedNftFarm) => {
  const nftTokenAddress = getPositionNftAddress()
  const { lpAddresses } = farm
  const lpAddress = getAddress(lpAddresses)
  return [
    // IDs of LP Position NFT in the nft chef contract
    {
      address: nftTokenAddress,
      name: 'getTokenIDForLP',
      params: [getNftChefAddress(), lpAddress],
    },
    // Total supply of LP tokens
    {
      address: nftTokenAddress,
      name: 'getLiquidityForLP',
      params: [getNftChefAddress(), lpAddress],
    },
  ]
}

export const fetchPublicFarmsData = async (farms: FarmConfigBaseProps[]): Promise<any[]> => {
  const farmCalls = farms.flatMap((farm) => fetchFarmCalls(farm))
  const chunkSize = farmCalls.length / farms.length
  
  const farmMultiCallResult = await multicallv2(positionNft, farmCalls)
  return chunk(farmMultiCallResult, chunkSize)
}
