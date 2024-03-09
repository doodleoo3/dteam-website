'use client'

import React, {FC, useEffect, useState} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import axios from "axios";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
const TendermintSnapshot:FC<TendermintContentProps> = ({network}) => {
    const [snapshotData, setSnapshotData] = useState<ISnapshot | null>(null);

    const currentTime = Date.now();
    async function fetchSnapshotData() {
        try {
            const response = await axios.get<ISnapshot>(`https://data.dteam.tech/${network.name}/${network.type}/snapshot`);
            return response.data;
        } catch (e) {
            throw Error()
        }
    }

    useEffect(() => {
        fetchSnapshotData().then(data => {
            if (data !== null) {
                setSnapshotData(data);
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            {/*<ContentItem title={"SNAPSHOT INFO"}>*/}
            {/*    {snapshotData !== null*/}
            {/*        ?*/}
            {/*        <>*/}
            {/*            <div>*/}
            {/*                <h3>NAME: </h3>*/}
            {/*                <span>{`${snapshotData.latest.name}`}</span>*/}
            {/*            </div>*/}

            {/*            <div>*/}
            {/*                <h3>HEIGHT: </h3>*/}
            {/*                <span>{snapshotData.latest.height}</span>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>SIZE: </h3>*/}
            {/*                <span>{`${(snapshotData.latest.size / 1000000).toFixed(0)}MB`}</span>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>TIME: </h3>*/}
            {/*                <span>{`${Math.floor((currentTime - snapshotData.latest.time * 1000) / (1000 * 60 * 60))} hours ago`}</span>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>URL: </h3>*/}
            {/*                <span>{`https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot`}</span>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <>*/}
            {/*            <div>*/}
            {/*                <h3>NAME: </h3>*/}
            {/*                <LoadingBlock height={12} width={100}></LoadingBlock>*/}
            {/*            </div>*/}

            {/*            <div>*/}
            {/*                <h3>HEIGHT: </h3>*/}
            {/*                <LoadingBlock height={12} width={100}></LoadingBlock>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>SIZE: </h3>*/}
            {/*                <LoadingBlock height={12} width={100}></LoadingBlock>*/}

            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>TIME: </h3>*/}
            {/*                <LoadingBlock height={12} width={100}></LoadingBlock>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <h3>URL: </h3>*/}
            {/*                <span>{`https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot`}</span>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*</ContentItem>*/}

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
                {`systemctl restart ${network.other.binary_name}
journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintSnapshot;