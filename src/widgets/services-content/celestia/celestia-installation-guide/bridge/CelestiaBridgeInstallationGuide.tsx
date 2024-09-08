import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import InstallationGuideTypeSelector from "@/src/features/service-type-selector/InstallationGuideTypeSelector";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {NetworkType} from "@/src/app/models/INetwork";

const CelestiaBridgeInstallationGuide:FC<TendermintContentProps> = ({network}) => {

    return (
        <div className={styles.container__with__types}>
            <InstallationGuideTypeSelector network={network}/>

            <div className={styles.types__content__container}>
                <ContentItem title={"INSTALL DEPENDENCIES"}>
                    {`sudo apt update
sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev lz4 -y`}
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

                {network.type === NetworkType.mainnet &&
                    <ContentItem title={"Build binaries"}>
                        {`cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node
git checkout tags/v0.15.0
make build
make install
make cel-key

celestia version | grep -e version -e Commit`}
                    </ContentItem>
                }

                {network.type === NetworkType.testnet &&
                    <ContentItem title={"Build binaries"}>
                        {`cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node
git checkout tags/v0.16.0
make build
make install
make cel-key

celestia version | grep -e version -e Commit`}
                    </ContentItem>
                }

                {network.type === NetworkType.mainnet &&
                    <ContentItem title={"Initialize node"}>
                        {`# This command generates an address and a mnemonic for you, saves the mnemonic in a safe place!
# Add funds to the address that will later be used to pay for PayForBlob transactions.

# Example: celestia bridge init --core.ip https://rpc.celestia.${network.type}.dteam.tech:443
celestia bridge init --core.ip <CONSENSUS_NODE_RPC_ENDPOINT>`}
                    </ContentItem>
                }

                {network.type === NetworkType.testnet &&
                    <ContentItem title={"Initialize node"}>
                        {`# This command generates an address and a mnemonic for you, saves the mnemonic in a safe place!
# Add funds to the address that will later be used to pay for PayForBlob transactions.

# Example: celestia bridge init --core.ip https://rpc.celestia.${network.type}.dteam.tech:443 --p2p.network mocha
celestia bridge init --core.ip <CONSENSUS_NODE_RPC_ENDPOINT> --p2p.network mocha`}
                    </ContentItem>
                }

                <ContentItem title={"Set variables for service file"}>
                    {`echo "export CONSENSUS_IP="<CONSENSUS_NODE_IP>"" >> $HOME/.bash_profile
echo "export CONSENSUS_RPC_PORT="<CONSENSUS_NODE_RPC_PORT>"" >> $HOME/.bash_profile
echo "export CONSENSUS_GRPC_PORT="<CONSENSUS_NODE_GRPC_PORT>"" >> $HOME/.bash_profile
echo "export KEY_NAME="my_celes_key"" >> $HOME/.bash_profile
source $HOME/.bash_profile`}
                </ContentItem>

                {network.type === NetworkType.mainnet &&
                    <ContentItem title={"CREATE SERVICE FILE"}>
                        {`sudo tee /etc/systemd/system/celestia-bridge.service > /dev/null <<EOF
[Unit]
Description=${network.name} ${network.type} bridge node
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) bridge start \
--core.ip $CONSENSUS_IP \
--core.rpc.port $CONSENSUS_RPC_PORT \
--core.grpc.port $CONSENSUS_GRPC_PORT \
--keyring.accname $KEY_NAME \
--metrics.tls=true --metrics --metrics.endpoint otel.celestia.observer
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                    </ContentItem>
                }

                {network.type === NetworkType.testnet &&
                    <ContentItem title={"CREATE SERVICE FILE"}>
                        {`sudo tee /etc/systemd/system/celestia-bridge.service > /dev/null <<EOF
[Unit]
Description=${network.name} ${network.type} bridge node
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) bridge start \
--core.ip $CONSENSUS_IP \
--core.rpc.port $CONSENSUS_RPC_PORT \
--core.grpc.port $CONSENSUS_GRPC_PORT \
--keyring.accname $KEY_NAME \
--p2p.network mocha \
--metrics.tls=true --metrics --metrics.endpoint otel.celestia-mocha.com
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                    </ContentItem>
                }

                <ContentItem title={"ENABLE AND START SERVICE"}>
                    {`sudo systemctl daemon-reload
sudo systemctl enable celestia-bridge
sudo systemctl restart celestia-bridge
sudo journalctl -u celestia-bridge -f -o cat`}
                </ContentItem>
            </div>
        </div>
    );
};

export default CelestiaBridgeInstallationGuide;