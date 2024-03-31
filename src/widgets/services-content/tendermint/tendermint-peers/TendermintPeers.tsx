import React, {FC, useEffect, useState} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import axios from "axios";

const TendermintPeers:FC<TendermintContentProps> = ({network}) => {
    const [peers, setPeers] = useState<string | null>(null);
    async function fetchPeers() {
        try {
            const response = await axios.get<ISnapshot>(`https://data.dteam.tech/${network.name}/${network.type}/snapshot`);
            return response.data.peers;
        } catch (e) {
            throw Error("Error while fetching peers")
        }
    }

    useEffect(() => {
        fetchPeers().then(data => {
            if (data !== null) {
                setPeers(data);
            }
        });
    }, []);

    if (network.name === "namada") {
        return (
            <div className={styles.container}>
                <ContentItem title={"Live peers"}>
                    {`${peers
                        ?
                        `PEERS="${network.other.peer},${peers}"`
                        :
                        `PEERS="${network.other.peer}"`
                    }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config.toml`}
                </ContentItem>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"Live peers"}>
                {`${peers
                    ?
                    `PEERS="${network.other.peer},${peers}"`
                    :
                    `PEERS="${network.other.peer}"`
                }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>
        </div>
    );
};

export default TendermintPeers;