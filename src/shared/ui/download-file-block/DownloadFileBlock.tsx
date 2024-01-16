import React, {FC} from 'react';
import styles from "./DownloadFileBlock.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFile } from '@fortawesome/free-regular-svg-icons'

interface DownloadFileBlockProps {
    fileName: string;
}
const DownloadFileBlock:FC<DownloadFileBlockProps> = ({fileName}) => {
    return (
            <a className={styles.download}>
                <FontAwesomeIcon className={styles.icon} icon={faFile}/>
                <p className={styles.file_name}>{fileName}</p>
            </a>
    );
};

export default DownloadFileBlock;