'use client'

import React, {FC, useState} from 'react';
import TopSectionWrapper from "@/src/widgets/top-section-wrapper/TopSectionWrapper";
import {NetworkType} from "@/src/app/models/INetwork";
import dynamic from "next/dynamic";
import ServicesList from "@/src/widgets/services-list/ServicesList";

type ServicesPageProps = {
    type: NetworkType;
}

const ServicesPage:FC<ServicesPageProps> = ({type}) => {
    const [searchQuery, setSearchQuery] = useState<string>("")

    const getSearchQuery = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <>
            <TopSectionWrapper
                title="Services"
                type={type}
                search={true}
                selector={true}
                getSearchQuery={getSearchQuery}
                isPageWithServices={true}
            />

            <ServicesList type={type} searchQuery={searchQuery}/>
        </>
    );
};

export default ServicesPage;