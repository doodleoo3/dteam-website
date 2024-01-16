import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintSeeds:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"Seed node"}>
                <p>ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:11656</p>
            </ContentItem>

            <ContentItem title={""}>
                <p></p>
            </ContentItem>
        </>
    );
};

export default TendermintSeeds;