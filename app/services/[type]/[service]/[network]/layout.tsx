import type { Metadata } from 'next'
import '@/src/app/styles/index.scss'
import {NetworkType} from "@/src/app/models/INetwork";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json";
import testnets from "@/src/shared/lib/networks-data/testnets.json";
import {ServicesEnum} from "@/src/app/models/IServices";
import React from "react";
import SeparateServicePage from "@/src/windows/separate-service-page/SeparateServicePage";

export const metadata: Metadata = {
    title: 'SERVICES | DTEAM',
    description: 'DTEAM is a reliable validator. We provides the best and most up-to-date services on the market as well as create useful tools for the project community, node operators and developers.',
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