import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

const TendermintGenesis:FC<TendermintContentProps> = ({network}) => {
    if (network.name === "namada") {
        return (
            <div className={styles.container}>
                <ContentItem title={"DOWNLOAD GENESIS"}>
                    {`wget -O $HOME/${network.other.working_dir}/cometbft/config/genesis.json https://download.dteam.tech/${network.name
                    }/${network.type}/genesis`}
                </ContentItem>

                <DownloadFileBlock fileName={"genesis.json"}/>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"DOWNLOAD GENESIS"}>
                {`wget -O $HOME/${network.other.working_dir}/config/genesis.json https://download.dteam.tech/${network.name
                }/${network.type}/genesis`}
            </ContentItem>

            <DownloadFileBlock fileName={"genesis.json"}/>
        </div>
    );
};

export default TendermintGenesis;