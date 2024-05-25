import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

const TendermintStateSync:FC<TendermintContentProps> = ({network, peers}) => {

    return (
        <div className={styles.container}>
            <ContentItem title={"STOP NODE AND RESET DATA"}>
                {`sudo systemctl stop ${network.other.binary_name}
cp $HOME/${network.other.working_dir}/data/priv_validator_state.json $HOME/${network.other.working_dir}/priv_validator_state.json.backup
rm -rf $HOME/${network.other.working_dir}/data
${network.other.binary_name} tendermint unsafe-reset-all --home $HOME/${network.other.working_dir}/ --keep-addr-book`}
            </ContentItem>

            <ContentItem title={"CONFIGURE STATE SYNC"}>
                {`${peers
                    ?
                    `PEERS="${network.other.peer},${peers}"`
                    :
                    `PEERS="${network.other.peer}"`
                }
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config/config.toml

SNAP_RPC="https://rpc.${network.name}.${network.type}.dteam.tech:443"
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height)
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000))
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1true| ;
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\\1\\"$SNAP_RPC,$SNAP_RPC\\"| ;
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\\1$BLOCK_HEIGHT| ;
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\\1\\"$TRUST_HASH\\"| ;
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\\1\\"\\"|" $HOME/${network.other.working_dir}/config/config.toml

mv $HOME/${network.other.working_dir}/priv_validator_state.json.backup $HOME/${network.other.working_dir}/data/priv_validator_state.json`}
            </ContentItem>

            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintStateSync;