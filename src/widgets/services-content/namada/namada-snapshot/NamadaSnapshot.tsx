import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";
const NamadaSnapshot:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Stop service"}>
                {`sudo systemctl stop namadad`}
            </ContentItem>

            <ContentItem title={"Make backup and reset db"}>
                {`cp $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/shielded-expedition.88f17d1d14/priv_validator_state.json.backup
rm -rf $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data $HOME/.local/share/namada/shielded-expedition.88f17d1d14/db`}
            </ContentItem>

            <ContentItem title={"Download snapshot"}>
                {`curl -L https://snapshots.lavenderfive.com/testnet-extra-db/namada/latest_db.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.local/share/namada

curl -L https://snapshots.lavenderfive.com/testnet-snapshots/namada/latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.local/share/namada`}
            </ContentItem>

            <ContentItem title={"Move snapshot and backup"}>
                {`mv "$HOME/.local/share/namada/data/" "$HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/"
mv "$HOME/.local/share/namada/db/" "$HOME/.local/share/namada/shielded-expedition.88f17d1d14/"

cp $HOME/.local/share/namada/shielded-expedition.88f17d1d14/priv_validator_state.json.backup $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json`}
            </ContentItem>

            <ContentItem title={"Restart service and check logs"}>
                {`sudo systemctl restart namadad
sudo journalctl -u namadad -f`}
            </ContentItem>
        </div>
    );
};

export default NamadaSnapshot;