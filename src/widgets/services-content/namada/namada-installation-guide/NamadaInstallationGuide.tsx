import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
const NamadaInstallationGuide:FC<TendermintContentProps> = ({network, chainId}) => {
    return (
        <div className={styles.container}>
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

                <ContentItem title={"SET VARIABLES"}>
                {`echo "export WALLET="wallet"" >> $HOME/.bash_profile
echo "export MONIKER="DTEAM_GUIDE"" >> $HOME/.bash_profile
echo "export ${network.name.toUpperCase()}_PORT="26"" >> $HOME/.bash_profile
source $HOME/.bash_profile`}
                </ContentItem>

                <ContentItem title={"Install rust"}>
                {`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env`}
                </ContentItem>

                <ContentItem title={"Install CometBFT"}>
                {`cd $HOME
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.2
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin/
cometbft version`}
                </ContentItem>

                <ContentItem title={"Download binary"}>
                {`cd $HOME
git clone https://github.com/anoma/namada
cd namada
wget https://github.com/anoma/namada/releases/download/v${network.other.version}/namada-v${network.other.version}-Linux-x86_64.tar.gz
tar -xvf namada-v${network.other.version}-Linux-x86_64.tar.gz
rm namada-v${network.other.version}-Linux-x86_64.tar.gz
cd namada-v${network.other.version}-Linux-x86_64
sudo mv namad* /usr/local/bin/

namada --version`}
                </ContentItem>

                <ContentItem title={"Join network"}>
                    {`namada client utils join-network --chain-id ${chainId}`}
                </ContentItem>

                <ContentItem title={"CREATE SERVICE FILE"}>
                        {`sudo tee /etc/systemd/system/namadad > /dev/null <<EOF
[Unit]
Description=${network.name} node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/${network.other.working_dir}
ExecStart=$(which namada) node ledger run
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF`}
                </ContentItem>

                <ContentItem title={"Set custom ports / optional"}>
                        {`sed -i.bak -e "s%:26658%:\${${network.name.toUpperCase()}_PORT}658%g;
s%:26657%:\${${network.name.toUpperCase()}_PORT}657%g;
s%:26656%:\${${network.name.toUpperCase()}_PORT}}656%g;
s%:26545%:\${${network.name.toUpperCase()}_PORT}545%g;
s%:8545%:\${${network.name.toUpperCase()}_PORT}545%g;
s%:26660%:\${${network.name.toUpperCase()}_PORT}660%g" $HOME/.local/share/namada/shielded-expedition.88f17d1d14/config.toml`}
                </ContentItem>

                <ContentItem title={"ENABLE AND START SERVICE"} >
                        {`sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad
sudo journalctl -u namadad -f`}
                </ContentItem>
        </div>
    );
};

export default NamadaInstallationGuide;