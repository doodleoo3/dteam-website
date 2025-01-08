import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";
import SnapshotInfo from "@/src/features/snaphot-info/SnapshotInfo";
import SnapshotTypeSelector from "@/src/features/service-type-selector/snapshot/SnapshotTypeSelector";
const NamadaSnapshot:FC<TendermintContentProps> = ({network, snapshotType, chainId}) => {
    return (
        <div className={styles.container__with__types}>
            <SnapshotInfo network={network} snapshotType={snapshotType}/>
            <SnapshotTypeSelector network={network}/>
            <div className={styles.types__content__container}>
                <ContentItem title={"INSTALL DEPENDENCIES"}>
                    {`sudo apt update
sudo apt-get install snapd lz4 -y`}
                </ContentItem>
                <ContentItem title={"STOP NODE AND RESET DATA"}>
                    {`sudo systemctl stop ${network.other.binary_name}
cp $HOME/${network.other.working_dir}/${chainId}/cometbft/data/priv_validator_state.json $HOME/${network.other.working_dir}/${chainId}/priv_validator_state.json.backup
rm -rf $HOME/${network.other.working_dir}/${chainId}/cometbft/data $HOME/${network.other.working_dir}/${chainId}/{db,wasm}`}
                </ContentItem>
                <ContentItem title={"DOWNLOAD SNAPSHOT"}>
                    {`curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot  | lz4 -c -d - | tar -x -C $HOME/${network.other.working_dir}/${chainId}
mv $HOME/${network.other.working_dir}/${chainId}/priv_validator_state.json.backup $HOME/${network.other.working_dir}/${chainId}/cometbft/data/priv_validator_state.json`}
                </ContentItem>
                <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                    {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        </div>
    );
};

export default NamadaSnapshot;