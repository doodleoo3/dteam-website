import React, {FC, InputHTMLAttributes} from 'react';
import styles from "./Input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    search?: string
}
const Input:FC<InputProps> = ({...props}) => {
    return (
        <>
            {props.search
                ?
                <input className={styles.input} {...props}/>
                :
                <input className={`${styles.short__input} ${styles.input}`} {...props}/>
            }
        </>
    );
};

export default Input;