'use client'

import React, {FC, useState} from 'react';
import styles from "./TypeSelector.module.scss"
import {NetworkType} from "@/src/app/models/INetwork";
import {useParams, usePathname, useRouter} from "next/navigation";

interface TypeSelectorProps {
    withoutPair?: boolean
}

const TypeSelector:FC<TypeSelectorProps> = ({withoutPair}) => {
    const pathname = usePathname();
    const params = useParams<{ type: NetworkType;}>()
    const router = useRouter()
    const [networkType, setNetworkType] = useState<string | NetworkType>(params?.type ? params.type : NetworkType.mainnet)

    const getButtonColor = (type: NetworkType) => ({
        color: networkType === type ? "var(--primary-color)" : "var(--secondary-color)"
    });

    const handleButtonClick = (type: NetworkType) => {
        const regex = new RegExp(`${NetworkType.mainnet}|${NetworkType.testnet}`);
        if (pathname) {
            const newPath = pathname.replace(regex, type);
            setNetworkType(type);
            router.push(newPath);
        }
    }

    if (withoutPair) {
        return (
            <div className={styles.choose}>
                <div>
                    {networkType === NetworkType.mainnet ? "MAINNET ONLY" : "TESTNET ONLY"}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.choose}>
            <button
                style={getButtonColor(NetworkType.mainnet)}
                onClick={() => handleButtonClick(NetworkType.mainnet)}
            >MAINNET
            </button>
            /
            <button
                style={getButtonColor(NetworkType.testnet)}
                onClick={() => handleButtonClick(NetworkType.testnet)}
            >TESTNET</button>
        </div>
    );
};

export default TypeSelector;