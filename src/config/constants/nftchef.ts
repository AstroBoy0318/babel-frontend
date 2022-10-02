import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 1,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x709b4D365716BBB889d931Db2feCc30217d79d12',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 0,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0xdE9dD3aF612eaa7671558Fe68f24b817dAfA8C1A',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef