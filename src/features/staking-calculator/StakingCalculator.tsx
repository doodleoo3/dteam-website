import React, { FC, useState, useEffect } from 'react';
import styles from "./StakingCalculator.module.scss";
import { INetwork } from "@/src/app/models/INetwork";
import { useApr } from "@/src/shared/hooks/useApr";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";

interface StakingCalculatorProps {
    network: INetwork;
}

interface Rewards {
    daily: string;
    monthly: string;
    yearly: string;
}

const StakingCalculator: FC<StakingCalculatorProps> = ({ network }) => {
    const apr = useApr(network); // может быть строкой или null
    const maxStake = 100000;
    const initialStake = maxStake / 2;
    const [stakeAmount, setStakeAmount] = useState<number>(initialStake);
    const [rewards, setRewards] = useState<Rewards>({ daily: '0', monthly: '0', yearly: '0' });

    const calculateRewards = (amount: number, apr: string): Rewards => {
        const aprNumber = parseFloat(apr); // Преобразуем строку APR в число
        const dailyReward = (amount * aprNumber) / 36500;
        const monthlyReward = dailyReward * 30;
        const yearlyReward = dailyReward * 365;
        return {
            daily: dailyReward.toFixed(2),
            monthly: monthlyReward.toFixed(2),
            yearly: yearlyReward.toFixed(2),
        };
    };

    useEffect(() => {
        if (apr !== null) {
            setRewards(calculateRewards(stakeAmount, apr));
        }
    }, [stakeAmount, apr]);

    return (
        <div className={styles.calculator}>
            <div className={styles.title__wrapper}>
                {apr !== null ? (
                    <h2 className={styles.title}>{network.name} APR: {apr} ({stakeAmount}${network.other.ticker})</h2>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <h2 style={{ marginRight: '10px' }} className={styles.title}>
                            {network.name} APR:
                        </h2>
                        <LoadingBlock width={100} />
                        <h2 style={{ marginLeft: '10px' }}>({stakeAmount}${network.other.ticker})</h2>
                    </div>
                )}
                <p>Annual Percentage Rate</p>
            </div>

            <input
                className={styles.range}
                type="range"
                min="0"
                max={maxStake}
                value={stakeAmount}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setStakeAmount(newValue);
                    if (apr !== null) {
                        setRewards(calculateRewards(newValue, apr));
                    }
                }}
            />

            <div className={styles.rewards}>
                <div className={styles.daily}>
                    <h3>Daily:</h3>
                    <p>{rewards.daily}${network.other.ticker}</p>
                    <p>${rewards.daily}</p>
                </div>

                <div className={styles.monthly}>
                    <h3>Monthly:</h3>
                    <p>{rewards.monthly}${network.other.ticker}</p>
                    <p>${rewards.monthly}</p>
                </div>

                <div className={styles.yearly}>
                    <h3>Yearly:</h3>
                    <p>{rewards.yearly}${network.other.ticker}</p>
                    <p>${rewards.yearly}</p>
                </div>
            </div>
        </div>
    );
};

export default StakingCalculator;