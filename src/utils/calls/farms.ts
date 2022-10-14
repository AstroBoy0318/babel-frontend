import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount, decimals = DEFAULT_TOKEN_DECIMAL, isMirror = false) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(decimals).toString()
  if (pid === 0) {
    return masterChefContract.enterStaking(value, isMirror, { ...options, gasPrice })
  }

  return masterChefContract.deposit(pid, value, { ...options, gasPrice })
}

export const unstakeFarm = async (masterChefContract, pid, amount, decimals = DEFAULT_TOKEN_DECIMAL, isMirror = false) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(decimals).toString()
  if (pid === 0) {
    return masterChefContract.leaveStaking(value, isMirror, { ...options, gasPrice })
  }

  return masterChefContract.withdraw(pid, value, { ...options, gasPrice })
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    return masterChefContract.leaveStaking('0', false, { ...options, gasPrice })
  }

  return masterChefContract.deposit(pid, '0', { ...options, gasPrice })
}
