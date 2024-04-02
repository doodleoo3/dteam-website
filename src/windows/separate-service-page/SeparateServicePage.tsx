'use client'

import React, {FC, PropsWithChildren} from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import TopSectionWrapper from "@/src/widgets/top-section-wrapper/TopSectionWrapper";
import ServicePageWrapper from "@/src/shared/ui/service-page-wrapper/ServicePageWrapper";
import ServiceSelector from "@/src/features/service-selector/ServiceSelector";

interface ServiceServicePageProps {
    service: string;
    type: NetworkType;
    network: string;
}
const SeparateServicePage:FC<PropsWithChildren<ServiceServicePageProps>> = ({service, type, network, children}) => {
    return (
        <>
            <TopSectionWrapper
                title={service}
                type={type}
                networkName={network}
                search={false}
                selector={true}
                service={service}
            />
            <ServicePageWrapper>
                <ServiceSelector type={type} network={network}></ServiceSelector>
                {children}
            </ServicePageWrapper>
        </>
    );
};

export default SeparateServicePage;