import React, {FC, PropsWithChildren} from 'react';
import styles from "./PageTitle.module.scss"
const PageTitle:FC<PropsWithChildren> = ({children}) => {
    return (
        <h1 className={styles.title}>
            {children}
        </h1>
    );
};

export default PageTitle;