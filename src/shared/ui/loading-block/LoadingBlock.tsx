import React, {FC} from 'react';
import styles from "./LoadingBlock.module.scss"
interface LoadingBlockProps {
    width: number;
}
const LoadingBlock:FC<LoadingBlockProps> = ({width}) => {
    return (
        <div className={styles.block} style={{width: `${width}px`}}></div>
    );
};

export default LoadingBlock;