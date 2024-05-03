import { useMediaQuery } from 'react-responsive'

interface ResponsiveProps {
  children: React.ReactNode
}

export const Desktop = ({ children }: ResponsiveProps) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? <>{children}</> : null
}

export const Tablet = ({ children }: ResponsiveProps) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? <>{children}</> : null
}

export const TabletAndBelow = ({ children }: ResponsiveProps) => {
  const isTabletAndBelow = useMediaQuery({ maxWidth: 991 })
  return isTabletAndBelow ? <>{children}</> : null
}

export const Mobile = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? <>{children}</> : null
}

export const Default = ({ children }: ResponsiveProps) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? <>{children}</> : null
}
