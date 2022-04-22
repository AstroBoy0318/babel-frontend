import { Interface } from '@ethersproject/abi'
import MULTICALL_ABI from './Multicall.json'

const MULTICALL_INTERFACE = new Interface(MULTICALL_ABI)

export default MULTICALL_INTERFACE
