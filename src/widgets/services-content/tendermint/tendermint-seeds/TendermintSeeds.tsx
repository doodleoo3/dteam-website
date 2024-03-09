import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import DownloadFileBlock from "@/src/shared/ui/download-file-block/DownloadFileBlock";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

const TendermintSeeds:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Seed node"}>
                {`SEED="${network.other.seed}@seed.${network.name}.${network.type}.dteam.tech:${network.other.p2p_port}"
sed -i.bak -e "s/^seed *=.*/seed = \\"$SEED\\"/" ~/.c4e-chain/config/config.toml`}
            </ContentItem>
        </div>
    );
};

export default TendermintSeeds;