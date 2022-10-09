import { useCallback, useEffect, useState } from 'react'
import Page from "views/Page"
import styled from 'styled-components'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween } from '../../components/Layout/Row'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Radio, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGenesisContract, useTokenContract, useMirrorContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import tokens from 'config/constants/tokens'
import { getGenesisAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'
import { BIG_INT_ZERO } from 'config/constants'
import { BIG_ZERO } from 'utils/bigNumber'

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

export default function Genesis() {
    const { account } = useWeb3React()
    const [myAddress, setMyAddress] = useState(account)
    const [friendAddress, setFriendAddress] = useState("")
    const genesisContract = useGenesisContract()
    const busdContract = useTokenContract(tokens.busd.address, true)
    const babelContract = useTokenContract(tokens.cake.address, true)
    const mirrorContract = useMirrorContract()
    const { toastSuccess, toastError } = useToast()
    const [ pending, setPending ] = useState(false)
    const [ isOpened, setOpened ] = useState(true)
    const [ deposit, setDeposit ] = useState("100")
    const [ isOn, setIsOn ] = useState(false)
    const [ totalMember, setTotalMember ] = useState("0")
    const [ totalRaised, setTotalRaised ] = useState("")
    const [ isSwapPaused, setIsSwapPaused ] = useState(false)
    const [ babelBalance, setBabelBalance ] = useState("0")
    const [ mirrorBalance, setMirrorBalance ] = useState(BIG_ZERO)
    const [ toRefresh, setToRefresh ] = useState(false)
    const [ userChoise, setUserChoise ] = useState(false)

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
        try{
            setPending(true)
            const busdApproved = await busdContract.allowance(account, getGenesisAddress())
            if(getBalanceNumber(new BigNumber(busdApproved._hex)) < getBalanceNumber(new BigNumber(deposit))) {
                const tx = await busdContract.approve(getGenesisAddress(), MaxUint256)
                await tx.wait()
            }
            const tx = await genesisContract.addToGenesis(account, userChoise)
            await tx.wait()
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    const addFriendToGenesis = async () => {
        try{
            setPending(true)
            const busdApproved = await busdContract.allowance(account, getGenesisAddress())
            if(getBalanceNumber(new BigNumber(busdApproved._hex)) < 1) {
                const tx = await busdContract.approve(getGenesisAddress(), MaxUint256)
                await tx.wait()
            }
            const tx = await genesisContract.addToGenesis(friendAddress, userChoise)
            await tx.wait()
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    const claim = async () => {
        try{
            setPending(true)
            const proof = await genesisContract.viewProof()
            const tx = await genesisContract.claim(proof)
            await tx.wait()
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    const swap = async () => {
        try{
            setPending(true)
            const tx = await genesisContract.SwapTokens(account, mirrorBalance)
            await tx.wait()
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    useEffect(()=>{
        if(genesisContract) {
            genesisContract.isGenesisOpen().then((re) => {
                setOpened(re)
            })
            if(account) {
                genesisContract.isOnGenesis(account).then((re) => {
                    setIsOn(re)
                })
            }
            genesisContract.GenesisLength().then((re) => {
                setTotalMember(re.toString())
            })
            genesisContract.totalLiquidity().then((re) => {
                setTotalRaised(getFullDisplayBalance(new BigNumber(re._hex), 18, 3))
            })
            genesisContract.isSwapPaused().then((re) => {
                setIsSwapPaused(re)
            })
            genesisContract.isSwapPaused().then((re) => {
                setIsSwapPaused(re)
            })
            if(account) {
                mirrorContract.balanceOf(account).then((re) => {
                    setMirrorBalance(new BigNumber(re._hex))
                })
                babelContract.balanceOf(account).then((re) => {
                    setBabelBalance(getFullDisplayBalance(new BigNumber(re._hex), 18, 3))
                })
            }
        }
    }, [genesisContract, setOpened, setDeposit, toRefresh])
    return (
        <Page>
            <Flex width="100%" maxWidth="1280px" flexWrap="wrap">
                <Flex flexDirection="column" flex="1" minWidth="600px">
                    <Flex justifyContent="space-around">
                        <span style={{fontSize:"24px"}}>
                            Genesis
                        </span>
                    </Flex>
                    <Flex flexDirection="row" width="100%" mx="auto" my={20} justifyContent="space-around">
                        <div>
                            Status: {isOpened?"Open":"Close"}
                        </div>
                        <div>
                            Total Member: {totalMember}
                        </div>
                        <div>
                            Total Raised: {totalRaised}
                        </div>
                    </Flex>
                    {account && (<Flex flexDirection="column">
                        <Flex alignItems="center" flexDirection="column" mb={20}>
                            <Filter>
                                <Radio
                                    scale="sm"
                                    checked={!userChoise}
                                    disabled={!isOpened}
                                    onChange={()=>setUserChoise(false)}
                                />
                                <Text ml="4px">10 BUSD(33 babel mirror + genesis nft)</Text>
                            </Filter>
                            <Filter>
                                <Radio
                                    scale="sm"
                                    checked={userChoise}
                                    disabled={!isOpened}
                                    onChange={()=>setUserChoise(true)}
                                />
                                <Text ml="4px">100 BUSD(330 babel mirror + genesis nft + genesis tree)</Text>
                            </Filter>
                        </Flex>
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
                            <Button disabled={pending || !isOpened} mt={3} onClick={addToGenesis}>Add To Genesis</Button>
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
                            <Button disabled={pending || !isOpened} onClick={addFriendToGenesis} mt={3}>Add Friend To Genesis</Button>
                        </InputPanel>
                        <Flex justifyContent="space-around">
                            <Button disabled={pending || isOpened} onClick={claim} mt={3}>Claim</Button>
                        </Flex>
                    </Flex>)}
                </Flex>
                <Flex flexDirection="column" flex="1" minWidth="600px" borderLeft="1px solid gray">
                    <Flex justifyContent="space-around">
                        <span style={{fontSize:"24px"}}>
                            Babel Mirror
                        </span>
                    </Flex>
                    <Flex justifyContent="center" width="100%" my={20}>
                        Description
                    </Flex>
                    <Flex flexDirection="column" width="max-content" mx="auto" my={20}>
                        <div>
                            Status: {isSwapPaused?"Close":"Open"}
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
                    <Flex width="max-content" mx="auto">
                        <Button disabled={pending || isSwapPaused || mirrorBalance.eq(0)} onClick={swap} mt={10}>Swap</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                {!account && <ConnectWalletButton mt={30} />}
            </Flex>
        </Page >
    )
}