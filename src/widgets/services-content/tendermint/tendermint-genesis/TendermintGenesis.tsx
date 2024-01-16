import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";

const TendermintGenesis:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"DOWNLOAD GENESIS"}>
                <p>{`wget -O $HOME/.${network.other.working_dir}/config/genesis.json https://download.dteam.tech/${network.name
                }/${network.type}/genesis`}</p>
            </ContentItem>

            <DownloadFileBlock fileName={"genesis.json"}/>
        </>
    );
};

export default TendermintGenesis;