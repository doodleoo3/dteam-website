import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import InstallationGuideTypeSelector
    from "@/src/features/service-type-selector/installation-guide/InstallationGuideTypeSelector";
import {NetworkType} from "@/src/app/models/INetwork";
const NamadaInstallationGuide:FC<TendermintContentProps> = ({network, chainId, peers}) => {
    return (
        <div className={styles.container__with__types}>
            <InstallationGuideTypeSelector network={network}/>

            <div className={styles.types__content__container}>
                <ContentItem title={"INSTALL DEPENDENCIES"}>
                    {`sudo apt update
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y`}
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

                {network.type === NetworkType.mainnet
                    ?
                    <ContentItem title={"SET VARIABLES"}>
                        {`echo "export WALLET="wallet"" >> $HOME/.bash_profile
echo "export MONIKER="DTEAM_GUIDE"" >> $HOME/.bash_profile
echo "export PORT_${network.name.toUpperCase()}="26"" >> $HOME/.bash_profile
source $HOME/.bash_profile

export NAMADA_NETWORK_CONFIGS_SERVER="https://github.com/anoma/namada-mainnet-genesis/releases/download/mainnet-genesis"`}
                    </ContentItem>
                    :
                    <ContentItem title={"SET VARIABLES"}>
                        {`echo "export WALLET="wallet"" >> $HOME/.bash_profile
echo "export MONIKER="DTEAM_GUIDE"" >> $HOME/.bash_profile
echo "export PORT_${network.name.toUpperCase()}="26"" >> $HOME/.bash_profile
source $HOME/.bash_profile

export NAMADA_NETWORK_CONFIGS_SERVER="https://github.com/vknowable/namada-campfire/releases/download/housefire-alpaca"`}
                    </ContentItem>
                }


                <ContentItem title={"Install rust"}>
                    {`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env`}
                </ContentItem>

                <ContentItem title={"Install CometBFT"}>
                    {`cd $HOME
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.11
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin

cometbft version`}
                </ContentItem>

                <ContentItem title={"Download binary"}>
                    {`cd $HOME
sudo mkdir namada
cd namada
wget https://github.com/anoma/namada/releases/download/v${network.other.version}/namada-v${network.other.version}-Linux-x86_64.tar.gz
tar -xvf namada-v${network.other.version}-Linux-x86_64.tar.gz
rm namada-v${network.other.version}-Linux-x86_64.tar.gz
cd namada-v${network.other.version}-Linux-x86_64
sudo mv namad* /usr/local/bin/

namada --version`}
                </ContentItem>

                <ContentItem title={"Join network"}>
                    {`namada client utils join-network --chain-id ${chainId} --add-persistent-peers`}
                </ContentItem>

                <ContentItem title={"DOWNLOAD GENESIS AND ADDRBOOK"}>
                    {`wget -O $HOME/${network.other.working_dir}/${chainId}/cometbft/config/genesis.json https://download.dteam.tech/${network.name}/${network.type}/genesis
wget -O $HOME/${network.other.working_dir}/${chainId}/cometbft/config/addrbook.json https://download.dteam.tech/${network.name}/${network.type}/addrbook`}
                </ContentItem>

                <ContentItem title={"SET SEEDS AND PEERS"}>
                    {`sed -i 's#seeds = ".*"#seeds = "tcp://${network.other.seed}"#' $HOME/${network.other.working_dir}/${chainId}/config.toml                    
sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://${network.other.peer},tcp://ba3e08d76ce95549927a2a3f4cf379f4969a945c@165.227.42.204:26656"#' $HOME/${network.other.working_dir}/${chainId}/config.toml`}
                </ContentItem>

                <ContentItem title={"Set custom ports / optional"}>
                    {`sed -i.bak -e "s%:26658%:\${PORT_${network.name.toUpperCase()}}658%g;
s%:26657%:\${PORT_${network.name.toUpperCase()}}657%g;
s%:26656%:\${PORT_${network.name.toUpperCase()}}656%g;
s%:26545%:\${PORT_${network.name.toUpperCase()}}545%g;
s%:8545%:\${PORT_${network.name.toUpperCase()}}545%g;
s%:26660%:\${PORT_${network.name.toUpperCase()}}660%g" $HOME/${network.other.working_dir}/${chainId}/config.toml`}
                </ContentItem>

                <ContentItem title={"CREATE SERVICE FILE"}>
                    {`sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=${network.name} ${network.type} node
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$HOME/${network.other.working_dir}
Environment=TM_LOG_LEVEL=p2p:none,pex:error
Environment=NAMADA_CMT_STDOUT=true
ExecStart=$(which namada) node ledger run
StandardOutput=syslog
StandardError=syslog
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                </ContentItem>

                {network.services.snapshot &&
                    <ContentItem title={"DOWNLOAD SNAPSHOT / OPTIONAL"}>
                        {`rm -rf $HOME/${network.other.working_dir}/${chainId}/cometbft/data $HOME/${network.other.working_dir}/${chainId}/{db,wasm}
curl https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot | lz4 -dc - | tar -xf - -C $HOME/${network.other.working_dir}/${chainId}`}
                    </ContentItem>
                }

                <ContentItem title={"ENABLE AND START SERVICE"}>
                    {`sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad
sudo journalctl -u namadad -f`}
                </ContentItem>
            </div>
        </div>
    );
};

export default NamadaInstallationGuide;