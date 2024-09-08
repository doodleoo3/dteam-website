'use client'

import React, {FC, useCallback, useState} from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import TopSectionWrapper from "@/src/widgets/top-section-wrapper/TopSectionWrapper";
import NetworksList from "@/src/widgets/networks-list/NetworksList";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json";

type StakePageProps = {
    type: NetworkType;
}

const StakePage:FC<StakePageProps> = ({type}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchQueryChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    return (
        <>
            <TopSectionWrapper
                title="Staking"
                type={type}
                search={true}
                selector={false}
                getSearchQuery={handleSearchQueryChange}
            />

            <NetworksList isServicePage={false} networks={mainnets} searchQuery={searchQuery} isStakingPage={true}/>
        </>
    );
};

export default StakePage;