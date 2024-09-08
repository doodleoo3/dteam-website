import React, {FC} from 'react';
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import styles from "./NetworkItem.module.scss"
import NetworkLinks from "@/src/shared/ui/network-links/NetworkLinks";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {useTendermintNetworkParams} from "@/src/app/utils/useTendermintNetworkParams";
import {useSelector} from "react-redux";
import {RootState} from "@/src/app/store/store";

interface NetworkItemProps {
    network: INetwork;
    isServicePage: boolean;
    isStakingPage?: boolean;
}

const NetworkItem:FC<NetworkItemProps> = React.memo(({network, isServicePage, isStakingPage}) => {
    const router = useRouter();
    const pathname = usePathname();

    const networkParams = useTendermintNetworkParams(network.name, network.type);
    const mainnetNetworks = useSelector((state: RootState) => state.networks.mainnetNetworks);
    const testnetNetworks = useSelector((state: RootState) => state.networks.testnetNetworks);

    if (isStakingPage) {
        return (
            <a
                className={`${styles.service__network} ${styles.network}`}
                href={network.links.delegate}
                target="__blank"
            >
                <div className={styles.logo__wrapper}>
                    <Image className={styles.logo} src={`/images/${network.name}.png`} width={400} height={400} alt="" />
                </div>

                <div className={styles.right__side__wrapper}>
                    <div className={styles.text__wrapper}>
                        <h2>{network.name}</h2>
                        {(network.type === NetworkType.mainnet && !isServicePage) || pathname?.includes("stake") ?
                        <div className={styles.apr__container}>
                                    {networkParams?.apr && networkParams?.apr !== "not available" ? <p>apr: {networkParams.apr}%</p> : <></>}

                                    {mainnetNetworks.error || testnetNetworks.error || networkParams?.apr === "not available" ? <p>apr: not available</p> : <></>}

                                    {(mainnetNetworks.loading || testnetNetworks.loading || !networkParams?.apr) && (!mainnetNetworks.error || !testnetNetworks.error) ? <LoadingBlock width={100} /> : <></>}

                        </div> : <></>}
                    </div>
                </div>
            </a>
        );
    }

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
                    <h2>{network.name}</h2>

                    {(network.type === NetworkType.mainnet && !isServicePage) || pathname?.includes("stake") ?
                        <div className={styles.apr__container}>
                            {networkParams?.apr && networkParams?.apr !== "not available" ? <p>apr: {networkParams.apr}%</p> : <></>}

                            {mainnetNetworks.error || testnetNetworks.error || networkParams?.apr === "not available" ? <p>apr: not available</p> : <></>}

                            {(mainnetNetworks.loading || testnetNetworks.loading || !networkParams?.apr) && (!mainnetNetworks.error || !testnetNetworks.error) ? <LoadingBlock width={100} /> : <></>}
                        </div> : <></>}
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
});

NetworkItem.displayName = 'NetworkItem';

export default NetworkItem;