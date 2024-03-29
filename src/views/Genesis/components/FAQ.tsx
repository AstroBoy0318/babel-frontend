import styled from 'styled-components'
import { Card, CardBody, CardHeader, Heading, Text, Flex, Link } from '@pancakeswap/uikit'
import FoldableText from 'components/FoldableSection/FoldableText'

const Wrapper = styled(Flex)`
  width: 100%;
  margin: auto;
  margin-top: 1rem;
  padding: 0;
  flex-direction: column-reverse;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    max-width: 1140px;
  }
`

const StyledCardbody = styled(CardBody)`
  div:first-child {
    margin-top: 0px;
  }
`

const InlineLink = styled(Link)`
  display: inline-block;
  margin: 0 4px;
`

const FAQ = () => {

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Heading color="secondary" scale="lg">
            FAQ
          </Heading>
        </CardHeader>
        <StyledCardbody>
          <FoldableText title='How is odds calculated?' mt="24px">
            <Text fontSize="14px" color="textSubtle">
                All CAKE deposits will be locked for the same duration, the odds of your address winning the prize pool is simply proportional to your CAKE deposit over the total CAKE deposit of the whole Pottery. Each week, eight (8) addresses are drawn randomly based on their odds. Simply put, if user A deposited 1 CAKE, user B deposited 2 CAKE, then user B's odds of winning is twice of user A's.
            </Text>
          </FoldableText>
          <FoldableText title='Is there any risk associated with depositing and playing Pottery?' mt="24px">
            <Text fontSize="14px" color="textSubtle">
                You will be locking your CAKE deposit for 10 weeks and you will not be able to withdraw early in any circumstances. Your principal (i.e. your deposit) will be returned to your 100% after 10 weeks. Only the staking rewards of your deposit will be used to fill and operate the Pottery. Simply put, you're only risking the staking rewards of your deposit.
            </Text>
          </FoldableText>
          <FoldableText title='Where can I learn more about this new Pottery format?' mt="24px">
            <Text>
              Please feel free to reach out to us on
              <InlineLink fontSize="14px" external href="https://t.me/pancakeswap">
                Telegram
              </InlineLink>
                or
              <InlineLink fontSize="14px" external href="https://discord.gg/pancakeswap">
                Discord
              </InlineLink>
                if you're still unsure about the format! Please also let us know if you have any feedback for us to improve this further.
            </Text>
          </FoldableText>
        </StyledCardbody>
      </Card>
    </Wrapper>
  )
}

export default FAQ
