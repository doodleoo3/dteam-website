import React from 'react';
import {ServicesEnum} from "@/src/app/models/IServices";
import {NetworkType} from "@/src/app/models/INetwork";
import ServiceContentContainer from "@/src/shared/ui/service-content-container/ServiceContentContainer";

const Page = ({ params, }: { params: {type: NetworkType, service: ServicesEnum, network: string } }) => {
    const { type, service, network } = params

    return (
        <ServiceContentContainer networkName={network} type={type} service={service}/>
    );
};

export default Page;