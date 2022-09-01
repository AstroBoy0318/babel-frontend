import erc20 from 'config/abi/erc20.json'
import positionNft from 'config/abi/positionNft.json'
import chunk from 'lodash/chunk'
import { getAddress, getPositionNftAddress, getNftChefAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { SerializedNftFarm } from '../types'
import { SerializedNftFarmConfig } from '../../config/constants/types'

const fetchFarmCalls = (farm: SerializedNftFarm) => {
  const nftTokenAddress = getPositionNftAddress()
  const { lpAddresses, token, quoteToken } = farm
  const lpAddress = getAddress(lpAddresses)
  return [
    // Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteToken.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
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
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: token.address,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteToken.address,
      name: 'decimals',
    },
  ]
}

export const fetchPublicFarmsData = async (farms: SerializedNftFarmConfig[]): Promise<any[]> => {
  const farmCalls = farms.flatMap((farm) => fetchFarmCalls(farm))
  const chunkSize = farmCalls.length / farms.length
  
  const farmMultiCallResult = await multicallv2(positionNft, farmCalls)
  
  return chunk(farmMultiCallResult, chunkSize)
}
