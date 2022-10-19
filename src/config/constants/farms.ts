import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'BABEL',
    lpAddresses: {
      97: '0x1C3C1D3425feb6D4Ea32CE65a5CD398cdec7400E',
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      4002: '0xf5a2BEfD9018C45DBc87859C72Fc116EF2052599',
      5777: '0x024f9c23b9999b34315648c858023809b2eaC57c',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  /**
   * All farms below here are from v1 and are to be set to 0x
   */
  {
    pid: 8,
    lpSymbol: 'BABEL-BNB LP',
    lpAddresses: {
      97: '0x4a622D38eDF154224b24c220cc43aA88fE9b55f4',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x0fa46C0aB9A595f571427ED4f37C968788D2Dc2C',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      4002: '0x24269C6C58ca72cD6342F321926793A6D3F5B2e6',
      5777: '0x5ebb754cDd5113149289B17136106c14472060be',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
  // other farms  
  {
    pid: 1,
    lpSymbol: 'BABEL-BUSD LP',
    lpAddresses: {
      97: '0xbf4B53E7a520da98E8a60ebE22Bc035bBf801829',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 2,
    lpSymbol: 'BABEL-USDC LP',
    lpAddresses: {
      97: '0xDCeFb6BfAC5AE61e52792c9f1a3E7F86A5D2162c',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 3,
    lpSymbol: 'BABEL-USDT LP',
    lpAddresses: {
      97: '0x34BDf8F335b65f81C22e8f9fb933f1f9208ac51e',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 4,
    lpSymbol: 'BABEL-DAI LP',
    lpAddresses: {
      97: '0x5e08bfF3Fb88e5dF2ADD2e757c1249854B74d428',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 5,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      97: '0x667DDf9B2f69957ae3f5571485eD491F8D5Ba8D1',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 7,
    lpSymbol: 'BABEL-MIM LP',
    lpAddresses: {
      97: '0x17A0f8778A1875D62eD846dB08C9D830dec3aE76',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.mim,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 9,
    lpSymbol: 'BABEL-WBTC LP',
    lpAddresses: {
      97: '0x6094c4be8DA7376751EA0b63a9E0DAEB519B4B1A',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.wbtc,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 10,
    lpSymbol: 'BABEL-WETH LP',
    lpAddresses: {
      97: '0x1B6059Ce1Aa794A71F495188aBd06b12478a1d09',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.weth,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 11,
    lpSymbol: 'BABEL-IOTA LP',
    lpAddresses: {
      97: '0xda776dD1d2A3D8968c921203a5A05B4c6B3441d6',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.iota,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 12,
    lpSymbol: 'BABEL-CARDANO LP',
    lpAddresses: {
      97: '0xB1d797CDAcAddd79b241f3915c0dD573d2Ed616A',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.cardano,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 13,
    lpSymbol: 'BABEL-MAKER LP',
    lpAddresses: {
      97: '0xCEfd146A267b3bb9f6F1F6a80Ff1013BB78D183f',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.maker,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 14,
    lpSymbol: 'BABEL-AAVE LP',
    lpAddresses: {
      97: '0x7c8651Bd15822218823612d9E322485d06549434',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.aave,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 15,
    lpSymbol: 'BABEL-CAKE LP',
    lpAddresses: {
      97: '0x941df92c9dF8d9cD8a9960Af3397542FCEdEb85a',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.realcake,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 16,
    lpSymbol: 'BABEL-SHIBA LP',
    lpAddresses: {
      97: '0x06E52c9fEA90C76E5F0CCD64ebd12452829E59fA',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.shiba,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 17,
    lpSymbol: 'BABEL-DOGE LP',
    lpAddresses: {
      97: '0xa409856A2BC32ee4deDb584bbA963b0538371Ef7',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.doge,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 18,
    lpSymbol: 'BABEL-COMP LP',
    lpAddresses: {
      97: '0xC110DDF92dc7F66A520D5f451162db67A040b1f8',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.comp,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 19,
    lpSymbol: 'BABEL-1INCH LP',
    lpAddresses: {
      97: '0xD608caD801Ef11f29a7228852F139B74e0fC2Af1',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.inch,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 20,
    lpSymbol: 'BABEL-BADGER LP',
    lpAddresses: {
      97: '0x2DD6e49f4c8E4E0e256a33237aC8F79796BaF1a6',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.bbadger,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 21,
    lpSymbol: 'BABEL-VENUS LP',
    lpAddresses: {
      97: '0x9beB4bfF383941492D555E8E3b5a76B340701533',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.xvs,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 22,
    lpSymbol: 'BABEL-RIPPLE LP',
    lpAddresses: {
      97: '0xBd28b8325B8C7f439f81f3f49A43A100070Ac8d7',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.xrp,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 23,
    lpSymbol: 'BABEL-POLKADOT LP',
    lpAddresses: {
      97: '0xB35ddbd7B23f306E38cBA699025b9c1f3B511432',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.dot,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 24,
    lpSymbol: 'BABEL-UNISWAP LP',
    lpAddresses: {
      97: '0x83E89224C37097c57DD5b6844a708aC7c62BBDae',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.uni,
    quoteToken: serializedTokens.cake,
  },
  {
    pid: 25,
    lpSymbol: 'BABEL-AVAX LP',
    lpAddresses: {
      97: '0x19e6c06f0E09522ab51B4451B406b552590AE07a',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.cake,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
