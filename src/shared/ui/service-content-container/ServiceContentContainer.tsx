'use client'

import React, {ComponentType, FC, useCallback, useEffect, useMemo, useState} from 'react';
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import {ServicesEnum} from "@/src/app/models/IServices";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
import {useNetworkParams} from "@/src/shared/hooks/useNetworkParams";
import dynamic from "next/dynamic";
import {useAppDispatch} from "@/src/app/store/hooks";
import {fetchTendermintParams} from "@/src/app/store/action-creators/fetchTendermintParams";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingService from "@/src/shared/ui/loading-service/LoadingService";
import axios from "axios";

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

const ServiceContentContainer: FC<ServiceContentContainerProps> = React.memo(({ networkName, service, type }) => {
    const dispatch = useAppDispatch();

    const [currentNetwork, setCurrentNetwork] = useState<INetwork | null>(null);
    const { chainId, nodeVersion } = useNetworkParams(currentNetwork);
    const [peers, setPeers] = useState<string | null>(null);

    const getCurrentNetwork = useCallback((type: NetworkType, networkName: string) => {
        const networks = type === NetworkType.mainnet ? mainnets : testnets;
        const network = networks.find(n => n.name === networkName);

        if (network) {
            dispatch(fetchTendermintParams(network));

            setCurrentNetwork(network);

            fetchPeers(network).then(data => {
                if (data !== null) {
                    setPeers(data);
                }
            });
        }
    }, [dispatch]);

    async function fetchPeers(network: INetwork) {
        try {
            const response = await axios.get<ISnapshot>(`https://data.dteam.tech/${network.name}/${network.type}/snapshot`);
            return response.data.peers;
        } catch (e) {
            throw Error()
        }
    }

    useEffect(() => {
        getCurrentNetwork(type, networkName);
    }, []);

    const ServiceComponent = useMemo(() => {
        if (!currentNetwork) return <LoadingService/>;

        const Service = services[service];
        if (!Service) return null;

        return (
            <Service network={currentNetwork} chainId={chainId} nodeVersion={nodeVersion} peers={peers}/>
        );
    }, [currentNetwork, service, chainId, nodeVersion, peers]);

    return (
        ServiceComponent
    );
});

ServiceContentContainer.displayName = 'ServiceContentContainer';

export default ServiceContentContainer;