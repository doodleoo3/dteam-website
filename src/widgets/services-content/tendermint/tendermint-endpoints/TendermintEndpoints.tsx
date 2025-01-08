import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import dynamic from "next/dynamic";

const NamadaEndpoints = dynamic(() => import("@/src/widgets/services-content/namada/namada-endpoints/NamadaEndpoints"))

const StoryEndpoints = dynamic(() => import("@/src/widgets/services-content/story/story-endpoints/StoryEndpoints"))

const TendermintEndpoints:FC<TendermintContentProps> = ({network}) => {
    const endpoints = network.services.endpoints;

    if (network.name === "namada") {
        return (
            <NamadaEndpoints network={network} />
        );
    }

    if (network.name === "story") {
        return (
            <StoryEndpoints network={network} />
        );
    }

    return (
        <div className={styles.container}>
            {
                endpoints.api &&
                <ContentItem title={"Api"}>
                    {`https://api.${network.name}.${network.type}.dteam.tech`}
                </ContentItem>
            }

            {
                endpoints.rpc &&
                <ContentItem title={"Rpc"}>
                    {`https://rpc.${network.name}.${network.type}.dteam.tech`}
                </ContentItem>
            }

            {
                endpoints.json_rpc &&
                <ContentItem title={"Evm"}>
                    {`https://evm.${network.name}.${network.type}.dteam.tech:443`}
                </ContentItem>
            }

            {
                endpoints.grpc &&
                <ContentItem title={"GRpc"}>
                    {`grpc.${network.name}.${network.type}.dteam.tech:${network.other.grpc_port}`}
                </ContentItem>
            }
        </div>
    );
};

export default TendermintEndpoints;