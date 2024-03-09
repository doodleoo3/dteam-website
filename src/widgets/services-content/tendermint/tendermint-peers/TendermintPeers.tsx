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
            throw Error()
        }
    }

    useEffect(() => {
        fetchPeers().then(data => {
            if (data !== null) {
                setPeers(data);
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            <ContentItem title={"Live peers"}>
                {`${peers
                    ?
                    `PEERS="${network.other.peer}@peer.${network.name}.${network.type}.dteam.tech:${network.other.p2p_port},${peers}"`
                    :
                    `PEERS="${network.other.peer}@peer.${network.name}.${network.type}.dteam.tech:${network.other.p2p_port}"`
                }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>
        </div>
    );
};

export default TendermintPeers;