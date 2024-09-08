import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import NetworksPage from "@/src/windows/networks/NetworksPage";
import type {Metadata} from "next";

export function generateStaticParams() {
    return [{ type: NetworkType.mainnet }, { type: NetworkType.testnet }]
}

export const dynamicParams = false

export const metadata: Metadata = {
    title: "Networks | DTEAM",
    description: "DTEAM provides diverse and secure blockchain validation services with competitive APRs, enhancing the reliability and security of various networks. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
    keywords: ["DTEAM", "validator", "services", "community", "staking", "secure assets"],
    metadataBase: new URL("https://dteam.tech"),
    openGraph: {
        title: "Networks | DTEAM",
        description: "DTEAM provides diverse and secure blockchain validation services with competitive APRs, enhancing the reliability and security of various networks. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
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
        title: "Networks | DTEAM",
        description: "DTEAM provides diverse and secure blockchain validation services with competitive APRs, enhancing the reliability and security of various networks. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        images: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
    },
};

const Page = ({ params }: { params: { type: NetworkType } }) => {
    const { type } = params

    return (
        <NetworksPage type={type} title="Networks" isServicePage={false}/>
    );
};

export default Page;