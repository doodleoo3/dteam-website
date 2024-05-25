import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

const TendermintAddrbook:FC<TendermintContentProps> = ({network}) => {
    if (network.name === "namada") {
        return (
            <div className={styles.container}>
                <ContentItem title={"DOWNLOAD ADDRBOOK"}>
                    {`wget -O $HOME/${network.other.working_dir}/cometbft/config/addrbook.json https://download.dteam.tech/${network.name
                    }/${network.type}/addrbook`}
                </ContentItem>
                {/*<DownloadFileBlock fileName={"addrbook.json"}/>*/}

                <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"DOWNLOAD ADDRBOOK"}>
                {`wget -O $HOME/${network.other.working_dir}/config/addrbook.json https://download.dteam.tech/${network.name
                }/${network.type}/addrbook`}
            </ContentItem>

            {/*<DownloadFileBlock fileName={"addrbook.json"}/>*/}

            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintAddrbook;