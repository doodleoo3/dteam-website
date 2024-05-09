import React, {FC} from 'react';
import styles from "./NetworkOverviewInfo.module.scss"
import {OverviewContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {faGlobe} from "@fortawesome/free-solid-svg-icons/faGlobe";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

const NetworkOverviewInfo:FC<OverviewContentProps> = ({network, nodeVersion, chainId, valueOfStakedTokens, amountOfTokens}) => {

    return (
        <div className={styles.info}>
            <div className={styles.top__side__wrapper}>
                <h2>OVERVIEW</h2>

                <div className={styles.socials}>
                    <a target="__blank" href={network.links.explorer}>Explorer <span className={styles.icon}><FontAwesomeIcon icon={faMagnifyingGlass}/></span></a>
                    <a target="__blank" href={network.links.website}>Website <span className={styles.icon}><FontAwesomeIcon icon={faGlobe}/></span></a>
                    <a target="__blank" href={network.links.twitter}>Twitter / X <span className={styles.icon}><FontAwesomeIcon icon={faXTwitter}/></span></a>
                    <a target="__blank" href={network.links.github}>Github <span className={styles.icon}><FontAwesomeIcon icon={faGithub}/></span></a>
                    <a target="__blank" href="">Discord <span className={styles.icon}><FontAwesomeIcon icon={faDiscord}/></span></a>
                </div>
            </div>


            <div className={styles.params}>
                <div className={styles.params__item}>
                    <h3>Network type: </h3>
                    <p>{network.type}</p>
                </div>

                <div className={styles.params__item}>
                    <h3>Chain id: </h3>
                    {chainId
                        ? <p>{chainId}</p>
                        : <div className={styles.loading__container}><LoadingBlock width={100}/></div>

                }
            </div>

                <div className={styles.params__item}>
                    <h3>Node version: </h3>
                    {nodeVersion
                        ? <p>{nodeVersion}</p>
                        : <div className={styles.loading__container}><LoadingBlock width={100}/></div>

                    }
                </div>

                {network.type === "mainnet"
                    ?
                    <>
                    <div className={styles.params__item}>
                        <h3>Staked tokens with DTEAM: </h3>
                        {amountOfTokens
                            ? <p>{amountOfTokens.toFixed(0)}${network.other.ticker}</p>
                            : <div className={styles.loading__container}><LoadingBlock width={100}/></div>
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
                            : <div className={styles.loading__container}><LoadingBlock width={100}/></div>

                        }
                    </div>
                    </>
                    :
                    <></>
                }
            </div>
            <p className={styles.description}>{network.description}</p>
        </div>
    );
};

export default NetworkOverviewInfo;