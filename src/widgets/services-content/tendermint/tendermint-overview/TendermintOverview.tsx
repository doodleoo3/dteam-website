import React, {FC} from 'react';
import StakingCalculator from "@/src/features/staking-calculator/StakingCalculator";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import NetworkOverviewInfo from "@/src/features/network-overview-info/NetworkOverviewInfo";
import styles from "./TendermintOverview.module.scss"
import StakingPanel from "@/src/features/staking-panel/StakingPanel";
import {useAmountAndValueOfStakedTokens} from "@/src/shared/hooks/useAmountAndValueOfStakedTokens";
import {useApr} from "@/src/shared/hooks/useApr";
const TendermintOverview:FC<TendermintContentProps> = ({network, chainId, nodeVersion}) => {
    const { amount, value } = useAmountAndValueOfStakedTokens(network);
    const apr = useApr(network);

    return (
        <div className={styles.overview__container}>
            <div className={styles.left__side__wrapper}>
                <NetworkOverviewInfo network={network} chainId={chainId} nodeVersion={nodeVersion} valueOfStakedTokens={value} amountOfTokens={amount}/>
                {network.type === "mainnet"
                    ? <StakingCalculator network={network} valueOfStakedTokens={value} amountOfTokens={amount} apr={apr}/>
                    : <></>
                }
            </div>
            {/*<StakingPanel />*/}
        </div>
    );
};

export default TendermintOverview;