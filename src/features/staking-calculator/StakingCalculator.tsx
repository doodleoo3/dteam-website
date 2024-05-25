import React, { FC, useState, useEffect } from 'react';
import styles from "./StakingCalculator.module.scss";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {OverviewContentProps} from "@/src/app/models/ITendermintContentProps";

interface Rewards {
    daily: number;
    monthly: number;
    yearly: number;
}

const StakingCalculator: FC<OverviewContentProps> = ({ network, valueOfStakedTokens, amountOfTokens, apr }) => {
    const maxStake = 100000;
    const initialStake = maxStake / 2;
    const [stakeAmount, setStakeAmount] = useState<number>(initialStake);
    const [rewards, setRewards] = useState<Rewards>({ daily: 0, monthly: 0, yearly: 0 });

    const calculateRewards = (amount: number, apr: string): Rewards => {
        const aprNumber = parseFloat(apr);
        const dailyReward = (amount * aprNumber) / 36500;
        const monthlyReward = dailyReward * 30;
        const yearlyReward = dailyReward * 365;

        if (!apr || apr === "not available") {
            return {
                daily: 0,
                monthly: 0,
                yearly: 0,
            };
        }

        return {
            daily: Number(dailyReward.toFixed(2)),
            monthly: Number(monthlyReward.toFixed(2)),
            yearly: Number(yearlyReward.toFixed(2)),
        };
    };

    useEffect(() => {
        if (apr) {
            setRewards(calculateRewards(stakeAmount, apr));
        }
    }, [stakeAmount, apr]);

    return (
        <div className={styles.calculator}>
            <div className={styles.title__wrapper}>
                {apr
                    ?
                    <>
                        {apr === "not available"
                            ? <h2 className={styles.title}
                                  style={{textAlign: "center"}}>{network.name} APR: not available / {stakeAmount}${network.other.ticker}</h2>
                            : <h2 className={styles.title}
                                  style={{textAlign: "center"}}>{network.name} APR: {apr}% / {stakeAmount}${network.other.ticker}</h2>
                        }

                    </>
                    :
                    <h2 style={{marginRight: '10px', textAlign: "center"}} className={styles.title}>
                       {network.name} APR: <span style={{color: "var(--secondary-color)"}}>{`<loading...>`}</span> / {stakeAmount}${network.other.ticker}
                    </h2>
                }

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
                    if (apr && apr !== "not available") {
                        setRewards(calculateRewards(newValue, apr));
                    }
                }}
            />

            <div className={styles.rewards}>

                <div className={styles.daily}>
                    <h3>Daily:</h3>

                    {apr
                        ? <p>{rewards.daily}${network.other.ticker}</p>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }

                    {valueOfStakedTokens && amountOfTokens && apr
                        ?
                        <>
                            {valueOfStakedTokens !== "not implemented" && apr !== "not available"
                                ? <p>{(rewards.daily * (Number(valueOfStakedTokens) / amountOfTokens)).toFixed(2)}$</p>
                                : <p>0$</p>
                            }
                        </>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }
                </div>

                <div className={styles.monthly}>
                    <h3>Monthly:</h3>

                    {apr
                        ? <p>{rewards.monthly}${network.other.ticker}</p>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }

                    {valueOfStakedTokens && amountOfTokens && apr
                        ?
                        <>
                            {valueOfStakedTokens !== "not implemented" && apr !== "not available"
                                ? <p>{(rewards.monthly * (Number(valueOfStakedTokens) / amountOfTokens)).toFixed(2)}$</p>
                                : <p>0$</p>
                            }
                        </>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }
                </div>

                <div className={styles.yearly}>
                    <h3>Yearly:</h3>

                    {apr
                        ? <p>{rewards.yearly}${network.other.ticker}</p>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }

                    {valueOfStakedTokens && amountOfTokens && apr
                        ?
                        <>
                            {valueOfStakedTokens !== "not implemented" && apr !== "not available"
                                ? <p>{(rewards.yearly * (Number(valueOfStakedTokens) / amountOfTokens)).toFixed(2)}$</p>
                                : <p>0$</p>
                            }
                        </>
                        : <div className={styles.loading__container}><LoadingBlock width={75}/></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default StakingCalculator;