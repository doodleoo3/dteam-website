import React, {FC} from 'react';
import styles from "./NetworkOverviewInfo.module.scss"
import {OverviewContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {useAmountAndValueOfStakedTokens} from "@/src/shared/hooks/useAmountAndValueOfStakedTokens"

const NetworkOverviewInfo:FC<OverviewContentProps> = ({network, nodeVersion, chainId, valueOfStakedTokens, amountOfTokens}) => {
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
                    {chainId
                        ? <p>{chainId}</p>
                        : <LoadingBlock width={100} />
                    }
                </div>

                <div className={styles.params__item}>
                    <h3>Node version: </h3>
                        {nodeVersion
                            ? <p>{nodeVersion}</p>
                            : <LoadingBlock width={100} />
                        }
                </div>

                {network.type === "mainnet"
                    ?
                    <>
                        <div className={styles.params__item}>
                            <h3>Staked tokens with DTEAM: </h3>
                            {amountOfTokens
                                ? <p>{amountOfTokens.toFixed(0)}${network.other.ticker}</p>
                                : <LoadingBlock width={100} />
                            }
                        </div>

                        <div className={styles.params__item}>
                            <h3>Staked value with DTEAM: </h3>
                            {valueOfStakedTokens
                                ?
                                <>
                                    {valueOfStakedTokens !== "not implemented"
                                        ? <p>{valueOfStakedTokens}$</p>
                                        : <p>{valueOfStakedTokens}</p>
                                    }
                                </>
                                : <LoadingBlock width={100}/>
                            }
                        </div>
                    </>
                    :
                    <></>
                }
            </div>
            <p>{network.description}</p>
        </div>
    );
};

export default NetworkOverviewInfo;