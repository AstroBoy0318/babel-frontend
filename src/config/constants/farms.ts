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
      97: '0x1A7eFD77F62eeBE30F7ca70221Cece93f010aEcA',
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
      97: '0xc0F2E512299335A3E7d007022991d2cF84452801',
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
      97: '0xc0F2E512299335A3E7d007022991d2cF84452801',
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
      97: '0xdE9dD3aF612eaa7671558Fe68f24b817dAfA8C1A',
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
      97: '0xf48584311208cDB6dFCD35FFE560cCdf3f0632e4',
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
      97: '0x62951120379FffC25db60af278406E5e150F3dE5',
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
      97: '0xF9Df70e15A442C982846E06ED904d4A96Ac963b0',
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
      97: '0x27565E44c161c5d000Bfd20686B17955F62830F5',
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
      97: '0x33791ABad703B2C4764B0FCea7622DE771594d06',
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
      97: '0x4b8A2F3b79A9aeE1CF8CaA134ABC06a7C4d82b98',
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
      97: '0x9f2A4F20054257b25A167b573EbefBB33E0DE886',
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
      97: '0xA52247503acbc1144283BD2Aca12C5D8c1ca8D8A',
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
      97: '0xb5B03493012163CBb86B49a5dE507C2dABFD7Eb8',
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
      97: '0x17Fab0AB54168402Cb4A449aa5EA5eF2883A0d0f',
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
      97: '0x8118c1255E1cBB5b69f6AB6ae1Ae3297c9De5Ea9',
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
      97: '0x0F4Df3ea1EEECc4dC61B86E9E08555F69203Cfd5',
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
      97: '0x30B96B5a0Ba849f56CA64DcC06fB5d80567810bB',
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
      97: '0x41664dCF1724137Faad120BeA38dAd4835f5368a',
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
      97: '0x4516AfCe179ea20b6d1f3F7644BBFceB58c0fA7D',
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
      97: '0x6D16F65607EAF8EC822E0349B81CaBaa5b516315',
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
      97: '0x7186e15c32C8520267227F41e8Cb9b2443Ef573f',
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
      97: '0xa3CCa58b594321691a1b95A98bE2f178eF97516f',
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
      97: '0x3c72c49C7e4ADCfdD4cAe17436bf27067888C06B',
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
      97: '0x212a0C7728A26e0e7eC1e84230C1a144096B8124',
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
      97: '0x7381BDac476B29e3118dF1A4F292C313e4f5093a',
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
      97: '0x5858ed12Ed3a9e7e14b6Ea42FdBF915fA5ED329E',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x5F62C3a6caE8a107DFDC1A99e79cA49717fA44cA',
      5777: '0xC35354B751cC63A9c2Bc1500334BC2c97B2B6286',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.cake,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
