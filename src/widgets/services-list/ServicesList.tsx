import React, {FC, useState} from 'react';
import styles from "./ServicesList.module.scss"
import Link from "next/link";
import {NetworkType} from "@/src/app/models/INetwork";
import {ServicesEnum} from "@/src/app/models/IServices";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
interface ServicesListProps {
    type: NetworkType
}

const ServicesList:FC<ServicesListProps> = ({type}) => {
    const [networksData, setNetworksData] = useState(type === "mainnet" ? mainnets : testnets)

    const allServices = new Set<string>();
    networksData.forEach((network: any) => {
        Object.entries(network.services).forEach(([key, value]: [string, any]) => {
            if (value === true) {
                allServices.add(key);
            }
        });
    });

    const renderServiceLink = (service: string) => {
        return (
            <Link key={service} className={styles.item} href={`/services/${type}/${service}`}>
                {service.replace(/-/g, ' ')}
            </Link>
        );
    };

    return (
        <div className={styles.list}>
            {Array.from(allServices).map((service: string) => (
                renderServiceLink(service)
            ))}
        </div>
    );
};

export default ServicesList;