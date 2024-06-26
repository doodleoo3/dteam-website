import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import NetworksPage from "@/src/windows/networks/NetworksPage";

export function generateStaticParams() {
    return [{ type: NetworkType.mainnet }, { type: NetworkType.testnet }]
}

export const dynamicParams = false

const Page = ({ params }: { params: { type: NetworkType } }) => {
    const { type } = params

    return (
        <NetworksPage type={type} title="Networks" isServicePage={false}/>
    );
};

export default Page;