'use client'

import React, {FC, PropsWithChildren} from 'react';
import styles from "./PageContainer.module.scss"
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '@/src/app/store/store';

const PageContainer:FC<PropsWithChildren> = ({children}) => {
    const isOpen = useSelector((state: RootState) => state.mobileMenu.isOpen);

    return (
        <main className={isOpen ?  styles.hide : styles.container}>
            {children}
        </main>
    );
};

export default PageContainer;