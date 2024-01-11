import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import Header from "@/src/widgets/header/Header";
import Footer from "@/src/widgets/footer/Footer";
import ContentContainer from "@/src/shared/ui/page-container/PageContainer";
import StoreProvider from "@/app/StoreProvider";

export const metadata: Metadata = {
  title: 'DTEAM',
  description: 'DTEAM is a reliable validator. We provides the best and most up-to-date services on the market as well as create useful tools for the project community, node operators and developers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
            <Header />
            <StoreProvider>
                <ContentContainer>
                    {children}
                </ContentContainer>
            </StoreProvider>
            <Footer />
        </body>
    </html>
  )
}