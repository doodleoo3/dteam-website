import React, {FC, PropsWithChildren} from 'react';
import styles from "./ComingSoon.module.scss"

const ComingSoon:FC<PropsWithChildren> = ({children}) => {
    return (
        <span className={styles.coming__soon}>
            {children}
        </span>
    );
};

export default ComingSoon;