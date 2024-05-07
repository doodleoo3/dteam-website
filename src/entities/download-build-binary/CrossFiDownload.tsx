import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";

const CrossFiDownload:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"DOWNLOAD BINARY"}>
            {`cd $HOME
wget https://github.com/crossfichain/crossfi-node/releases/download/v${nodeVersion}-prebuild3/crossfi-node_${nodeVersion}-prebuild3_linux_amd64.tar.gz
tar -xvf crossfi-node_${nodeVersion}-prebuild3_linux_amd64.tar.gz
chmod +x $HOME/bin/${network.other.binary_name}
mv $HOME/bin/${network.other.binary_name} $HOME/go/bin
rm -rf crossfi-node_${nodeVersion}-prebuild3_linux_amd64.tar.gz $HOME/bin

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default CrossFiDownload;