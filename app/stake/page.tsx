import React from 'react';
import {NetworkType} from "@/src/app/models/INetwork";
import StakePage from "@/src/windows/stake/StakePage";

export const dynamicParams = false

const Page = () => {

    return (
        <StakePage type={NetworkType.mainnet}/>
    );
};

export default Page;