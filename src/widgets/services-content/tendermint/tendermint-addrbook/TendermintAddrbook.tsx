import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";

const TendermintAddrbook:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"DOWNLOAD ADDRBOOK"}>
                <p>{`wget -O $HOME/.${network.other.working_dir}/config/addrbook.json https://download.dteam.tech/${network.name
                }/${network.type}/addrbook`}</p>
            </ContentItem>

            <DownloadFileBlock fileName={"addrbook.json"}/>
        </>

    );
};

export default TendermintAddrbook;