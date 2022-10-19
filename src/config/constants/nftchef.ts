import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 1,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x4a622D38eDF154224b24c220cc43aA88fE9b55f4',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 0,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0xbf4B53E7a520da98E8a60ebE22Bc035bBf801829',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
    {
      pid: 2,
      lpSymbol: 'BABEL-DAI',
      lpAddresses: {
        97: '0x11a03DaaaB09009E8a6D841244B2bEBCF92E7de1',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.dai,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef