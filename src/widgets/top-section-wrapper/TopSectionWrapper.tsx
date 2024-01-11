import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from "./TopSectionWrapper.module.scss"
import {NetworkType} from "@/src/app/models/INetwork";
import SecondaryColorText from "@/src/shared/ui/secondary-color-text/SecondaryColorText";
import PageTitle from "@/src/shared/ui/page-title/PageTitle";
import Blank from "@/src/shared/ui/blank/Blank";
import Search from "@/src/features/search/Search";
import TypeSelector from "@/src/features/type-selector/TypeSelector";
import mainnets from "@/src/shared/lib/networks-data/mainnets.json";
import testnets from "@/src/shared/lib/networks-data/testnets.json";
import {IServices} from "@/src/app/models/IServices";

interface TopSectionWrapperProps {
    title: string;
    type: NetworkType;
    networkName?: string;
    service?: string;
    search: boolean;
    selector: boolean;
    getSearchQuery?: (searchQuery: string) => void;
}
const TopSectionWrapper:FC<TopSectionWrapperProps> = ({title, type, networkName, getSearchQuery, service}) => {
    const formattedTitle = title.replace(/-/g, ' ');
    
    const [findInMainnet, setFindInMainnet] = useState<boolean>(false)
    const [findInTestnet, setFindInTestnet] = useState<boolean>(false)

    const canSwitchable = useCallback(() =>  {
        const serviceKey = service as keyof IServices;
        
        mainnets.forEach(network => {
            if (networkName === network.name) {
                if (mainnets.some(network => network.services[serviceKey])) {
                    setFindInMainnet(true);
                }
            }
        })

        testnets.forEach(network => {
            if (networkName === network.name) {
                if (testnets.some(network => network.services[serviceKey])) {
                    setFindInTestnet(true)
                }
            }
        })
    }, [networkName, service]);

    useEffect(() => {
        canSwitchable();
    }, [canSwitchable, service]);
    
    return (
        <section className={styles.wrapper}>
            <Blank></Blank>
            {networkName
                ? <PageTitle>{formattedTitle} <SecondaryColorText>/ {networkName} / {type}</SecondaryColorText></PageTitle>
                : <PageTitle>{formattedTitle} <SecondaryColorText>/ {type}</SecondaryColorText></PageTitle>
            }
            <div className={styles.right__side__wrapper}>
                {getSearchQuery && <Search getSearchQuery={getSearchQuery}/>}
                {(findInMainnet && findInTestnet) || (!networkName && service !== "ibc")
                    ? <TypeSelector />
                    : <TypeSelector withoutPair={true}/>
                }
            </div>
        </section>
    );
};

export default TopSectionWrapper;