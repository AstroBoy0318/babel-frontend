import { useCallback, useEffect, useState } from 'react'
import Page from "views/Page"
import styled from 'styled-components'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween } from '../../components/Layout/Row'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Radio, Text, CardBody, Heading, Card, CardHeader, CardRibbon, CardFooter, TimerIcon, Box } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGenesisContract, useTokenContract, useMirrorContract, useGenesisNFTContract, useGenesisTreeNFTContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import tokens from 'config/constants/tokens'
import { getGenesisAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'
import { BIG_INT_ZERO } from 'config/constants'
import { BIG_ZERO } from 'utils/bigNumber'
import Container from 'components/Layout/Container'
import { FlexGap } from 'components/Layout/Flex'

const CurvedDiv = styled.div`
    width: 150%;
    margin-left: -25%;
    margin-top: -12em;
    padding-top: 11em;
    padding-bottom: 1em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    text-align: center;
`

const StyledCard = styled(Card)`
  max-width: 736px;
  width: 100%;
  margin: auto;
`

const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-top: 16px;
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 1.25rem;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 1rem;
`

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.background)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const InputContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.primary)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

const ImageWrapper = styled.div`
  flex: none;
  order: 2;
  max-width: 414px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    order: 1;
  }
`

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: ${({ theme }) => theme.colors.cardBorder};
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
`

const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
    return (
      <StyledStepCard width="100%">
        <StepCardInner height={['200px', '180px', null, '200px']}>
          <Text mb="16px" fontSize="9px" bold textAlign="right" textTransform="uppercase">
            {step.label}
          </Text>
          <Heading mb="16px" scale="lg" color="secondary">
            {step.title}
          </Heading>
          <Text color="textSubtle">{step.subtitle}</Text>
        </StepCardInner>
      </StyledStepCard>
    )
}
  

type Step = { title: string; subtitle: string; label: string }

