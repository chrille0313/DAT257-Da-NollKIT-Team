import { useMediaQuery } from 'react-responsive';

interface ResponsiveProps {
  children: React.ReactNode;
}

export const useDesktop = () => useMediaQuery({ minWidth: 992 });
export const useTablet = () => useMediaQuery({ minWidth: 768, maxWidth: 991 });
export const useTabletAndBelow = () => useMediaQuery({ maxWidth: 991 });
export const useMobile = () => useMediaQuery({ maxWidth: 767 });
export const useNotMobile = () => useMediaQuery({ minWidth: 768 });

export const Desktop = ({ children }: ResponsiveProps) => {
  return useDesktop() ? <>{children}</> : null;
};

export const Tablet = ({ children }: ResponsiveProps) => {
  return useTablet() ? <>{children}</> : null;
};

export const TabletAndBelow = ({ children }: ResponsiveProps) => {
  return useTabletAndBelow() ? <>{children}</> : null;
};

export const Mobile = ({ children }: ResponsiveProps) => {
  return useMobile() ? <>{children}</> : null;
};

export const Default = ({ children }: ResponsiveProps) => {
  return useNotMobile() ? <>{children}</> : null;
};
