import React, {FC} from 'react';
import styles from "./FloatingBall.module.scss"
interface FloatingBallProps {
    left: string,
    top: string,
    size: string
    animationDuration: number
}

const FloatingBall:FC<FloatingBallProps> = ({left, top, size, animationDuration}) => {
    return (
        <div className={styles.floating__ball}
             style={{
                 left,
                 top,
                 width: size,
                 height: size,
                 animationDuration: `${animationDuration}s`
        }}/>
    );
};

export default FloatingBall;