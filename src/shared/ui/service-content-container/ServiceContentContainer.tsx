'use client'

import React, {ComponentType, FC, useEffect, useMemo, useState} from 'react';
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import {ServicesEnum} from "@/src/app/models/IServices";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
import dynamic from "next/dynamic";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingService from "@/src/shared/ui/loading-service/LoadingService";
import {RootState} from '@/src/app/store/store';
import {useSelector} from "react-redux";
import {useTendermintNetworkParams} from "@/src/app/utils/useTendermintNetworkParams";

type ServicesComponents = {
    [key in ServicesEnum]: ComponentType<TendermintContentProps>;
};

const services: ServicesComponents = {
    [ServicesEnum.installation_guide]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-installation-guide/TendermintInstallationGuide'), {loading: LoadingService}),
    [ServicesEnum.snapshot]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-snapshot/TendermintSnapshot'), {loading: LoadingService}),
    [ServicesEnum.state_sync]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-state-sync/TendermintStateSync'), {loading: LoadingService}),
    [ServicesEnum.seeds]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-seeds/TendermintSeeds'), {loading: LoadingService}),
    [ServicesEnum.peers]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-peers/TendermintPeers'), {loading: LoadingService}),
    [ServicesEnum.overview]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-overview/TendermintOverview'), {loading: LoadingService}),
    [ServicesEnum.addrbook]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-addrbook/TendermintAddrbook'), {loading: LoadingService}),
    [ServicesEnum.genesis]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-genesis/TendermintGenesis'), {loading: LoadingService}),
    [ServicesEnum.useful_commands]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-useful-commands/TendermintUsefulCommands'), {loading: LoadingService}),
    [ServicesEnum.ibc]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-ibc/TendermintIBC'), {loading: LoadingService}),
    [ServicesEnum.endpoints]: dynamic(() => import('@/src/widgets/services-content/tendermint/tendermint-endpoints/TendermintEndpoints'), {loading: LoadingService})
};

interface ServiceContentContainerProps {
    networkName: string;
    type: NetworkType;
    service: ServicesEnum;
}

const ServiceContentContainer: FC<ServiceContentContainerProps> = ({ networkName, service, type}) => {
    const [currentNetwork, setCurrentNetwork] = useState<INetwork | null>(null);

    const mainnetNetworks = useSelector((state: RootState) => state.networks.mainnetNetworks);
    const testnetNetworks = useSelector((state: RootState) => state.networks.testnetNetworks);
    const networkParams = useTendermintNetworkParams(networkName, type);

    const getCurrentNetwork = (type: NetworkType, networkName: string) => {
        const networks = type === NetworkType.mainnet ? mainnets : testnets;
        const network = networks.find(n => n.name === networkName);

        if (network) {
            setCurrentNetwork(network);
        }
    };

    useEffect(() => {
        getCurrentNetwork(type, networkName);
    }, [type, networkName]);

    const ServiceComponent = useMemo(() => {
        if (mainnetNetworks.error || testnetNetworks.error) throw new Error()

        if (!currentNetwork || mainnetNetworks.loading || testnetNetworks.loading) return <LoadingService/>;

        const Service = services[service];
        if (!Service) return null;

        return (
            <Service network={currentNetwork} chainId={networkParams?.chain_id} nodeVersion={networkParams?.version} peers={networkParams?.peers}/>
        );
    }, [mainnetNetworks.error, mainnetNetworks.loading, testnetNetworks.error, testnetNetworks.loading, currentNetwork, service, networkParams?.chain_id, networkParams?.version, networkParams?.peers]);

    return (
        ServiceComponent
    );
};

const ServiceContentContainerMemo = React.memo(ServiceContentContainer);

export default ServiceContentContainerMemo;