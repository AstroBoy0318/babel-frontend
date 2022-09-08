import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 0,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x2374d2Fa4571Ff60c618cA2F553Cc4473D28C730',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 1,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0x2F63Df91fe4faC92D9bE4f79774f9C80ED96D37B',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef