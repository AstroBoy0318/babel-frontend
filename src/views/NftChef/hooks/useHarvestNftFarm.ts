import { useCallback } from 'react'
import { harvestNftFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useHarvestNftFarm = (farmPid: number) => {
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    return harvestNftFarm(masterChefContract, farmPid)
  }, [farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestNftFarm
