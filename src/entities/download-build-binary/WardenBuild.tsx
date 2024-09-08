import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const WardenBuild:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"BUILD BINARY"}>
            {`cd $HOME
git clone --depth 1 --branch v${nodeVersion} ${network.links.git_network_repo}
cd wardenprotocol/warden/cmd/wardend
go build
mv ${network.other.binary_name} $HOME/go/bin

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default WardenBuild;