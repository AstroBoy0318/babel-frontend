import { useCallback } from 'react'
import { stakeNftFarm, stakeNftFarmWithPermit } from 'utils/calls'
import { useNftChefContract, usePositionNftContract } from 'hooks/useContract'

const useStakeNftFarms = (pid: number) => {
  const nftChefContract = useNftChefContract()
  const positionNftContract = usePositionNftContract()

  const handleStake = useCallback(
    async (tokenId: string) => {
      return stakeNftFarm(nftChefContract, positionNftContract, pid, tokenId)
    },
    [nftChefContract, pid],
  )
  const handleStakeWithPermit = useCallback(
    async (tokenId: string, deadline: number, signature: string) => {
      return stakeNftFarmWithPermit(nftChefContract, positionNftContract, pid, tokenId, deadline, signature)
    },
    [nftChefContract, pid],
  )

  return { onStake: handleStake, onStakeWithPermit: handleStakeWithPermit }
}

export default useStakeNftFarms
