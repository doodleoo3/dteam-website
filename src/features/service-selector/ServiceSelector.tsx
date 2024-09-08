'use client'

import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import styles from "./ServiceSelector.module.scss"
import {usePathname} from "next/navigation";
import {NetworkType} from "@/src/app/models/INetwork";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json"
import testnets from "@/src/shared/lib/networks-data/testnets.json"
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";

interface ServiceSelectorProps {
    type: NetworkType;
    network: string;
}
const ServiceSelector:FC<ServiceSelectorProps> = ({type, network}) => {
    const pathname = usePathname()
    const networks = [...mainnets, ...testnets];

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const selectedNetwork = networks.find(net => net.type === type && net.name === network);
    const [currentService, setCurrentService] = useState<string>("overview")

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1200;

            setIsMobile(mobile);

            // if (!mobile) {
            //     setIsExpanded(true);
            // }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [type, network]);

    useEffect(() => {
        setCurrentService(getCurrentService(pathname))
    }, [pathname]);

    const toggleServices = () => {
        setIsExpanded(!isExpanded);
    };

    const getCurrentService = (pathname: string) => {
        const segments = pathname.split('/').filter(Boolean);
        return segments[2] || 'overview';
    };

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
        <div className={styles.list__container}>
            {/*<p className={styles.additional__navigation}>*/}
            {/*    <Link href={`/networks/mainnet`}>networks</Link> / <Link href={`/services/mainnet`}>services</Link> / <Link*/}
            {/*    href={`/services/mainnet/${currentService}`}>{currentService.toUpperCase().replace(/-/g, ' ')}</Link> / <span>{network}</span>*/}
            {/*</p>*/}

            <p className={styles.additional__navigation}>
               <Link href={`/services/mainnet`}>services</Link> / <Link href={`/services/mainnet/${currentService}`}>{currentService.toUpperCase().replace(/-/g, ' ')}</Link> / <span>{network}</span>
            </p>

            <ul className={styles.mobile__list}>

                <li className={`${styles.link} ${isExpanded ? styles.active : ""}`}
                    onClick={toggleServices}>
                    Choose Service
                    <span className={styles.active}>
                    {isExpanded
                        ? <FontAwesomeIcon icon={faAngleUp}/>
                        : <FontAwesomeIcon icon={faAngleDown}/>
                    }
                </span>
                </li>

                {isExpanded && renderServices()}
            </ul>

            <ul className={styles.list}>
                {renderServices()}
            </ul>
        </div>
    );
};

export default ServiceSelector;