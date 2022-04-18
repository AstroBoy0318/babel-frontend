import { StaticJsonRpcProvider } from '@ethersproject/providers'
import getRpcUrl from 'utils/getRpcUrl'
import Web3 from 'web3'

const RPC_URL = getRpcUrl()

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL)
export const simpleRpcProviderWeb3 = new Web3(RPC_URL)

export default null
