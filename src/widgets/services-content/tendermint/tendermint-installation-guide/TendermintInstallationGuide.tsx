import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import NamadaInstallationGuide
        from "@/src/widgets/services-content/namada/namada-installation-guide/NamadaInstallationGuide";
import WardenBuild from "@/src/entities/download-build-binary/WardenBuild";
import DefaultBuild from "@/src/entities/download-build-binary/DefaultBuild";
import SelfchainDownload from "@/src/entities/download-build-binary/SelfchainDownload";
import LavaDownload from "@/src/entities/download-build-binary/LavaDownload";
import CrossFiDownload from "@/src/entities/download-build-binary/CrossFiDownload";
import ZeroGravityBuild from "@/src/entities/download-build-binary/ZeroGravityBuild";
import CelestiaBuild from "@/src/entities/download-build-binary/CelestiaBuild";

const TendermintInstallationGuide:FC<TendermintContentProps> = ({network, nodeVersion, chainId, peers}) => {

        if (network.name === "namada") {
            return (
                <NamadaInstallationGuide network={network} chainId={chainId} />
            );
        }

    return (
        <div className={styles.container}>
            <ContentItem title={"INSTALL DEPENDENCIES"}>
                {`sudo apt update
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev lz4 -y`}
            </ContentItem>

            <ContentItem title={"INSTALL GO"}>
                {`cd $HOME && \\
ver="1.21.3" && \\
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \\
sudo rm -rf /usr/local/go && \\
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \\
rm "go$ver.linux-amd64.tar.gz" && \\
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile && \\
source $HOME/.bash_profile && \\
go version`}
            </ContentItem>

            <ContentItem title={"SET VARIABLES"}>
                {`echo "export WALLET="wallet"" >> $HOME/.bash_profile
echo "export MONIKER="DTEAM_GUIDE"" >> $HOME/.bash_profile
echo "export PORT_${network.name.toUpperCase()}="26"" >> $HOME/.bash_profile
source $HOME/.bash_profile`}
            </ContentItem>

            {network.need_build_binary
                ?
                <>
                {network.name === "warden" || network.name === "0g" || network.name === "celestia"
                    ?
                    <>
                            {network.name === "warden" && <WardenBuild network={network} nodeVersion={nodeVersion}/>}
                            {network.name === "0g" && <ZeroGravityBuild network={network} nodeVersion={nodeVersion}/>}
                            {network.name === "celestia" && <CelestiaBuild network={network} nodeVersion={nodeVersion}/>}
                    </>
                    : <DefaultBuild network={network} nodeVersion={nodeVersion}/>
                }
                </>
                :
                <>
                {network.name === "selfchain" && <SelfchainDownload network={network}/>}
                {network.name === "lava" && <LavaDownload network={network} nodeVersion={nodeVersion}/>}
                {network.name === "crossfi" && <CrossFiDownload network={network} nodeVersion={nodeVersion}/>}
                </>
            }

            {network.name === "initia" || network.name === "kopi"
                ?
                <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                        {`${network.other.binary_name} config set client keyring-backend os
${network.other.binary_name} config set client node tcp://localhost:\${PORT_${network.name.toUpperCase()}}657
${chainId
                            ? `${network.other.binary_name} config set client chain-id ${chainId}`
                            : `${network.other.binary_name} config set client chain-id ${<LoadingBlock width={100}/>}`
                        }
${chainId
                            ? `${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${chainId}`
                            : `${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${<LoadingBlock width={100} />}`
                        }`}
                </ContentItem>
                :
                <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                        {`${network.other.binary_name} config keyring-backend os
${network.other.binary_name} config node tcp://localhost:\${PORT_${network.name.toUpperCase()}}657
${chainId
                            ? `${network.other.binary_name} config chain-id ${chainId}`
                            : `${network.other.binary_name} config chain-id ${<LoadingBlock width={100}/>}`
                        }
${chainId
                            ? `${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${chainId}`
                            : `${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${<LoadingBlock width={100} />}`
                        }`}
                </ContentItem>
            }


            <ContentItem title={"DOWNLOAD GENESIS AND ADDRBOOK"}>
                {`wget -O $HOME/${network.other.working_dir}/config/genesis.json https://download.dteam.tech/${network.name}/${network.type}/genesis
wget -O $HOME/${network.other.working_dir}/config/addrbook.json https://download.dteam.tech/${network.name}/${network.type}/addrbook`}
            </ContentItem>

            <ContentItem title={"SET SEEDS AND PEERS"}>
                {`SEEDS="${network.other.seed}"
${peers
    ? `PEERS="${network.other.peer},${peers}"`
    : `PEERS="${network.other.peer}"`
}
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/; s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>

{network.name === "babylon"
    ?
    <ContentItem title={"Change network to signet"}>
            {`sed -i -e "s|^\\(network = \\).*|\\1\\"signet\\"|" $HOME/${network.other.working_dir}/config/app.toml`}
    </ContentItem>
    : <></>
}

            <ContentItem title={"SET CUSTOM PORTS / OPTIONAL"}>
                    {`sed -i.bak -e "s%:1317%:\${PORT_${network.name.toUpperCase()}}317%g;
s%:8080%:\${PORT_${network.name.toUpperCase()}}080%g;
s%:9090%:\${PORT_${network.name.toUpperCase()}}090%g;
s%:9091%:\${PORT_${network.name.toUpperCase()}}091%g;
s%:8545%:\${PORT_${network.name.toUpperCase()}}545%g;
s%:8546%:\${PORT_${network.name.toUpperCase()}}546%g;
s%:6065%:\${PORT_${network.name.toUpperCase()}}065%g" $HOME/${network.other.working_dir}/config/app.toml

sed -i.bak -e "s%:26658%:\${PORT_${network.name.toUpperCase()}}658%g;
s%:26657%:\${PORT_${network.name.toUpperCase()}}657%g;
s%:6060%:\${PORT_${network.name.toUpperCase()}}060%g;
s%:26656%:\${PORT_${network.name.toUpperCase()}}656%g;
s%^external_address = \\"\\"%external_address = \\"$(wget -qO- eth0.me):\${PORT_${network.name.toUpperCase()}}656\\"%;
s%:26660%:\${PORT_${network.name.toUpperCase()}}660%g" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>

            {
                network.other.pruning
                    ?
                    <ContentItem title={"CONFIG PRUNING / OPTIONAL"}>
                            {`PRUNING="custom" && \\
PRUNING_KEEP_RECENT="100" && \\
PRUNING_KEEP_EVERY="0" && \\
PRUNING_INTERVAL="50" && \\
sed -i -e "s/^pruning *=.*/pruning = \\"$PRUNING\\"/" $HOME/${network.other.working_dir}/config/app.toml && \\
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"$PRUNING_KEEP_RECENT\\"/" $HOME/${network.other.working_dir}/config/app.toml && \\
sed -i -e "s/^pruning-keep-every *=.*/pruning-keep-every = \\"$PRUNING_KEEP_EVERY\\"/" $HOME/${network.other.working_dir}/config/app.toml && \\
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \\"$PRUNING_INTERVAL\\"/" $HOME/${network.other.working_dir}/config/app.toml`}
                    </ContentItem>
                    :
                    <></>
            }

            <ContentItem title={"SET MINIMUM GAS PRICE / OPTIONAL"}>
                    {`sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "0.0025${network.other.denom}"|g' $HOME/${network.other.working_dir}/config/app.toml`}
            </ContentItem>

            <ContentItem title={"DISABLE INDEXING / OPTIONAL"}>
                    {`INDEXER="null"
sed -i -e "s/^indexer *=.*/indexer = \\"$INDEXER\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>

            <ContentItem title={"DISABLE SNAPSHOTS / OPTIONAL"}>
                    {`SNAPSHOT_INTERVAL=0
sed -i.bak -e "s/^snapshot-interval *=.*/snapshot-interval = \\"$SNAPSHOT_INTERVAL\\"/" ~/${network.other.working_dir}/config/app.toml`}
            </ContentItem>

            <ContentItem title={"CREATE SERVICE FILE"}>
                    {`sudo tee /etc/systemd/system/${network.other.binary_name}.service > /dev/null <<EOF
[Unit]
Description=${network.name} ${network.type} node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/${network.other.working_dir}
ExecStart=$(which ${network.other.binary_name}) start --home $HOME/${network.other.working_dir}
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF`}
            </ContentItem>

            <ContentItem title={"DOWNLOAD SNAPSHOT / OPTIONAL"}>
                    {`${network.other.binary_name} tendermint unsafe-reset-all --home $HOME/${network.other.working_dir}
curl https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot | lz4 -dc - | tar -xf - -C $HOME/${network.other.working_dir}`}
            </ContentItem>

            <ContentItem title={"ENABLE AND START SERVICE"} >
                    {`sudo systemctl daemon-reload
sudo systemctl enable ${network.other.binary_name}                    
sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintInstallationGuide;