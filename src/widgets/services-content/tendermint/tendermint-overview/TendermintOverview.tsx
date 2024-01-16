import React, {FC} from 'react';
import StakingCalculator from "@/src/features/staking-calculator/StakingCalculator";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintOverview:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <StakingCalculator network={network}/>
        </>
    );
};

export default TendermintOverview;