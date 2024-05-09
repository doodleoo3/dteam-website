'use client'

import React, {FC, useEffect, useState} from 'react';
import styles from "./ServicesList.module.scss"
import Link from "next/link";
import {NetworkType} from "@/src/app/models/INetwork";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"

interface ServicesListProps {
    type: NetworkType;
    searchQuery: string;
}

const ServicesList:FC<ServicesListProps> = ({type, searchQuery}) => {
    const initialData = type === "mainnet" ? mainnets : testnets;
    const [networksData, setNetworksData] = useState(initialData);
    const [filteredServices, setFilteredServices] = useState<string[]>([]);

    useEffect(() => {
        const allServices = new Set<string>();

        networksData.forEach((network: any) => {
            Object.entries(network.services).forEach(([key, value]: [string, any]) => {
                if (value === true) {
                    allServices.add(key);
                }
            });
        });

        const filtered = Array.from(allServices).filter(service =>
            service.replace(/-/g, ' ').toLowerCase().includes(searchQuery.toLowerCase())
        );

        filtered.sort((a, b) => a.localeCompare(b));

        setFilteredServices(filtered);
    }, [networksData, searchQuery]);

    const renderServiceLink = (service: string) => {
        return (
            <Link key={service} className={styles.item} href={`/services/${type}/${service}`}>
                {service.replace(/-/g, ' ')}
            </Link>
        );
    };

    return (
        <div className={styles.list}>
            {
                filteredServices.length > 0
                    ?
                    <>
                        {filteredServices.map((service: string) => (
                            renderServiceLink(service)
                        ))}
                    </>
                    : <h1>Services not found</h1>
            }

        </div>
    );
};

export default ServicesList;