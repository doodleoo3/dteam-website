import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
const NamadaUsefulCommands:FC<TendermintContentProps> = ({network, chainId}) => {
    return (
        <div className={styles.container}>
            <ContentItem title={"Service operations"}>
                {`#check logs
sudo journalctl -u ${network.other.binary_name} -f

#start service
sudo systemctl start ${network.other.binary_name}

#stop service
sudo systemctl stop ${network.other.binary_name}

#restart service
sudo systemctl restart ${network.other.binary_name}

#service status
sudo systemctl status ${network.other.binary_name}

#enable service
sudo systemctl enable ${network.other.binary_name}

#disable service
sudo systemctl disable ${network.other.binary_name}

#reload all service files
sudo systemctl daemon-reload

#get node info
curl http://127.0.0.1:\${PORT_NAMADA}657/status | jq -r

#get node id
cometbft show-node-id --home $HOME/${network.other.working_dir}/${chainId}/cometbft`}
            </ContentItem>

            <ContentItem title={"Key management"}>
                {`#add new wallet
namadaw gen --alias <wallet-name>

#restore existing wallet
namada wallet derive --alias <wallet-name> --hd-path default

#delete wallet
namadaw remove --alias <wallet-name> --do-it

#list all wallets
namadaw list

#check balance
namadac balance --owner <wallet-address>`}
            </ContentItem>


            <ContentItem title={"Tokens operations"}>
                {`#claim rewards
namadac claim-rewards --source <wallet-name> --validator <validator-valoper-address> --node https://rpc.namada.${network.type}.dteam.tech:443

#delegate
namadac bond --source <wallet-name> --validator <validator-valoper-address> --amount 1 --node https://rpc.namada.${network.type}.dteam.tech:443

#redelegate
namadac redelegate --owner <wallet-name> --source-validator <from-validator-valoper-address> --destination-validator <to-validator-valoper-address> --amount 1 --node https://rpc.namada.${network.type}.dteam.tech:443

#unbond
namadac unbond --source <wallet-name> --validator <validator-valoper-address> --amount 1 --node https://rpc.namada.${network.type}.dteam.tech:443

#withdraw unbonded tokens
namadac withdraw --source <wallet-name> --validator <validator-valoper-address> --node https://rpc.namada.${network.type}.dteam.tech:443

#transfer
namadac transfer --source <wallet-name> --target <dst-wallet-address> --token NAAN --amount 1 --signing-keys <wallet-name> --node https://rpc.namada.${network.type}.dteam.tech:443`}
            </ContentItem>

            <ContentItem title={"Governance operations"}>
                {`#vote "yes"
namadac vote-proposal --proposal-id <proposal-id> --vote yay --address <address-of-the-voter> --signing-keys <wallet-name> --node https://rpc.namada.${network.type}.dteam.tech:443

#vote "no"
namadac vote-proposal --proposal-id <proposal-id> --vote nay --address <address-of-the-voter> --signing-keys <wallet-name> --node https://rpc.namada.${network.type}.dteam.tech:443

#vote "abstain"
namadac vote-proposal --proposal-id <proposal-id> --vote abstain --address <address-of-the-voter> --signing-keys <wallet-name> --node https://rpc.namada.${network.type}.dteam.tech:443
                
#view all proposals
namadac query-proposal --node https://rpc.namada.${network.type}.dteam.tech:443

#view proposal by ID
namadac query-proposal --proposal-id <proposal-id> --node https://rpc.namada.${network.type}.dteam.tech:443`}
            </ContentItem>

            <ContentItem title={"Validator operations"}>
                {`#create validator
namadac init-validator \\
--commission-rate 0.05 \\
--max-commission-rate-change 0.02 \\
--name "your moniker" \\
--description "" \\
--email "" \\
--avatar "" \\
--website "" \\ 
--discord-handle "" \\
--signing-keys <wallet-name> \\
--chain-id "${chainId}" \\
--node https://rpc.namada.${network.type}.dteam.tech:443

#edit validator
namadac change-metadata \\
--commission-rate 0.05 \\
--name "your new moniker" \\
--description "" \\
--email "" \\
--avatar "" \\
--website "" \\ 
--discord-handle "" \\
--validator <your-validator-address> \\
--signing-keys <wallet-name> \\
--chain-id "${chainId}" \\
--node https://rpc.namada.${network.type}.dteam.tech:443

#unjail validator
namadac unjail-validator --validator <your-validator-address> --node https://rpc.namada.${network.type}.dteam.tech:443

#deactivate validator
namadac deactivate-validator --validator <your-validator-address> --node https://rpc.namada.${network.type}.dteam.tech:443

#reactivate validator
namadac reactivate-validator --validator <your-validator-address> --node https://rpc.namada.${network.type}.dteam.tech:443

#validator state info
namadac validator-state --validator <validator-address> --node https://rpc.namada.${network.type}.dteam.tech:443`}
            </ContentItem>
        </div>
    );
};

export default NamadaUsefulCommands;