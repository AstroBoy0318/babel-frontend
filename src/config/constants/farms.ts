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
      97: '0xAD2625ac1F2587b8419E8407dc8E04815fdA7E33',
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
      97: '0x2374d2Fa4571Ff60c618cA2F553Cc4473D28C730',
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
      97: '0xe2fA6c27b06F9294635C66312dd1908FaC0e6dff',
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
      97: '0x2F63Df91fe4faC92D9bE4f79774f9C80ED96D37B',
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
      97: '0xEB51399682756B4422c796a3c76Ee7a80b544fCD',
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
      97: '0xB4FC7edf3C8fc9D8575258624160b2fc399DB217',
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
      97: '0x37C24244217D6c31e58E017D1C356Ce378806edb',
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
      97: '0x98418f2737e889af07A82436e1aEF260f92e2e10',
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
      97: '0xbA399bC7038E6cf9B6c9D2FcC8321A514dBD0056',
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
      97: '0x03FCbbb2Ce65A69CE0830C13Bc7839863956638b',
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
      97: '0x6715985aa3707f63b0c4A4Eb4bbBbb750E94Cba2',
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
      97: '0x89dC37847B28E17e3851c93b331dC439Dee2d3fa',
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
      97: '0xEF6D3Aa58bed17CC8D7B500d14049E2f1B3337AB',
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
      97: '0x5d87329E3C336D6E2eC489F35F870C313DEb917e',
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
      97: '0xcDd76a381B0bD9B44D181D41BC5759C73650D577',
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
      97: '0x1c9d899a6bB92f81b47c3Daa1990EfDf0590e5cf',
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
      97: '0x7493038d81674953848D230423A87640a124BD1e',
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
      97: '0x565145DA57d098D9F64018b28754ee86C64004fB',
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
      97: '0xf03Fe16766f5f78A5Bfb6fD4233790b81b5a4227',
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
      97: '0xa89eb2042fd6d8487e50255C07A123d7DC7C4a6E',
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
      97: '0x3f97153Fc26Be78ddD11A3FD1C4e7719301f8246',
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
      97: '0x1Ebc0EB460e689c1525fF5A8508b1C58b0AA8d59',
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
      97: '0xCBD6236d62E640f02630FcDa1eb1099604F43570',
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
      97: '0x7F14d874502c5dd03349bC1cD5AE72548EBCa41c',
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
      97: '0x2A951BB63F42514CD95922C6d33e49eEc0927bCb',
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
      97: '0xdE891775E982050d1f11A80c1f81EED44Ad58764',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.cake,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
