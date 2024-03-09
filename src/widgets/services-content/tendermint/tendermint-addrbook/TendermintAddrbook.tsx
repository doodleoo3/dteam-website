import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

const TendermintAddrbook:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"DOWNLOAD ADDRBOOK"}>
                {`wget -O $HOME/${network.other.working_dir}/config/addrbook.json https://download.dteam.tech/${network.name
                }/${network.type}/addrbook`}
            </ContentItem>

            <DownloadFileBlock fileName={"addrbook.json"}/>
        </div>
    );
};

export default TendermintAddrbook;