'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from "./ServiceContentContainer.module.scss"
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import {MainnetServices, TestnetServices} from "@/src/app/models/IServices";
import UsualTendermintInstallationGuide
    from "@/src/widgets/services-content/usual-tendermint-installation-guide/UsualTendermintInstallationGuide";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
import {useNetworkParams} from "@/src/shared/hooks/useNetworkParams";

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

    if (service === MainnetServices.installation_guide && currentNetwork) {
        return (
            <section className={styles.container}>
                <UsualTendermintInstallationGuide network={currentNetwork} chainId={chainId} nodeVersion={nodeVersion}/>
            </section>
        );
    }

    return (
        <section className={styles.container}>

        </section>
    );
};

export default ServiceContentContainer;