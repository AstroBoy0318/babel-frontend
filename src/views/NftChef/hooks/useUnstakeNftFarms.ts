import { useCallback } from 'react'
import { unstakeNftFarm } from 'utils/calls'
import { useNftChefContract } from 'hooks/useContract'

const useUnstakeNftFarms = (pid: number) => {
  const nftChefContract = useNftChefContract()

  const handleUnstake = useCallback(
    async (tokenId: string) => {
      return unstakeNftFarm(nftChefContract, pid, tokenId)
    },
    [nftChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeNftFarms
