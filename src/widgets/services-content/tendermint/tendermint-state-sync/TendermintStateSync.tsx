import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintStateSync:FC<TendermintContentProps> = ({network}) => {
    return (
        <>
            <ContentItem title={"STOP NODE AND RESET DATA"}>
                <p>{`sudo systemctl stop ${network.other.binary_name}`}</p>
                <p>{`cp $HOME/.${network.other.working_dir}/data/priv_validator_state.json $HOME/.${network.other.working_dir}/priv_validator_state.json.backup`}</p>
                <p>{`rm -rf $HOME/.${network.other.working_dir}/data`}</p>
                <p>{`${network.other.binary_name} tendermint unsafe-reset-all --home ~/.${network.other.working_dir}/ --keep-addr-book`}</p>
            </ContentItem>

            <ContentItem title={"CONFIGURE STATE SYNC"}>
                <p>PEERS=</p>
                <p>{`SNAP_RPC="https://quicksilver-testnet-rpc.itrocket.net:443"`}</p>
                <br/>
                <p>{`sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.quicksilverd/config/config.toml`}</p>
                <br/>
                <p>{`LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height)`}</p>
                <p>{`BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000))`}</p>
                <p>{`TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)`}</p>
                <p>{`echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH`}</p>
                <br/>
                <p>{`sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1true| ;`}</p>
                <p>{`s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\\1\\"$SNAP_RPC,$SNAP_RPC\\"| ;`}</p>
                <p>{`s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\\1$BLOCK_HEIGHT| ;`}</p>
                <p>{`s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\\1\\"$TRUST_HASH\\"| ;`}</p>
                <p>{`s|^(seeds[[:space:]]+=[[:space:]]+).*$|\\1\\"\\"|" $HOME/.quicksilverd/config/config.toml`}</p>
                <br/>
                <p>{`mv $HOME/.quicksilverd/priv_validator_state.json.backup $HOME/.quicksilverd/data/priv_validator_state.json`}</p>
            </ContentItem>

            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                <p>{`systemctl restart ${network.other.binary_name} && journalctl -u ${network.other.binary_name} -f -o cat`}</p>
            </ContentItem>
        </>
    );
};

export default TendermintStateSync;