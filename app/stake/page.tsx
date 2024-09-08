import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import StakePage from "@/src/windows/stake/StakePage";
import type {Metadata} from "next";

export const dynamicParams = false

export const metadata: Metadata = {
    title: "Staking | DTEAM",
    description: "Stake your assets securely with DTEAM and enjoy competitive APRs across multiple blockchain networks, maximizing your staking rewards, 100% refund for downtime slash. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
    keywords: ["DTEAM", "validator", "services", "community", "staking", "secure assets"],
    metadataBase: new URL("https://dteam.tech"),
    openGraph: {
        title: "Staking | DTEAM",
        description: "Stake your assets securely with DTEAM and enjoy competitive APRs across multiple blockchain networks, maximizing your staking rewards, 100% refund for downtime slash. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
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
        title: "Staking | DTEAM",
        description: "Stake your assets securely with DTEAM and enjoy competitive APRs across multiple blockchain networks, maximizing your staking rewards, 100% refund for downtime slash. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        images: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
    },
};

const Page = () => {

    return (
        <StakePage type={NetworkType.mainnet}/>
    );
};

export default Page;