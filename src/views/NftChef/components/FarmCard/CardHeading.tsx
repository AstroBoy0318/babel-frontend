import styled from 'styled-components'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { Token } from '@babelswap/sdk'
import { FarmAuctionTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      {/* <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} /> */}
      <Flex flexDirection="column" alignItems="center" flex={1}>
        <img src="/images/babel_logo.svg" alt="logo"/>
        {/* <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading> */}
        <Flex justifyContent="center" mt={20}>
          {/* <CoreTag /> */}
          <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
          {multiplier ? (
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
