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
      97: '0xE4948CA2957232a598a4A3F60e56584626163831',
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
      97: '0x803B255bCdce4399De68651eE9f0090Ce4b12b9D',
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
      97: '0x77e1Bb3aF4810479E046cA0bC612B308a26c5023',
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
      97: '0x00836eA156Dbd8ef082287B74e1e0E28C66ce23E',
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
      97: '0xC793C55D68201Dd74A29a83412f01aEfF5e1b600',
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
      97: '0xC444D830C5E707453E0559e525524040d8e2974f',
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
      97: '0x118a352F6f1f989b4379493E8D4a11Ca8f19922E',
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
      97: '0x9c1b7EF6348CaDD8A038Ea3a1cd076FEE8AbD5A0',
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
      97: '0xB84Daa4F76066Fb476396e7EE8710ce62f313F93',
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
      97: '0x3E310D8Ed0A7c8FED71AB8713A8e538774E42D71',
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
      97: '0x12add0e4552d29051e924f5aE747E890c1A9DAFa',
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
      97: '0x467C6cdA1961876390761A768bb621eDE2EFC012',
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
      97: '0x5c5C4da0CeD87D9C29A815E6736C769fAA0b5BC8',
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
      97: '0x453d52a740caaEED31723ad679bcA243E0711957',
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
      97: '0xB4A7074a4F7d6fCd296A06086E190B6bdc57CAB7',
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
      97: '0x541ea896D4F6835Ec840ed990b55206c87B7fD62',
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
      97: '0xc1ed60f42b9ac8b6EA50D1350c5648E95A414882',
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
      97: '0xc99Ae2839ed35A15E77E0f8FF04aAf1205ff54A5',
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
      97: '0x731623f555C64312C6724DD2e83EAF498916583b',
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
      97: '0x445Fd0dddA28B79a8Cd0D754e539eA533DDe1479',
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
      97: '0xF495315E0Cf212dc782418C6DD9Ea3318586F5f1',
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
      97: '0x01926c07A2b53D354902808E49A9CF224d741844',
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
      97: '0xB3444d5FCE52E365dd887aF04675bbA9495Fe7fC',
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
      97: '0xeAc9a907B7Aa80EBC4e2Cf80b902F14864ad7159',
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
      97: '0xcCD04B9b71fAA25EA918480045bF397a12129dE8',
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
      97: '0x7e676eD90644Ce0514c79A8258Be7B9f6778f42a',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.cake,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
