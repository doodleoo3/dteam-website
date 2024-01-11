'use client'

import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./NetworksList.module.scss"
import {INetwork} from "@/src/app/models/INetwork";
import NetworkItem from "@/src/entities/network-item/NetworkItem";
import {usePathname} from "next/navigation";
import {IServices} from "@/src/app/models/IServices";

interface NetworkListProps {
    networks: INetwork[];
    searchQuery: string;
    isServicePage: boolean;
}

const NetworksList:FC<NetworkListProps> = ({networks, searchQuery, isServicePage}) => {
    const pathname = usePathname();

    function getServiceName(pathname:string) {
        const parts = pathname.split('/');
        return parts[parts.length - 1];
    }

    const getServiceNetworks = useMemo(() => {
        if (isServicePage && pathname) {
            const serviceName = getServiceName(pathname).toLowerCase() as keyof IServices;
            return Array.isArray(networks) ? networks.filter(network => {
                if (serviceName === 'endpoints') {
                    return Object.values(network.services.endpoints).some(value => value);
                } else {
                    return network.services[serviceName];
                }
            }) : [];
        } else {
            return [];
        }
    }, [isServicePage, pathname, networks]);

    const [serviceNetworks, setServiceNetworks] = useState(getServiceNetworks)
    
    const getFilteredNetworks = useMemo(() => {
        if (isServicePage) {
            return Array.isArray(networks)
                ? serviceNetworks.filter((network) => network.name.toUpperCase().includes(searchQuery.toUpperCase()))
                : [];
        } else {
            return Array.isArray(networks)
                ? networks.filter((network) => network.name.toUpperCase().includes(searchQuery.toUpperCase()))
                : [];
        }
    }, [isServicePage, networks, serviceNetworks, searchQuery])

    const [filteredNetworks, setFilteredNetworks] = useState(getFilteredNetworks)

    useEffect(() => {
        setFilteredNetworks(getFilteredNetworks)
    }, [getFilteredNetworks]);

    return (
        <div className={styles.list}>
            {filteredNetworks.map(network =>
                <NetworkItem key={network.id} network={network} isServicePage={isServicePage}/>
            )}
        </div>
    );
};

export default NetworksList;