import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const DefaultBuild:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    return (
        <ContentItem title={"BUILD BINARY"}>
            {`cd $HOME
git clone ${network.links.git_network_repo}
cd ${network.other.main_dir}
${nodeVersion
    ? `git checkout v${nodeVersion}`
    : `git checkout ${<LoadingBlock width={100} />}`
}
make install

${network.other.binary_name} version --long | grep -e version -e commit`}
        </ContentItem>
    );
};

export default DefaultBuild;