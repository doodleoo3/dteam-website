import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const NamadaPeers:FC<TendermintContentProps> = ({network, chainId}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Live peers"}>
                {`sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://${network.other.peer},tcp://ba3e08d76ce95549927a2a3f4cf379f4969a945c@165.227.42.204:26656"#' $HOME/${network.other.working_dir}/${chainId}/config.toml`}
            </ContentItem>
            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default NamadaPeers;