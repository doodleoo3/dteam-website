'use client'

import React, {FC} from 'react';
import Link from "next/link";
import styles from "./ServiceSelector.module.scss"
import {usePathname} from "next/navigation";
import {NetworkType} from "@/src/app/models/INetwork";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"

interface ServiceSelectorProps {
    type: NetworkType;
    network: string;
}
const ServiceSelector:FC<ServiceSelectorProps> = ({type, network}) => {
    const pathname = usePathname()
    const networks = [...mainnets, ...testnets];

    const selectedNetwork = networks.find(net => net.type === type && net.name === network);

    const renderServices = () => {
        if (!selectedNetwork || !selectedNetwork.services) {
            return null;
        }

        return Object.entries(selectedNetwork.services).map(([key, value]) => {
            if (typeof value === 'object') {
                const hasActiveSubservice = Object.values(value).some(subValue => subValue === true);
                if (hasActiveSubservice) {
                    return (
                        <Link
                            className={`${styles.link} ${pathname?.includes(`${key}`) ? styles.active : ''}`}
                            href={`/services/${type}/${key}/${network}`}
                            key={key}
                        >
                            <li className={styles.link}>
                                {key.toUpperCase().replace(/-/g, ' ')}
                            </li>
                        </Link>
                    );
                }
            } else if (value === true) {
                return (
                    <Link
                        className={`${styles.link} ${pathname?.includes(`${key}`) ? styles.active : ''}`}
                        href={`/services/${type}/${key}/${network}`}
                        key={key}
                    >
                        <li className={styles.link}>
                            {key.toUpperCase().replace(/-/g, ' ')}
                        </li>
                    </Link>
                );
            }
            return null;
        });
    };

    return (
        <ul className={styles.list}>
            {renderServices()}
        </ul>
    );
};

export default ServiceSelector;