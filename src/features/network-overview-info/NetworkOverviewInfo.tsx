import React, {FC, useEffect, useState} from 'react';
import styles from "./NetworkOverviewInfo.module.scss"
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {useAmountOfStakedTokens} from "@/src/shared/hooks/useAmountOfStakedTokens"
import {INetwork} from "@/src/app/models/INetwork";
import axios from "axios";

const NetworkOverviewInfo:FC<TendermintContentProps> = ({network, nodeVersion, chainId}) => {
    let amountOfTokens = useAmountOfStakedTokens(network)
    const [valueOfStakedTokens, setValueOfStakedTokens] = useState<null | "not implemented" | number>(null)

    async function getValueOfStakedTokens(network: INetwork, amountOfTokens: number) {
        try {
            let priceResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${network.other.cg_ticker}&vs_currencies=usd`)
            let keys = Object.keys(priceResponse.data)

            if (amountOfTokens === 0) {
                setValueOfStakedTokens("not implemented")
            } else {
                setValueOfStakedTokens(Math.ceil(priceResponse.data[keys[0]].usd * Number(amountOfTokens)))
                console.log(Math.ceil(priceResponse.data[keys[0]].usd * Number(amountOfTokens)))
            }
        } catch (e) {
            setValueOfStakedTokens("not implemented")
        }
    }

    useEffect(() => {
        if (amountOfTokens) {
            getValueOfStakedTokens(network, amountOfTokens)
        }
    }, [amountOfTokens, network]);

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
                                ? <p>{valueOfStakedTokens}$</p>
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