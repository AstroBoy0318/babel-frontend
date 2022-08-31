import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'
import { getNftChefAddress } from 'utils/addressHelpers'
const options = {
    gasLimit: DEFAULT_GAS_LIMIT,
}
export const stakeNftFarm = async (nftChefContract, positionNftContract, pid, tokenId) => {
    const gasPrice = getGasPrice()

    const approved = await positionNftContract.getApproved(tokenId)

    if (approved != getNftChefAddress()) {
        let tx = await positionNftContract.approve(getNftChefAddress(), tokenId)
        await tx.wait()
    }

    return nftChefContract.deposit(pid, tokenId, { ...options, gasPrice })
}
export const harvestNftFarm = async (nftChefContract, pid) => {
    const gasPrice = getGasPrice()

    return nftChefContract.deposit(pid, '0', { ...options, gasPrice })
}

export const unstakeNftFarm = async (nftChefContract, pid, tokenId) => {
    const gasPrice = getGasPrice()

    return nftChefContract.withdraw(pid, tokenId, { ...options, gasPrice })
}