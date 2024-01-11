import React, {FC, PropsWithChildren} from 'react';
import styles from "./ServicePageWrapper.module.scss"
const ServicePageWrapper:FC<PropsWithChildren> = ({children}) => {
    return (
        <section className={styles.wrapper}>
            {children}
        </section>
    );
};

export default ServicePageWrapper;