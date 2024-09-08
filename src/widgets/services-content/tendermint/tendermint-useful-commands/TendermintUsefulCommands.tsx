import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import dynamic from "next/dynamic";

// import NamadaUsefulCommands from "@/src/widgets/services-content/namada/namada-useful-commands/NamadaUsefulCommands";

const NamadaUsefulCommands = dynamic(() => import("@/src/widgets/services-content/namada/namada-useful-commands/NamadaUsefulCommands"))

const TendermintUsefulCommands:FC<TendermintContentProps> = ({network, chainId}) => {
    if (network.name === "namada") {
        return (
            <NamadaUsefulCommands network={network} />
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"Service operations"}>
                {`#check logs
sudo journalctl -u ${network.other.binary_name} -f
${
''               
// #sync info
// ${network.other.binary_name} status 2>&1 | jq .SyncInfo          
}
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
${network.other.binary_name} status 2>&1 | jq -r

#get node id
${network.other.binary_name} tendermint show-node-id`}
            </ContentItem>

            <ContentItem title={"Key management"}>
                {`#add new wallet
${network.other.binary_name} keys add <wallet-name>

#restore existing wallet
${network.other.binary_name} keys add <wallet-name> --recover

#delete wallet
${network.other.binary_name} keys delete <wallet-name>

#list all wallets
${network.other.binary_name} keys list

#check balance
${network.other.binary_name} q bank balances <wallet-address>`}
            </ContentItem>


            <ContentItem title={"Tokens operations"}>
                {`#withdraw all rewards
${network.other.binary_name} tx distribution withdraw-all-rewards --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#withdraw rewards from specific validator
${network.other.binary_name} tx distribution withdraw-rewards <validator-valoper-address> --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#withdraw rewards and commission from your validator
${network.other.binary_name} tx distribution withdraw-rewards <your-validator-valoper-address> --commission --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#delegate
${network.other.binary_name} tx staking delegate <validator-valoper-address> ${10**network.other.denom_exponent}${network.other.denom} --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#redelegate
${network.other.binary_name} tx staking redelegate <from-validator-valoper-address> <to-validator-valoper-address> ${10**network.other.denom_exponent}${network.other.denom} --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#unbond
${network.other.binary_name} tx staking unbond <validator-valoper-address> ${10**network.other.denom_exponent}${network.other.denom} --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#transfer
${network.other.binary_name} tx bank send <wallet-name> <wallet-address> ${10**network.other.denom_exponent}${network.other.denom} --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y`}
            </ContentItem>

            <ContentItem title={"Governance operations"}>
                {`#vote "yes"
${network.other.binary_name} tx gov vote <proposal-id> yes --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#vote "no"
${network.other.binary_name} tx gov vote <proposal-id> no --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#vote "no with veto"
${network.other.binary_name} tx gov vote <proposal-id> no_with_veto --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#vote "abstain"
${network.other.binary_name} tx gov vote <proposal-id> abstain --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y
                
#view all proposals
${network.other.binary_name} query gov proposals

#view proposal by ID
${network.other.binary_name} query gov proposal <proposal-id>`}
            </ContentItem>

            <ContentItem title={"Validator operations"}>
                {`#create validator
${network.other.binary_name} tx staking create-validator \\
--amount 1000000utia \\
--moniker "" \\
--identity "" \\
--details "" \\
--website "" \\
--security-contact "" \\
--pubkey $(${network.other.binary_name} tendermint show-validator) \\
--commission-rate 0.05 \\
--commission-max-rate 0.2 \\
--commission-max-change-rate 0.01 \\
--min-self-delegation 1 \\
--chain-id ${chainId} \\
--from <wallet-name> \\
--gas auto \\
--gas-adjustment ${network.tx.gas_adjustment} \\
--gas-prices ${network.tx.gas_prices}${network.other.denom} \\
--node "https://rpc.${network.name}.${network.type}.dteam.tech:443" \\
-y

#edit validator
${network.other.binary_name} tx staking edit-validator \\
--new-moniker "" \\
--identity "" \\
--details "" \\
--website "" \\
--security-contact "" \\
--commission-rate 0.05 \\
--chain-id ${chainId} \\
--from <wallet-name> \\
--gas auto \\
--gas-adjustment ${network.tx.gas_adjustment} \\
--gas-prices ${network.tx.gas_prices}${network.other.denom} \\
--node "https://rpc.${network.name}.${network.type}.dteam.tech:443" \\
-y

#unjail validator
${network.other.binary_name} tx slashing unjail --from <wallet-name> --chain-id ${chainId} --gas ${network.tx.gas} --gas-adjustment ${network.tx.gas_adjustment} --gas-prices ${network.tx.gas_prices}${network.other.denom} --node "https://rpc.${network.name}.${network.type}.dteam.tech:443" -y

#validator details
${network.other.binary_name} q staking validator $(${network.other.binary_name} keys show <wallet-name> --bech val -a)

#validator signing info
${network.other.binary_name} q slashing signing-info $(${network.other.binary_name} tendermint show-validator)`}
            </ContentItem>
        </div>
    );
};

export default TendermintUsefulCommands;