export default function Genesis() {
    const { account } = useWeb3React()
    const [myAddress, setMyAddress] = useState(account)
    const [friendAddress, setFriendAddress] = useState("")
    const genesisContract = useGenesisContract()
    const genesisNFTContract = useGenesisNFTContract()
    const genesisTreeNFTContract = useGenesisTreeNFTContract()
    const busdContract = useTokenContract(tokens.busd.address, true)
    const babelContract = useTokenContract(tokens.cake.address, true)
    const mirrorContract = useMirrorContract()
    const { toastSuccess, toastError } = useToast()
    const [pending, setPending] = useState(false)
    const [isOpened, setOpened] = useState(true)
    const [deposit, setDeposit] = useState("100")
    const [isOn, setIsOn] = useState(false)
    const [totalMember, setTotalMember] = useState("0")
    const [totalRaised, setTotalRaised] = useState("")
    const [isSwapPaused, setIsSwapPaused] = useState(false)
    const [babelBalance, setBabelBalance] = useState("0")
    const [mirrorBalance, setMirrorBalance] = useState(BIG_ZERO)
    const [toRefresh, setToRefresh] = useState(false)
    const [userChoise, setUserChoise] = useState(1)
    const [limit, setLimit] = useState(0)
    const [nftTotalSupply, setNftTotalSupply] = useState(0)
    const [nftMaxSupply, setNftMaxSupply] = useState(0)
    const [treeNftTotalSupply, setTreeNftTotalSupply] = useState(0)
    const [treeNftMaxSupply, setTreeNftMaxSupply] = useState(0)
    const [finalTime, setFinalTime] = useState(0)

    const handleInput1 = useCallback(
        (event) => {
            const input = event.target.value
            const withoutSpaces = input.replace(/\s+/g, '')
            setMyAddress(withoutSpaces)
        },
        [],
    )
    const handleInput2 = useCallback(
        (event) => {
            const input = event.target.value
            const withoutSpaces = input.replace(/\s+/g, '')
            setFriendAddress(withoutSpaces)
        },
        [],
    )

    const error1 = false
    const error2 = !friendAddress

    const addToGenesis = async () => {
        try {
            setPending(true)
            const busdApproved = await busdContract.allowance(account, getGenesisAddress())
            if (getBalanceNumber(new BigNumber(busdApproved._hex)) < getBalanceNumber(new BigNumber(deposit))) {
                const tx = await busdContract.approve(getGenesisAddress(), MaxUint256)
                await tx.wait()
            }
            const tx = await genesisContract.addToGenesis(account, userChoise)
            await tx.wait()
            setToRefresh(!toRefresh)
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    const addFriendToGenesis = async () => {
        try {
            setPending(true)
            const busdApproved = await busdContract.allowance(account, getGenesisAddress())
            if (getBalanceNumber(new BigNumber(busdApproved._hex)) < 1) {
                const tx = await busdContract.approve(getGenesisAddress(), MaxUint256)
                await tx.wait()
            }
            const tx = await genesisContract.addToGenesis(friendAddress, userChoise)
            await tx.wait()
            setToRefresh(!toRefresh)
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message} `
            toastError('Failed to Add Friend', errorDescription)
            setPending(false)
        }
    }

    const claim = async () => {
        try {
            setPending(true)
            const proof = await genesisContract.viewProof()
            const tx = await genesisContract.claim(proof)
            await tx.wait()
            setToRefresh(!toRefresh)
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message } `
            toastError('Failed to Claim', errorDescription)
            setPending(false)
        }
    }

    const swap = async () => {
        try {
            setPending(true)
            const tx = await genesisContract.SwapTokens(getBalanceNumber(mirrorBalance))
            await tx.wait()
            setToRefresh(!toRefresh)
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${ error.message } - ${ error.data?.message } `
            toastError('Failed to Swap', errorDescription)
            setPending(false)
        }
    }

    useEffect(() => {
        if (genesisContract) {
            genesisContract.isGenesisOpen().then((re) => {
                setOpened(re)
            })
            if (account) {
                genesisContract.isOnGenesis(account).then((re) => {
                    setIsOn(re)
                })
            }
            genesisContract.GenesisLength().then((re) => {
                setTotalMember(re.toString())
            })
            genesisContract.totalLiquidity().then((re) => {
                setTotalRaised(getFullDisplayBalance(new BigNumber(re._hex), 18, 0))
            })
            genesisContract.isSwapPaused().then((re) => {
                setIsSwapPaused(re)
            })
            genesisContract.limit().then((re) => {
                setLimit(re.toNumber())
            })
            genesisNFTContract.totalSupply().then((re) => {
                setNftTotalSupply(re.toNumber())
            })
            genesisNFTContract.maxSupply().then((re) => {
                setNftMaxSupply(re.toNumber())
            })
            genesisTreeNFTContract.totalSupply().then((re) => {
                setTreeNftTotalSupply(re.toNumber())
            })
            genesisTreeNFTContract.maxSupply().then((re) => {
                setTreeNftMaxSupply(re.toNumber())
            })
            genesisContract.finalTime().then((re) => {
                setFinalTime(re.toNumber())
            })
            if (account) {
                mirrorContract.balanceOf(account).then((re) => {
                    setMirrorBalance(new BigNumber(re._hex))
                })
                babelContract.balanceOf(account).then((re) => {
                    setBabelBalance(getFullDisplayBalance(new BigNumber(re._hex), 18, 3))
                })
            }
        }
    }, [genesisContract, setOpened, setDeposit, toRefresh])

    const [currentTime, setCurrentTime] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{
            setCurrentTime(Math.floor(new Date().getTime()/1000))
        }, 1000)
    },[currentTime])

    const seconds2time = (seconds)=>{
        if(seconds <= 0)
            return "Finished";
        let days = Math.floor(seconds / 3600 / 24);
        let hours = Math.floor((seconds - (days * 3600 * 24)) / 3600);
        let minutes = Math.floor((seconds - (days * 3600 * 24) - (hours * 3600)) / 60);
        seconds = seconds % 60;
        let time = "Ends in ";

        if (days != 0) {
            time = days + "day(s) ";
        }
        if (hours != 0) {
            time += hours + "hour(s) ";
        }
        if (minutes != 0 || time !== "") {
            let minutesStr = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
            time += minutesStr + "minute(s) ";
        }
        if (time === "") {
            time = seconds + "";
        } else {
            time += ((seconds < 10) ? "0" + seconds : String(seconds)) + "second(s)";
        }
        return time;
    }

    const steps: Step[] = [
        {
          label: 'Step 1',
          title: 'Choose an option',
          subtitle: 'Connect your wallet and choose 1 of the 3 options.',
        },
        {
          label: 'Step 2',
          title: 'Add to Genesis',
          subtitle: 'You can add your wallet to Genesis or you can also gift a position in Genesis to anyone you want.',
        },
    ]
    
    
    return (
        <Page>
            <FlexGap width="100%" maxWidth="1280px" flexWrap="wrap" gap="2em" paddingBottom="2em">
                <Flex flexDirection="column" flex={1} minWidth={250}>
                    <Card>
                        <CardHeader>
                            <Heading>
                               Options
                            </Heading>
                            <Text color="textSubtle">
                               Rewards
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <Flex flexDirection="column">
                                <Flex alignItems="start" flexDirection="column" mb={20}>
                                    <Filter>
                                        <Radio
                                            scale="sm"
                                            checked={userChoise === 1}
                                            disabled={!isOpened || !account}
                                            onChange={() => setUserChoise(1)}
                                        />
                                        <Text ml="11px" fontSize="18px">Option 1 - 10 BUSD</Text>
                                    </Filter>
                                    <Text marginTop={13} color="textSubtle">
                                        5 Babel Mirror
                                    </Text>
                                    <Text color="textSubtle">
                                        x1 Babel Genesis NFT
                                    </Text>
                                    <Filter>
                                        <Radio
                                            scale="sm"
                                            checked={userChoise === 2}
                                            disabled={!isOpened || !account}
                                            onChange={() => setUserChoise(2)}
                                        />
                                        <Text ml="11px" fontSize="18px">Option 2 - 100 BUSD</Text>
                                    </Filter>
                                    <Text marginTop={13} color="textSubtle">
                                        50 Babel Mirror
                                    </Text>
                                    <Text color="textSubtle">
                                        x1 Babel Genesis NFT
                                    </Text>
                                    <Filter>
                                        <Radio
                                            scale="sm"
                                            checked={userChoise === 3}
                                            disabled={!isOpened || !account}
                                            onChange={() => setUserChoise(3)}
                                        />
                                        <Text ml="11px" fontSize="18px">Option 3 - 500 BUSD</Text>
                                    </Filter>
                                    <Text marginTop={13} color="textSubtle">
                                        275 Babel Mirror
                                    </Text>
                                    <Text color="textSubtle">
                                        x1 Babel Genesis NFT
                                    </Text>
                                    <Text color="textSubtle">
                                        x1 Babel Genesis Tree NFT
                                    </Text>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Card marginTop={20}>
                        <CardHeader>
                            <Heading>
                                General Stats
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text fontSize="20px">
                                Genesis
                            </Text>
                            <Text color="textSubtle">
                                Total Members: {totalMember}
                            </Text>
                            <Text color="textSubtle">
                                Max Members: {limit}
                            </Text>
                            <Text fontSize="20px" marginTop={20}>
                                Genesis NFT
                            </Text>
                            <Text color="textSubtle">
                                Total Minted: {nftTotalSupply}
                            </Text>
                            <Text color="textSubtle">
                                Max Supply: {nftMaxSupply}
                            </Text>
                            <Text fontSize="20px" marginTop={20}>
                                Genesis Tree NFT
                            </Text>
                            <Text color="textSubtle">
                                Total Minted: {treeNftTotalSupply}
                            </Text>
                            <Text color="textSubtle">
                                Max Supply: {treeNftMaxSupply}
                            </Text>
                        </CardBody>
                    </Card>
                </Flex>
                <Flex flexDirection="column" flex={3} minWidth={300}>
                    <Card>
                        <CardHeader>
                            <Heading textAlign="center">
                                BabelSwap Genesis
                            </Heading>
                        </CardHeader>
                        <CardBody style={{ overflow: "hidden" }}>
                            <CurvedDiv>
                                {seconds2time(finalTime-currentTime)}
                                {finalTime-currentTime > 0 && <TimerIcon />}
                            </CurvedDiv>
                            {!account ?
                                (<Flex justifyContent="center">
                                    <ConnectWalletButton mt={30} />
                                </Flex>) :
                                (<>
                                    <InputPanel>
                                        <ContainerRow error={error1}>
                                            <InputContainer>
                                                <AutoColumn gap="md">
                                                    <Input
                                                        className="recipient-address-input"
                                                        type="text"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        spellCheck="false"
                                                        placeholder={'Wallet Address'}
                                                        pattern="^(0x[a-fA-F0-9]{40})$"
                                                        onChange={handleInput1}
                                                        value={account}
                                                    />
                                                </AutoColumn>
                                            </InputContainer>
                                        </ContainerRow>
                                        <Button disabled={pending || !isOpened} mt={3} onClick={addToGenesis}>Add your wallet to Genesis</Button>
                                    </InputPanel>
                                    <InputPanel>
                                        <ContainerRow error={error2}>
                                            <InputContainer>
                                                <AutoColumn gap="md">
                                                    <Input
                                                        className="recipient-address-input"
                                                        type="text"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        spellCheck="false"
                                                        placeholder={'Wallet Address'}
                                                        pattern="^(0x[a-fA-F0-9]{40})$"
                                                        onChange={handleInput2}
                                                        value={friendAddress}
                                                    />
                                                </AutoColumn>
                                            </InputContainer>
                                        </ContainerRow>
                                        <Button disabled={pending || !isOpened} onClick={addFriendToGenesis} mt={3}>Add friend to Genesis</Button>
                                    </InputPanel>

                                    {/*<Flex justifyContent="space-around">
                                        <Button disabled={pending || isOpened} onClick={claim} mt={3}>Claim</Button>
                                    </Flex>

                                    <Flex justifyContent="space-around" marginTop="5em">
                                        <span style={{ fontSize: "24px" }}>
                                            Babel Mirror
                                        </span>
                                    </Flex>
                                    <Flex justifyContent="center" width="100%" my={20}>
                                        Description
                                    </Flex>
                                    <Flex flexDirection="column" width="max-content" mx="auto" my={20}>
                                        <div>
                                            Status: {isSwapPaused ? "Close" : "Open"}
                                        </div>
                                        {account && (<>
                                            <div>
                                                Your Babel Balance: {babelBalance}
                                            </div>
                                            <div>
                                                Your Babel Mirror Balance: {getFullDisplayBalance(mirrorBalance, 18, 3)}
                                            </div>
                                        </>)}
                                    </Flex>
                                    <Flex width="max-content" mx="auto" marginBottom="2em">
                                        <Button disabled={pending || isSwapPaused || mirrorBalance.eq(0)} onClick={swap} mt={10}>Swap</Button>
                                        </Flex> */}
                                    </>)}
                        </CardBody>
                        <CardFooter>
                            <Heading textAlign="center">
                                Total Raised: ${totalRaised}
                            </Heading>
                        </CardFooter>
                    </Card>
                    <Card mt={3}>
                        <Flex m="40px" alignItems="center" flexDirection="column">
                            <Heading mb="24px" scale="lg">
                                ¿ How to Participate ?
                            </Heading>
                            <Text>Easy!</Text>
                        </Flex>
                        <StepContainer>
                            {steps.map((step) => (
                            <StepCard key={step.label} step={step} />
                            ))}
                        </StepContainer>
                    </Card>
                </Flex>
            </FlexGap>
        </Page>
    )
}