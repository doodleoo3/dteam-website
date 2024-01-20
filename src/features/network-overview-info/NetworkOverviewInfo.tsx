import React, {FC} from 'react';
import styles from "./NetworkOverviewInfo.module.scss"
import {INetwork} from "@/src/app/models/INetwork";

interface NetworkOverviewInfoProps {
    network: INetwork
}
const NetworkOverviewInfo:FC<NetworkOverviewInfoProps> = ({network}) => {
    return (
        <div className={styles.info}>
            <h2>OVERVIEW</h2>
            <div className={styles.params}>
                <div className={styles.params__item}>
                    <h3>Network type: </h3>
                    <p>{network.type}</p>
                </div>

                <div className={styles.params__item}>
                    <h3>Chain id: </h3>
                    <p>chain-id</p>
                </div>

                <div className={styles.params__item}>
                    <h3>Node version: </h3>
                    <p>v1.0.0</p>
                </div>

                <div className={styles.params__item}>
                    <h3>Staked tokens with DTEAM: </h3>
                    <p>0${network.other.ticker}</p>
                </div>

                <div className={styles.params__item}>
                    <h3>Staked value with DTEAM: </h3>
                    <p>0$</p>
                </div>
            </div>
            <p>{network.description}</p>
        </div>
    );
};

export default NetworkOverviewInfo;