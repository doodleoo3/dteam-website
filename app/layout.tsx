import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import Header from "@/src/widgets/header/Header";
import Footer from "@/src/widgets/footer/Footer";
import StoreProvider from "@/app/StoreProvider";
import PageContainer from "@/src/shared/ui/page-container/PageContainer";
import React from "react";
import FloatingBall from "@/src/shared/ui/floating-ball/FloatingBall";

export const metadata: Metadata = {
    title: "DTEAM",
    description: "DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
    keywords: ["DTEAM", "validator", "services", "community", "staking"],
    metadataBase: new URL("https://dteam.tech"),
    openGraph: {
        title: "DTEAM",
        description: "DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        url: "https://dteam.tech",
        type: "website",
        images: [
            {
                url: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
                width: 1200,
                height: 630,
                alt: "DTEAM",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@dteamtech",
        title: "DTEAM",
        description: "DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        images: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
    },
};

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