import React, {FC} from 'react';
import styles from "./StakingCalculator.module.scss"
import {INetwork} from "@/src/app/models/INetwork";

interface StakingCalculatorProps {
    network: INetwork
}

const StakingCalculator:FC<StakingCalculatorProps> = ({network}) => {
    return (
        <div className={styles.calculator}>
            <h2>Calculator</h2>
            <input className={styles.range} type="range"/>

            <div className={styles.rewards}>
                <div className={styles.daily}>
                    <p>Daily:</p>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>

                <div className={styles.monthly}>
                    <p>Monthly:</p>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>

                <div className={styles.yearly}>
                    <p>Yearly:</p>
                    <p>0${network.other.ticker}</p>
                    <p>0$</p>
                </div>
            </div>
        </div>
    );
};

export default StakingCalculator;