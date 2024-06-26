import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import {useTendermintNetworkParams} from "@/src/app/utils/useTendermintNetworkParams";

const TendermintPeers:FC<TendermintContentProps> = ({network}) => {
    const networkParams = useTendermintNetworkParams(network.name, network.type);

    if (network.name === "namada") {
        return (
            <div className={styles.container}>
                <ContentItem title={"Live peers"}>
                    {`${networkParams?.peers
                        ?
                        `PEERS="${network.other.peer},${networkParams?.peers}"`
                        :
                        `PEERS="${network.other.peer}"`
                    }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config.toml`}
                </ContentItem>
                <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"Live peers"}>
                {`${networkParams?.peers
                    ?
                    `PEERS="${network.other.peer},${networkParams?.peers}"`
                    :
                    `PEERS="${network.other.peer}"`
                }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>
            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintPeers;