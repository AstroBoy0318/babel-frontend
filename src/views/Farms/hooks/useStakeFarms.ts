import { useCallback } from 'react'
import { stakeFarm, stakeFarmWithPermit } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      return stakeFarm(masterChefContract, pid, amount)
    },
    [masterChefContract, pid],
  )

  const handleStakeWithPermit = useCallback(
    async (amount: string, deadline: number, v: number, r: string, s: string) => {
      return stakeFarmWithPermit(masterChefContract, pid, amount, deadline, v, r, s)
    },
    [masterChefContract, pid],
  )

  return { onStake: handleStake, onStakeWithPermit: handleStakeWithPermit }
}

export default useStakeFarms
