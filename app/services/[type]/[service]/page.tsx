import React from 'react';
import {MainnetServices, TestnetServices} from "@/src/app/models/IServices";
import {NetworkType} from "@/src/app/models/INetwork";
import NetworksPage from "@/src/pages/networks/NetworksPage";

export const dynamicParams = false

export function generateStaticParams() {
    const mainnetServices = Object.entries(MainnetServices).map(([, value]) => value);
    const testnetServices = Object.entries(TestnetServices).map(([, value]) => value);

    const mainnetParams = mainnetServices.map(service => ({
        type: NetworkType.mainnet,
        service: service
    }));

    const testnetParams = testnetServices.map(service => ({
        type: NetworkType.testnet,
        service: service
    }));

    return [...mainnetParams, ...testnetParams];
}

const Page = ({ params, }: { params: {type: NetworkType, service: MainnetServices | TestnetServices } }) => {
    const { type, service } = params

    return (
        <NetworksPage type={type} title={service} isServicePage={true} service={service}/>
    );
};

export default Page;