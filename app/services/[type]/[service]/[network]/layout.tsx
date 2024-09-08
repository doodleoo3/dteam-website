import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import {NetworkType} from "@/src/app/models/INetwork";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json";
import testnets from "@/src/shared/lib/networks-data/testnets.json";
import {ServicesEnum} from "@/src/app/models/IServices";
import React from "react";
import SeparateServicePage from "@/src/windows/separate-service-page/SeparateServicePage";


export async function generateMetadata({ params }): Promise<Metadata> {
    const { type, service, network } = params;
    const formattedService = service.replace(/\b\w/g, c => c.toUpperCase())
    const formattedNetwork = network.charAt(0).toUpperCase() + network.slice(1)
    const baseUrl = "https://dteam.tech";
    const title = `${formattedService.replace(/-/g, ' ')} | ${formattedNetwork} | DTEAM`;
    const description = `Explore the ${formattedService} service on ${formattedNetwork} ${type.replace(/\b\w/g, c => c.toUpperCase())}. DTEAM is a reliable validator. We provide the best and most up-to-date services on the market and create useful tools for the project community, node operators and developers.`;
    const imageUrl = "https://raw.githubusercontent.com/DTEAMTECH/identity/main/opengraph_main.png";

    return {
        title,
        description,
        keywords: [service, network, type, "DTEAM", "validator", "services", "community", "staking"],
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
                    alt: `DTEAM ${service} ${network}`,
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

export const dynamicParams = false

export function generateStaticParams() {
    const mainnetParams = mainnets.flatMap(mainnet => (
        Object.entries(mainnet.services).flatMap(([service, isActive]) =>
            isActive ? [{
                type: NetworkType.mainnet,
                service: service,
                network: mainnet.name
            }] : []
        )
    ));

    const testnetParams = testnets.flatMap(testnet => (
        Object.entries(testnet.services).flatMap(([service, isActive]) =>
            isActive ? [{
                type: NetworkType.testnet,
                service: service,
                network: testnet.name
            }] : []
        )
    ));

    return [...mainnetParams, ...testnetParams];
}

export default function DashboardLayout({
                                            children,
                                            params,
                                        }: {
    children: React.ReactNode,
    params: {type: NetworkType, service: ServicesEnum, network: string }
}) {
    const { type, service, network } = params

    return (
        <SeparateServicePage type={type} service={service} network={network}>
            {children}
        </SeparateServicePage>
    )
}