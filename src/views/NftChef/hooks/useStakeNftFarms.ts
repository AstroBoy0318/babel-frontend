import { useCallback } from 'react'
import { stakeNftFarm } from 'utils/calls'
import { useNftChefContract, usePositionNftContract } from 'hooks/useContract'

const useStakeNftFarms = (pid: number) => {
  const nftChefContract = useNftChefContract()
  const postionNftContract = usePositionNftContract()

  const handleStake = useCallback(
    async (tokenId: string) => {
      return stakeNftFarm(nftChefContract, postionNftContract, pid, tokenId)
    },
    [nftChefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeNftFarms
