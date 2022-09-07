import { useCallback, useEffect, useState } from 'react'
import Page from "views/Page"
import styled from 'styled-components'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween } from '../../components/Layout/Row'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGenesisContract, useTokenContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import tokens from 'config/constants/tokens'
import { getGenesisAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 1.25rem;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 5rem;
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
    const genesisContract = useGenesisContract();
    const busdContract = useTokenContract(tokens.busd.address, true)
    const { toastSuccess, toastError } = useToast()
    const [ pending, setPending ] = useState(false)
    const [ isOpened, setOpened ] = useState(true)

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
            if(getBalanceNumber(new BigNumber(busdApproved._hex)) < 1) {
                const tx = await busdContract.approve(getGenesisAddress(), MaxUint256)
                await tx.wait()
            }
            const tx = await genesisContract.addToGenesis(account);
            await tx.wait();
            setPending(false)
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
            setPending(false)
        }
    }

    const addFriendToGenesis = async () => {
        try{
            await genesisContract.addFriendToGenesis(friendAddress);
        } catch (error: any) {
            const errorDescription = `${error.message} - ${error.data?.message}`
            toastError('Failed to Add', errorDescription)
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

    useEffect(()=>{
        genesisContract.isGenesisOpen().then((re) => {
            setOpened(re)
        })
    }, [genesisContract, setOpened])
    return (
        <Page>
            {account ? (<Flex flexDirection="column" width="100%">
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
                {/* <InputPanel>
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
                    <Button onClick={addFriendToGenesis} mt={3}>Add Friend To Genesis</Button>
                </InputPanel> */}
                <Flex justifyContent="space-around">
                    <Button disabled={pending || isOpened} onClick={claim} mt={3}>Claim</Button>
                </Flex>
            </Flex>) : (<ConnectWalletButton />)}
        </Page >
    )
}