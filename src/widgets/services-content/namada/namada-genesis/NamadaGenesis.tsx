import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const NamadaGenesis:FC<TendermintContentProps> = ({network, chainId}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"DOWNLOAD GENESIS"}>
                {`wget -O $HOME/${network.other.working_dir}/${chainId}/cometbft/config/genesis.json https://download.dteam.tech/${network.name
                }/${network.type}/genesis`}
            </ContentItem>

            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default NamadaGenesis;