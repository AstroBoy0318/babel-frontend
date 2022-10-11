import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import { ChainId, Token } from '@pancakeswap/sdk'
import { CHAIN_ID } from '../../config/constants/networks'


interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

const getImageUrlFromToken = (token: Token) => {
  let result = "";
  if(CHAIN_ID === ChainId.MAINNET.toString()) {
    const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
    result = `/images/tokens/${address}.svg`
  } else if(CHAIN_ID === ChainId.TESTNET.toString()) {  
    const address = token.symbol
    result = `/images/tokens/testnet/${address}.png`
  }
  return result
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
