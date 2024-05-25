import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const CelestiaBuild:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"BUILD BINARY"}>
            {`cd $HOME
rm -rf ${network.other.main_dir}
git clone ${network.links.git}
cd ${network.other.main_dir}
git checkout tags/v${nodeVersion} -b v${nodeVersion}
make install

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default CelestiaBuild;