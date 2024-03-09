import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import Header from "@/src/widgets/header/Header";
import Footer from "@/src/widgets/footer/Footer";
import ContentContainer from "@/src/shared/ui/page-container/PageContainer";
import StoreProvider from "@/app/StoreProvider";
import dynamic from "next/dynamic";
import PageContainer from "@/src/shared/ui/page-container/PageContainer";
import React from "react";
import FloatingBall from "@/src/shared/ui/floating-ball/FloatingBall";
// const FloatingBall = dynamic(() => import('@/src/shared/ui/floating-ball/FloatingBall'))

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
            <Header />
                <StoreProvider>
                    <PageContainer>
                        {children}
                        <FloatingBall left="10%" top="20%" size="500px" animationDuration={3} />
                        <FloatingBall left="70%" top="50%" size="800px" animationDuration={5} />
                    </PageContainer>
                </StoreProvider>
            <Footer />
        </body>
    </html>
  )
}