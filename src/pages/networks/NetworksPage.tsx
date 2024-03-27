'use client'

import React, { FC, useState, useCallback } from 'react';
import { NetworkType } from "@/src/app/models/INetwork";
import TopSectionWrapper from "@/src/widgets/top-section-wrapper/TopSectionWrapper";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json";
import testnets from "@/src/shared/lib/networks-data/testnets.json";
import NetworksList from "@/src/widgets/networks-list/NetworksList";

type NetworksPageProps = {
    type: NetworkType;
    title: string;
    isServicePage: boolean;
    service?: string;
};

const NetworksPage: FC<NetworksPageProps> = ({ type, title, isServicePage, service }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchQueryChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    return (
        <>
            <TopSectionWrapper
                title={title}
                type={type}
                search={true}
                selector={true}
                service={service}
                getSearchQuery={handleSearchQueryChange}
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