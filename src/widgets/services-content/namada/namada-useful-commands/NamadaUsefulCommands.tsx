import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
const NamadaUsefulCommands:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Service operations"}>
                {`#check logs
sudo journalctl -u namadad -f

#start service
sudo systemctl start namadad

#stop service
namadad

#restart service
sudo systemctl restart namadad`}
            </ContentItem>

            <ContentItem title={"Key management"}>
                {`#add new wallet
namadaw gen --alias wallet

#restore existing wallet
namada wallet derive --alias wallet --hd-path default

#delete wallet
namadaw remove --alias wallet --do-it

#list all wallets
namadaw list

#check balance
namadac balance --owner wallet`}
            </ContentItem>
        </div>
    );
};

export default NamadaUsefulCommands;