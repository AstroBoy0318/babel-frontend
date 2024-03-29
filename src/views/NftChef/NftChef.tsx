import { useEffect, useCallback, useState, useMemo, useRef, createContext } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Flex } from '@pancakeswap/uikit'
import { ChainId } from '@babelswap/sdk'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useNftFarms, usePollFarmsWithUserData } from 'state/nftChef/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm, DeserializedNftFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import ToggleView from 'components/ToggleView/ToggleView'
import { useCakeBusdPrice, useBNBBusdPrice } from 'hooks/useBUSDPrice'
import { getNftChefContract } from 'utils/contractHelpers'
import { useCurrentBlock } from 'state/block/hooks'
import getFarmsPrices from 'state/nftChef/getNftFarmsPrices'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import { NftFarmWithStakedValue } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const NUMBER_OF_FARMS_VISIBLE = 12

export const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const NftChef: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded, poolLength } = useNftFarms()
  const price = useCakeBusdPrice()
  const bnbprice = useBNBBusdPrice()
  const bnbPrice = new BigNumber(bnbprice ? bnbprice.toFixed(3) : 0)
  const cakePrice = new BigNumber(price ? price.toFixed(3) : 0)
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsWithUserData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter(
    (farm) =>
      farm.multiplier !== '0X' && !isArchivedPid(farm.pid) && (!poolLength || poolLength > farm.pid),
  )
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const nftchefContract = getNftChefContract()
  
  const [currentMultiplier, setCurrentMultiplier] = useState(1)
  const [tokenPerSecond, setTokenPerSecond] = useState(new BigNumber(0))

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedNftFarm[]): NftFarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: NftFarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
        //   return farm
        // }
        if (!farm.lpTotalInQuoteToken) {
          return farm
        }
        const farmWithCorrectPrice = getFarmsPrices([farm], bnbPrice)[0]
        
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farmWithCorrectPrice.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(tokenPerSecond, new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.TESTNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr*currentMultiplier, lpRewardsApr: lpRewardsApr*currentMultiplier, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: NftFarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive, bnbPrice],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const currentBlock = useCurrentBlock()
  
  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: NftFarmWithStakedValue[]): NftFarmWithStakedValue[] => {
      switch (sortOption) {
        case 'multiplier':
          return orderBy(
            farms,
            (farm: NftFarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: NftFarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: NftFarmWithStakedValue) => Number(farm.liquidity), 'desc')
        case 'latest':
          return orderBy(farms, (farm: NftFarmWithStakedValue) => Number(farm.pid), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    nftchefContract.getMultiplierEx(currentBlock.toString() ,(currentBlock+1).toString()).then(re => setCurrentMultiplier(Number(re)))
    nftchefContract.babelPerBlock().then(re => setTokenPerSecond(getBalanceAmount(new BigNumber(re.toString()))))
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting, currentBlock])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      farm: {
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    // if (viewMode === ViewMode.TABLE && rowData.length) {
    //   const columnSchema = DesktopColumnSchema

    //   const columns = columnSchema.map((column) => ({
    //     id: column.id,
    //     name: column.name,
    //     label: column.label,
    //     sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
    //       switch (column.name) {
    //         case 'farm':
    //           return b.id - a.id
    //         case 'earned':
    //           return a.original.earned.earnings - b.original.earned.earnings
    //         default:
    //           return 1
    //       }
    //     },
    //     sortable: column.sortable,
    //   }))

    //   return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    // }

    return <FlexLayout>{children}</FlexLayout>
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <NftChefContext.Provider value={{ chosenFarmsMemoized }}>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('NFT Farms')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Stake LP position NFT tokens to earn.')}
        </Heading>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ViewControls>
            {/* <ToggleView idPrefix="clickFarm" viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} /> */}
            <ToggleWrapper>
              <Toggle
                id="staked-only-farms"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text> {t('Staked only')}</Text>
            </ToggleWrapper>
            {/* <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} /> */}
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                  {
                    label: t('Latest'),
                    value: 'latest',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={observerRef} />
        {/* <StyledImage src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
      </Page>
    </NftChefContext.Provider>
  )
}

export const NftChefContext = createContext({ chosenFarmsMemoized: [] })

export default NftChef
