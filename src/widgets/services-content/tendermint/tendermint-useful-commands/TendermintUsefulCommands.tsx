import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintUsefulCommands:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Service operations"}>
                {`#check logs
sudo journalctl -u ${network.other.binary_name} -f

#sync info
${network.other.binary_name} status 2>&1 | jq .SyncInfo

#start service
sudo systemctl start ${network.other.binary_name}

#stop service
sudo systemctl stop ${network.other.binary_name}

#restart service
sudo systemctl restart ${network.other.binary_name}`}
            </ContentItem>

            <ContentItem title={"Key management"}>
                {`#add new wallet
${network.other.binary_name} keys add wallet

#restore executing wallet
${network.other.binary_name} keys add wallet --recover

#delete wallet
${network.other.binary_name} keys delete wallet

#list all wallets
${network.other.binary_name} keys list

#check balance
${network.other.binary_name} q bank balances $(${network.other.binary_name} keys show wallet -a)`}
            </ContentItem>
        </div>
    );
};

export default TendermintUsefulCommands;