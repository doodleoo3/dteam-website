'use client'

import React, {FC, useState} from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import TopSectionWrapper from "@/src/widgets/top-section-wrapper/TopSectionWrapper";
import NetworksList from "@/src/widgets/networks-list/NetworksList";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"

type NetworksPageProps = {
    type: NetworkType;
    title: string;
    isServicePage: boolean;
    service?: string;
}
const NetworksPage:FC<NetworksPageProps> = ({type, title, isServicePage, service}) => {
    const [searchQuery, setSearchQuery] = useState<string>("")

    const getSearchQuery = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <>
            <TopSectionWrapper
                title={title}
                type={type}
                search={true}
                selector={true}
                service={service && service}
                getSearchQuery={getSearchQuery}
            />
            <NetworksList
                networks={type === NetworkType.mainnet ? mainnets : testnets}
                searchQuery={searchQuery}
                isServicePage={isServicePage}
            />
        </>
    );
};

export default NetworksPage;