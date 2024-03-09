import React, {FC, PropsWithChildren} from 'react';
import styles from "./PageContainer.module.scss"
import FloatingBall from "@/src/shared/ui/floating-ball/FloatingBall";
const PageContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <main className={styles.container}>
            {children}
        </main>
    );
};

export default PageContainer;