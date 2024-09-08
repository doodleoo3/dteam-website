import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import ServicesPage from "@/src/windows/services/ServicesPage";
import type {Metadata} from "next";

export const dynamicParams = false
export function generateStaticParams() {
    return [{ type: NetworkType.mainnet }, { type: NetworkType.testnet }]
}

export const metadata: Metadata = {
    title: "Services | DTEAM",
    description: "DTEAM provides comprehensive blockchain maintenance services, including addrbooks, snapshots, IBC integration, and more to ensure seamless network operations. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
    keywords: ["DTEAM", "validator", "services", "community", "staking"],
    metadataBase: new URL("https://dteam.tech"),
    openGraph: {
        title: "Services | DTEAM",
        description: "DTEAM provides comprehensive blockchain maintenance services, including addrbooks, snapshots, IBC integration, and more to ensure seamless network operations. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
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
        title: "Services | DTEAM",
        description: "DTEAM provides comprehensive blockchain maintenance services, including addrbooks, snapshots, IBC integration, and more to ensure seamless network operations. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        images: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
    },
};

const Page = ({ params }: { params: { type: NetworkType } }) => {
    const { type } = params

    return (
        <ServicesPage type={type} />
    );
};

export default Page;