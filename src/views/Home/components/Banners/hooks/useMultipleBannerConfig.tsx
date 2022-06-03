import { useMemo } from 'react'
import CompetitionBanner from '../CompetitionBanner'
import useIsRenderIfoBanner from './useIsRenderIFOBanner'

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */
export const useMultipleBannerConfig = () => {
  const isRenderIFOBanner = useIsRenderIfoBanner()
  return useMemo(
    () =>
      [
        {
          shouldRender: false,
          banner: <CompetitionBanner />,
        },
      ]
        .filter((d) => d.shouldRender)
        .map((d) => d.banner),
    [isRenderIFOBanner],
  )
}
