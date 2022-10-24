import { CHAIN_ID } from './networks'
import { SerializedNftFarmConfig } from './types'
import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const nftchef: SerializedNftFarmConfig[] = [
    {
      pid: 1,
      lpSymbol: 'BABEL-BNB',
      lpAddresses: {
        97: '0x803B255bCdce4399De68651eE9f0090Ce4b12b9D',
        56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.wbnb,
    },
    {
      pid: 0,
      lpSymbol: 'BABEL-BUSD',
      lpAddresses: {
        97: '0x00836eA156Dbd8ef082287B74e1e0E28C66ce23E',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.busd,
    },
    {
      pid: 2,
      lpSymbol: 'BABEL-DAI',
      lpAddresses: {
        97: '0x118a352F6f1f989b4379493E8D4a11Ca8f19922E',
        56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
      token: serializedTokens.cake,
      quoteToken: serializedTokens.dai,
    },
  ].filter((f) => !!f.lpAddresses[CHAIN_ID])
  
  export default nftchef