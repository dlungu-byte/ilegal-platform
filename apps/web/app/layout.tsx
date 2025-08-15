export const metadata = {
  title: 'iLegal Docs',
  metadataBase: new URL('https://docs.ilegal.ro'),
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ro"><body>{children}</body></html>;
}
