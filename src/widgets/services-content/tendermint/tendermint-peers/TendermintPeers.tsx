import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintPeers:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"Live peers"}>
                <p>ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:11656</p>
                <p>{`sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.${network.other.working_dir}/config/config.toml`}</p>
            </ContentItem>

            <ContentItem title={"State sync peer"}>
                <p>6de4ce5baa9d2bed33c0c53b9518b907cfaab33b@65.108.128.201:11656</p>
            </ContentItem>

            <ContentItem title={""}>
                <p></p>
            </ContentItem>
        </>
    );
};

export default TendermintPeers;