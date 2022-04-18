import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      4002: '0x6a92dcE48b742F2f2d9c1DD9D1D2081cb272A1db',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wftm,
  },
  /**
   * All farms below here are from v1 and are to be set to 0x
   */
  {
    pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      4002: '0x823e9e0feceb07716fbf7811ce64ed211ed4864f',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wftm,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      4002: '0x52beb9eb11e0e0b18ca53369486f0bc6974a3f59',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wftm,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
