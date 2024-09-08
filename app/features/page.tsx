import React from 'react';
import FeaturesPage from "@/src/windows/features/FeaturesPage";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Features | DTEAM",
    description: "DTEAM provides advanced security, monitoring, hardware, and infrastructure features for blockchain networks to ensure robust and reliable performance. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
    keywords: ["DTEAM", "validator", "services", "community", "staking"],
    metadataBase: new URL("https://dteam.tech"),
    openGraph: {
        title: "Features | DTEAM",
        description: "DTEAM provides advanced security, monitoring, hardware, and infrastructure features for blockchain networks to ensure robust and reliable performance. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
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
        title: "Features | DTEAM",
        description: "DTEAM provides advanced security, monitoring, hardware, and infrastructure features for blockchain networks to ensure robust and reliable performance. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.",
        images: "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png",
    },
};

const Page = () => {
    return (
        <FeaturesPage />
    );
};

export default Page;