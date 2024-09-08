import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";

const ZeroGravityBuild:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"BUILD BINARY"}>
            {`cd $HOME
git clone -b v${nodeVersion} ${network.links.git_network_repo}
./0g-chain/networks/testnet/install.sh
source .profile

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default ZeroGravityBuild;