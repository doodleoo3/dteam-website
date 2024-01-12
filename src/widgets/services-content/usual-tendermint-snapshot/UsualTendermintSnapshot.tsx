import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
const UsualTendermintSnapshot:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"SNAPSHOT INFO"}>
                <p>Name:</p>
                <p>Height:</p>
                <p>Size:</p>
                <p>Time:</p>
                <p>Url:</p>
            </ContentItem>
            <ContentItem title={"INSTALL DEPENDENCIES"}>
                <p>sudo apt update</p>
                <p>sudo apt-get install snapd lz4 -y</p>
            </ContentItem>
            <ContentItem title={"DISABLE STATE SYNC"}>
                <p>{`sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1false|" ~/.${network.other.working_dir}/config/config.toml`}</p>
            </ContentItem>
            <ContentItem title={"STOP NODE AND RESET DATA"}>
                <p>{`sudo systemctl stop ${network.other.binary_name}`}</p>
                <p>{`cp $HOME/.${network.other.working_dir}/data/priv_validator_state.json $HOME/.${network.other.working_dir}/priv_validator_state.json.backup`}</p>
                <p>{`rm -rf $HOME/.${network.other.working_dir}/data`}</p>
                <p>{`${network.other.binary_name} tendermint unsafe-reset-all --home ~/.${network.other.working_dir}/ --keep-addr-book`}</p>
            </ContentItem>
            <ContentItem title={"DOWNLOAD SNAPSHOT"}>
                <p>{`curl -o - -L https://download.${network.type}.${network.name}.dteam.tech/snapshot  | lz4 -c -d - | tar -x -C $HOME/.${network.other.working_dir}`}</p>
                <p>{`mv $HOME/.${network.other.working_dir}/priv_validator_state.json.backup $HOME/.${network.other.working_dir}/data/priv_validator_state.json`}</p>
            </ContentItem>
            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                <p>{`systemctl restart ${network.other.binary_name} && journalctl -u ${network.other.binary_name} -f -o cat`}</p>
            </ContentItem>
        </>
    );
};

export default UsualTendermintSnapshot;