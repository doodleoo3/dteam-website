import React, {FC, useEffect} from 'react';
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import styles from "./NetworkItem.module.scss"
import NetworkLinks from "@/src/shared/ui/network-links/NetworkLinks";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {useApr} from "@/src/shared/hooks/useApr";

interface NetworkItemProps {
    network: INetwork
    isServicePage: boolean
}

const NetworkItem:FC<NetworkItemProps> = ({network, isServicePage}) => {
    const router = useRouter()
    const pathname = usePathname()
    const apr = useApr(network);

    return (
        <div
            className={isServicePage ? `${styles.service__network} ${styles.network}` : styles.network}
            onClick={() => isServicePage ? router.push(pathname + `/${network.name}`) : null}
        >
            <div className={styles.logo__wrapper}>
                <Image className={styles.logo} src={`/images/${network.name}.png`} width={400} height={400} alt=""></Image>
            </div>

            <div className={styles.right__side__wrapper}>
                <div className={styles.text__wrapper}>
                    <h2>{network.name.toUpperCase()}</h2>
                    <div className={styles.apr__container}>
                        {(network.type === NetworkType.mainnet && !isServicePage) || pathname?.includes("stake")
                            ?
                            <>
                                {apr
                                    ? <p>apr: {apr}</p>
                                    : <LoadingBlock width={100}></LoadingBlock>
                                }
                            </>
                            : null
                        }
                    </div>

                </div>
            </div>

            {!isServicePage &&
                <NetworkLinks
                    network={network}
                    type={network.type === NetworkType.mainnet ? NetworkType.mainnet : NetworkType.testnet}
                />
            }
        </div>
    );
};

export default NetworkItem;