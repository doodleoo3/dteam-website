import React from 'react';
import {ServicesEnum} from "@/src/app/models/IServices";
import {NetworkType} from "@/src/app/models/INetwork";
import NetworksPage from "@/src/windows/networks/NetworksPage";
import type {Metadata} from "next";

export const dynamicParams = false

export async function generateMetadata({ params }): Promise<Metadata> {
    const { type, service } = params;
    const formattedService = service.replace(/\b\w/g, c => c.toUpperCase())
    const baseUrl = "https://dteam.tech";
    const title = `Services | ${formattedService.replace(/-/g, ' ')} | DTEAM`;
    const description = `Explore the ${type.replace(/\b\w/g, c => c.toUpperCase())} ${formattedService} service with DTEAM. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.`;
    const imageUrl = "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png";

    return {
        title,
        description,
        keywords: [service, type, "DTEAM", "validator", "services", "community", "staking"],
        metadataBase: new URL(baseUrl),
        openGraph: {
            title,
            description,
            url: baseUrl,
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `DTEAM ${service}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@dteamtech",
            title,
            description,
            images: imageUrl,
        },
    };
}

export function generateStaticParams() {
    const services = Object.entries(ServicesEnum).map(([, value]) => value);

    const mainnetParams = services.map(service => ({
        type: NetworkType.mainnet,
        service: service
    }));

    const testnetParams = services.map(service => ({
        type: NetworkType.testnet,
        service: service
    }));

    return [...mainnetParams, ...testnetParams];
}

const Page = ({ params, }: { params: {type: NetworkType, service: ServicesEnum } }) => {
    const { type, service } = params

    return (
        <NetworksPage type={type} title={service} isServicePage={true} service={service}/>
    );
};

export default Page;