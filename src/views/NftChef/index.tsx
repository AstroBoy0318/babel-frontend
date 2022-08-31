import { FC } from 'react'
import NftChef, { NftChefContext } from './NftChef'

export const NftChefPageLayout: FC = ({ children }) => {
  return <NftChef>{children}</NftChef>
}

export { NftChefContext }