import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import ServicesPage from "@/src/windows/services/ServicesPage";

export const dynamicParams = false
export function generateStaticParams() {
    return [{ type: NetworkType.mainnet }, { type: NetworkType.testnet }]
}

const Page = ({ params }: { params: { type: NetworkType } }) => {
    const { type } = params

    return (
        <ServicesPage type={type} />
    );
};

export default Page;