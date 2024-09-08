'use client'

import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import SnapshotInfo from "@/src/features/snaphot-info/SnapshotInfo";
const StorySnapshot:FC<TendermintContentProps> = ({network}) => {

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

                <ContentItem title={"STOP GETH NODE AND RESET DATA"}>
                    {`sudo systemctl stop ${network.other.binary_name}-geth
rm -rf $HOME/.story/geth/iliad/geth/chaindata`}
                </ContentItem>

                <ContentItem title={"STOP CONSENSUS NODE AND RESET DATA"}>
                    {`sudo systemctl stop ${network.other.binary_name}
cp $HOME/${network.other.working_dir}/data/priv_validator_state.json $HOME/${network.other.working_dir}/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data`}
                </ContentItem>


                <ContentItem title={"DOWNLOAD GETH SNAPSHOT"}>
                    {`curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-geth-snapshot  | lz4 -c -d - | tar -x -C $HOME/.story/geth/iliad/geth`}
                </ContentItem>

                <ContentItem title={"DOWNLOAD CONSENSUS SNAPSHOT"}>
                    {`curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot  | lz4 -c -d - | tar -x -C $HOME/${network.other.working_dir}
mv $HOME/${network.other.working_dir}/priv_validator_state.json.backup $HOME/${network.other.working_dir}/data/priv_validator_state.json`}
                </ContentItem>

                <ContentItem title={"RESTART GETH NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}-geth
sudo journalctl -u ${network.other.binary_name}-geth -f -o cat`}
                </ContentItem>

                <ContentItem title={"RESTART CONSENSUS NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        </div>

    );
};

export default StorySnapshot;