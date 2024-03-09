import React, {FC} from 'react';
import styles from "./LoadingBlock.module.scss"
interface LoadingBlockProps {
    width: number;
    height: number;
}
const LoadingBlock:FC<LoadingBlockProps> = ({width, height}) => {
    return (
        <div className={styles.block} style={{width: `${width}px`, height: `${height}px`}}></div>
    );
};

export default LoadingBlock;