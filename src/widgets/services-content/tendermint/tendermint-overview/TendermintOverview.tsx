import React, {FC} from 'react';
import StakingCalculator from "@/src/features/staking-calculator/StakingCalculator";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import NetworkOverviewInfo from "@/src/features/network-overview-info/NetworkOverviewInfo";
import styles from "./TendermintOverview.module.scss"
import {useTendermintNetworkParams} from "@/src/app/utils/useTendermintNetworkParams";
import {NetworkType} from "@/src/app/models/INetwork";
const TendermintOverview:FC<TendermintContentProps> = ({network}) => {
    const networkParams = useTendermintNetworkParams(network.name, network.type);

    return (
        <div className={styles.overview__container}>
            <div className={styles.left__side__wrapper}>
                <NetworkOverviewInfo network={network} chainId={networkParams?.chain_id} nodeVersion={networkParams?.version} validatorStatus={networkParams?.validator_status} valueOfStakedTokens={networkParams?.staked_value} amountOfTokens={networkParams?.staked_tokens}/>
                {network.type === NetworkType.mainnet
                    ? <StakingCalculator network={network} valueOfStakedTokens={networkParams?.staked_value} amountOfTokens={networkParams?.staked_tokens} apr={`${networkParams?.apr}`}/>
                    : <></>
                }
            </div>
            {/*<StakingPanel />*/}
        </div>
    );
};

export default TendermintOverview;