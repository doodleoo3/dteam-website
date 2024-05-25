'use client'

import React, {FC, PropsWithChildren, useEffect} from 'react';
import styles from "./PageContainer.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '@/src/app/store/store';
import {fetchMainnetNetworks, fetchTestnetNetworks} from "@/src/app/store/slices/tendermintNetworksInfoSlice";

const PageContainer:FC<PropsWithChildren> = ({children}) => {
    const dispatch: AppDispatch = useDispatch();

    const isOpen = useSelector((state: RootState) => state.mobileMenu.isOpen);

    useEffect(() => {
        dispatch(fetchMainnetNetworks());
        dispatch(fetchTestnetNetworks());
    }, [dispatch]);

    return (
        <main className={isOpen ?  styles.hide : styles.container}>
            {children}
        </main>
    );
};

export default PageContainer;