import { useContext } from 'react'
import { NftChefPageLayout, NftChefContext } from 'views/NftChef'
import FarmCard from 'views/NftChef/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/Farms/Farms'
import { useWeb3React } from '@web3-react/core'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import BigNumber from 'bignumber.js'

const NftChefPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(NftChefContext)
  const price = useCakeBusdPrice();
  const cakePrice = new BigNumber(price ? price.toFixed(3) : 0)

  return (
    <>
      {chosenFarmsMemoized.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          cakePrice={cakePrice}
          account={account}
          removed={false}
        />
      ))}
    </>
  )
}

NftChefPage.Layout = NftChefPageLayout

export default NftChefPage
