import React, {FC} from 'react';
import styles from "./ServicesList.module.scss"
import Link from "next/link";
import {NetworkType} from "@/src/app/models/INetwork";
import {MainnetServices, TestnetServices} from "@/src/app/models/IServices";

interface ServicesListProps {
    type: NetworkType
}

const ServicesList:FC<ServicesListProps> = ({type}) => {
    const serviceLinks = type === NetworkType.mainnet ? MainnetServices : TestnetServices;

    return (
        <div className={styles.list}>
            <div className={styles.list}>
                {Object.entries(serviceLinks).map(([key, value]) => (
                    <Link key={key} className={styles.item} href={`/services/${type}/${value}`}>
                        {value.replace(/-/g, ' ')}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ServicesList;