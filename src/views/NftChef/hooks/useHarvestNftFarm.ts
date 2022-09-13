import { useCallback } from 'react'
import { harvestNftFarm } from 'utils/calls'
import { useNftChefContract } from 'hooks/useContract'

const useHarvestNftFarm = (farmPid: number) => {
  const nftChefContract = useNftChefContract()

  const handleHarvest = useCallback(async () => {
    return harvestNftFarm(nftChefContract, farmPid)
  }, [farmPid, nftChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestNftFarm
