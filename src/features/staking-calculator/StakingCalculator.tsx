import React, {FC} from 'react';
import styles from "./StakingCalculator.module.scss"
import {INetwork} from "@/src/app/models/INetwork";
import {useApr} from "@/src/shared/hooks/useApr";

interface StakingCalculatorProps {
    network: INetwork
}

const StakingCalculator:FC<StakingCalculatorProps> = ({network}) => {
    const apr = useApr(network);

    return (
        <div className={styles.calculator}>
            <div className={styles.title__wrapper}>
                <h2 className={styles.title}>{network.name} APR: {apr}</h2>
                <p>Annual Percentage Rate</p>
            </div>

            <input className={styles.range} type="range"/>

            <div className={styles.rewards}>
                <div className={styles.daily}>
                    <h3>Daily:</h3>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>

                <div className={styles.monthly}>
                    <h3>Monthly:</h3>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>

                <div className={styles.yearly}>
                    <h3>Yearly:</h3>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>
            </div>
        </div>
    );
};

export default StakingCalculator;