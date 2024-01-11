import React, {FC, PropsWithChildren} from 'react';
import styles from "./SecondaryColorText.module.scss"
const SecondaryColorText:FC<PropsWithChildren> = ({children}) => {
    return (
        <span className={styles.secondary__text}>
            {children}
        </span>
    );
};

export default SecondaryColorText;