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
      97: '0xbCf37EEca0fC65f8D4436173741e19b022Ab40FA',
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
      97: '0xeCac76310A1C97F486e530f30aFccE148eCd4CdC',
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
      97: '0xd19B1c208128b88ae1Bf692bFe8C8950aEc71557',
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
      97: '0xBfc7Cae4D66757f0A998422D9D94070368B7Ae48',
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
      97: '0x6C80AC6c8Ca402e38936f0BA05909e7D6156b831',
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
      97: '0xAdCCD9472017a0422467F144bAC6A95A255d48eC',
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
      97: '0xf7BAb46aCa6cB2647dA11A700047784c9c7BaC96',
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
      97: '0xCC54EB6Eaf3A455D2A128D7Dc6BeDE6D74162A11',
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
      97: '0xC1Bbd52fdB9C14EB60a6e9F1F42C8CcD58c287c0',
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
      97: '0x2590282E928FB9f1DbdA8B62387e1F2e8827632e',
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
      97: '0xBD2D15b36f556E54b4C5DDEB51eF14df3556f770',
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
      97: '0x087358E824EEf15e6d6fd090cAe674826c92004d',
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
      97: '0x45E6d777aF6085DD8d16a2B51B25CB040dBc7921',
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
      97: '0xdD3a518Db5b92f163fED37579Cf6e2e801b13e2E',
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
      97: '0xccC3a663D34995dA38605200774aB7b8c0F81d50',
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
      97: '0x92d743709cd7757BEeAE300105297d651dE1A3d0',
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
      97: '0xbb7616761Ba4B95d45ff87656Fe76D22fA3A6fEc',
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
      97: '0xd3a2658FB7fF86aF9c03d9Da435543f501a68741',
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
      97: '0x0e83330d5A5dA68DeAdd4F95cd430886C7eEeaa2',
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
      97: '0x4d87915AaD0a9077E94a93c2f303476A74eC84b5',
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
      97: '0xCfe045a21BBC10fC6ab31C353B80b1323433c2aC',
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
      97: '0xa72d6b25884008e8Bf4e7CB5fE89fBE1148f7386',
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
      97: '0x8d346f641E7fb16279E5676516E0fDcAB655a9a9',
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
      97: '0x9B0Ae99fcda5bB32792390eF4Bee5333aF148524',
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
      97: '0x06fcAF009d77c454eB701A46653f3041098F8B0D',
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
      97: '0xa76C61D98a06CA7428a400D093465395f7273838',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.cake,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
