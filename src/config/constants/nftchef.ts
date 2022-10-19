import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 1,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0xE9cD44bBF86aD0Ce99794BA315ff0382FabF54ed',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 0,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0xbC82D4F835446b1B3Aec0d18D2D68938A92de1f3',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
    {
      pid: 2,
      lpSymbol: 'BABEL-DAI',
      lpAddresses: {
        97: '0xAF1DBdd980B6D61aAebaE99AE9ab02C9e3DA7f05',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.dai,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef