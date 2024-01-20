import React, {FC} from 'react';
import StakingCalculator from "@/src/features/staking-calculator/StakingCalculator";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import NetworkOverviewInfo from "@/src/features/network-overview-info/NetworkOverviewInfo";
import styles from "./TendermintOverview.module.scss"
import StakingPanel from "@/src/features/staking-panel/StakingPanel";
const TendermintOverview:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <div className={styles.left__side__wrapper}>
                <NetworkOverviewInfo network={network}/>
                <StakingCalculator network={network}/>
            </div>
            <StakingPanel></StakingPanel>
        </>
    );
};

export default TendermintOverview;