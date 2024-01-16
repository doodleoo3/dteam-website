'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from "./ServiceContentContainer.module.scss"
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import {MainnetServices, TestnetServices} from "@/src/app/models/IServices";
import TendermintInstallationGuide
    from "@/src/widgets/services-content/tendermint/tendermint-installation-guide/TendermintInstallationGuide";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
import {useNetworkParams} from "@/src/shared/hooks/useNetworkParams";
import TendermintSnapshot from "@/src/widgets/services-content/tendermint/tendermint-snapshot/TendermintSnapshot";
import TendermintStateSync from "@/src/widgets/services-content/tendermint/tendermint-state-sync/TendermintStateSync";
import TendermintAddrbook from "@/src/widgets/services-content/tendermint/tendermint-addrbook/TendermintAddrbook";
import TendermintGenesis from "@/src/widgets/services-content/tendermint/tendermint-genesis/TendermintGenesis";
import TendermintSeeds from "@/src/widgets/services-content/tendermint/tendermint-seeds/TendermintSeeds";
import TendermintPeers from "@/src/widgets/services-content/tendermint/tendermint-peers/TendermintPeers";
import TendermintOverview from "@/src/widgets/services-content/tendermint/tendermint-overview/TendermintOverview";

interface ServiceContentContainerProps {
    networkName: string;
    type: NetworkType;
    service: MainnetServices | TestnetServices;
}
const ServiceContentContainer:FC<ServiceContentContainerProps> = ({networkName, service, type}) => {
    const [currentNetwork, setCurrentNetwork] = useState<INetwork | null>(null);
    const {chainId, nodeVersion} = useNetworkParams(currentNetwork)

    const getCurrentNetwork = useCallback((type : NetworkType, networkName : string) => {
        if (type === NetworkType.mainnet) {
            mainnets.forEach(network => {
                if (networkName === network.name) {
                    setCurrentNetwork(network);
                }
            });
        }

        if (type === NetworkType.testnet) {
            testnets.forEach(network => {
                if (networkName === network.name) {
                    setCurrentNetwork(network);
                }
            });
        }
    }, [setCurrentNetwork]);

    useEffect(() => {
        getCurrentNetwork(type, networkName)
    }, [getCurrentNetwork, networkName, type]);

    if (service === MainnetServices.overview && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintOverview network={currentNetwork} />
            </section>
        );
    }

    if (service === MainnetServices.peers && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintPeers network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.seeds && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintSeeds network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.genesis && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintGenesis network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.addrbook && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintAddrbook network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.state_sync && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintStateSync network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.snapshot && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintSnapshot network={currentNetwork}/>
            </section>
        );
    }

    if (service === MainnetServices.installation_guide && currentNetwork) {
        return (
            <section className={styles.container}>
                <TendermintInstallationGuide network={currentNetwork} chainId={chainId} nodeVersion={nodeVersion}/>
            </section>
        );
    }

    return (
        <section className={styles.container}>

        </section>
    );
};

export default ServiceContentContainer;