import React from 'react';
import {ServicesEnum} from "@/src/app/models/IServices";
import {NetworkType} from "@/src/app/models/INetwork";
import NetworksPage from "@/src/pages/networks/NetworksPage";

export const dynamicParams = false

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