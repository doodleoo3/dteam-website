'use client'

import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import SnapshotInfo from "@/src/features/snaphot-info/SnapshotInfo";
import dynamic from "next/dynamic";
// import NamadaSnapshot from "@/src/widgets/services-content/namada/namada-snapshot/NamadaSnapshot";
// import StorySnapshot from "@/src/widgets/services-content/story/story-snapshot/StorySnapshot";

const NamadaSnapshot = dynamic(() => import("@/src/widgets/services-content/namada/namada-snapshot/NamadaSnapshot"))
const StorySnapshot = dynamic(() => import("@/src/widgets/services-content/story/story-snapshot/StorySnapshot"))

const TendermintSnapshot:FC<TendermintContentProps> = ({network}) => {

    if (network.name === "namada") {
        return (
            <NamadaSnapshot network={network}/>
        );
    }

    if (network.name === "story") {
        return (
          <StorySnapshot network={network}/>
        );
    }

    return (
        <div className={styles.snapshot__page__wrapper}>
            <SnapshotInfo network={network}/>

            <div className={styles.container}>
                <ContentItem title={"INSTALL DEPENDENCIES"}>
                    {`sudo apt update
sudo apt-get install snapd lz4 -y`}
                </ContentItem>
                <ContentItem title={"DISABLE STATE SYNC"}>
                    {`sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1false|" $HOME/${network.other.working_dir}/config/config.toml`}
                </ContentItem>
                <ContentItem title={"STOP NODE AND RESET DATA"}>
                    {`sudo systemctl stop ${network.other.binary_name}
cp $HOME/${network.other.working_dir}/data/priv_validator_state.json $HOME/${network.other.working_dir}/priv_validator_state.json.backup
rm -rf $HOME/${network.other.working_dir}/data
${network.other.binary_name} tendermint unsafe-reset-all --home $HOME/${network.other.working_dir}/ --keep-addr-book`}
                </ContentItem>
                <ContentItem title={"DOWNLOAD SNAPSHOT"}>
                    {`curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot  | lz4 -c -d - | tar -x -C $HOME/${network.other.working_dir}
mv $HOME/${network.other.working_dir}/priv_validator_state.json.backup $HOME/${network.other.working_dir}/data/priv_validator_state.json`}
                </ContentItem>
                <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        </div>

    );
};

export default TendermintSnapshot;