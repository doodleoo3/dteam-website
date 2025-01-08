import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const StoryEndpoints:FC<TendermintContentProps> = ({network}) => {
    const endpoints = network.services.endpoints;

    return (
        <div className={styles.container}>
            <ContentItem title={"First server / Archive"}>
                {`# Cosmos RPC
https://rpc.story.testnet.dteam.tech

# Cosmos WSS RPC
wss://rpc.story.testnet.dteam.tech/websocket

# Cosmos REST
https://api.story.testnet.dteam.tech

# EVM RPC
https://evm-rpc.story.testnet.dteam.tech

# EVM WSS RPC
wss://evm-rpc.wss.story.testnet.dteam.tech`}
            </ContentItem>

            <ContentItem title={"Second server / Archive"}>
                {`# Cosmos RPC
https://rpc-2.story.testnet.dteam.tech

# Cosmos WSS RPC
wss://rpc-2.story.testnet.dteam.tech/websocket

# Cosmos REST
https://api-2.story.testnet.dteam.tech

# EVM RPC
https://evm-rpc-2.story.testnet.dteam.tech

# EVM WSS RPC
wss://evm-rpc-2.wss.story.testnet.dteam.tech`}
            </ContentItem>

            <ContentItem title={"Third server / Archive"}>
                {`# Cosmos RPC
https://rpc-3.story.testnet.dteam.tech

# Cosmos WSS RPC
wss://rpc-3.story.testnet.dteam.tech/websocket

# Cosmos REST
https://api-3.story.testnet.dteam.tech

# EVM RPC
https://evm-rpc-3.story.testnet.dteam.tech

# EVM WSS RPC
wss://evm-rpc-3.wss.story.testnet.dteam.tech`}
            </ContentItem>
        </div>
    );
};

export default StoryEndpoints;