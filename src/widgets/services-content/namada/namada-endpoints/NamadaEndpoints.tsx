import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const NamadaEndpoints:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            {
                network.services.endpoints.rpc &&
                <ContentItem title={"RPC"}>
                    {`https://rpc.${network.name}.${network.type}.dteam.tech:443`}
                </ContentItem>
            }

            {
                network.services.endpoints.api &&
                <ContentItem title={"Indexer"}>
                    {`https://indexer.${network.name}.${network.type}.dteam.tech:443`}
                </ContentItem>
            }

            {
                network.services.endpoints.api &&
                <ContentItem title={"MASP Indexer"}>
                    {`https://masp.${network.name}.${network.type}.dteam.tech:443`}
                </ContentItem>
            }
        </div>
    );
};

export default NamadaEndpoints;