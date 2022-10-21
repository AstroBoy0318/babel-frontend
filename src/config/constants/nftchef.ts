import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 1,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x48Ac4cBd03DFb3721BED524Ab2155AC26f537788',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 0,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0x3c11623fc2F2FbD5672d7a7590B2f9a572a06bD4',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
    {
      pid: 2,
      lpSymbol: 'BABEL-DAI',
      lpAddresses: {
        97: '0xc389A2444e48d176b1F9DCAc7e6396FBAA160607',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.dai,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef