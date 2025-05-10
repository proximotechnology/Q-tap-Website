import { ShopProvider } from './context';

export default function RootLayout({ children }) {
  return <ShopProvider>{children}</ShopProvider>;
}