import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import Header from "@/src/widgets/header/Header";
import Footer from "@/src/widgets/footer/Footer";
import StoreProvider from "@/app/StoreProvider";
import PageContainer from "@/src/shared/ui/page-container/PageContainer";
import React from "react";
import FloatingBall from "@/src/shared/ui/floating-ball/FloatingBall";

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
        <body style={{overflowX: "hidden"}}>
        <StoreProvider>
            <Header />
                    <PageContainer>
                        {children}
                        <FloatingBall left="10%" top="20%" size="30vw" animationDuration={3} />
                        <FloatingBall left="70%" top="50%" size="50vw" animationDuration={5} />
                    </PageContainer>
            <Footer />
        </StoreProvider>
        </body>
    </html>
  )
}