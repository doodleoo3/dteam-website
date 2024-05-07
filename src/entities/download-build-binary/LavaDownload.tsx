import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const LavaDownload:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"DOWNLOAD BINARY"}>
            {`cd $HOME
wget -O ${network.other.binary_name} ${network.links.binary_download}/v${nodeVersion}/${network.other.binary_name}-${nodeVersion}-linux-amd64
chmod +x $HOME/${network.other.binary_name}
mv $HOME/${network.other.binary_name} $HOME/go/bin/${network.other.binary_name}

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default LavaDownload;