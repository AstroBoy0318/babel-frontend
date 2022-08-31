import { CHAIN_ID } from './networks'
import { FarmConfigBaseProps } from './types'

const nftchef: FarmConfigBaseProps[] = [
    {
      pid: 0,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x861B34F58d95Ca4C5a503A7c38fb098281e50c49',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
    },
    {
      pid: 1,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0x63D5A2Dc3D6c9db8eF5cA9FF8D1c8dbE2b8F537e',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef