import React, {FC} from 'react';
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const NamadaInstallationGuide:FC<TendermintContentProps> = ({network, peers}) => {
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
                            {`echo "export MONIKER="DTEAM_GUIDE"" >> $HOME/.bash_profile
echo "export ${network.name.toUpperCase()}_PORT="26"" >> $HOME/.bash_profile
source $HOME/.bash_profile`}
                    </ContentItem>

                    <ContentItem title={"Build geth binary"}>
                        {`cd $HOME
rm -rf ${network.other.binary_name}-geth
git clone https://github.com/piplabs/story-geth.git
cd ${network.other.main_dir}-geth
git checkout v0.9.2
make geth
cp ./build/bin/geth $HOME/go/bin/story-geth
    
story-geth version`}
                    </ContentItem>

                    <ContentItem title={"Build consensus binary"}>
                            {`cd $HOME
rm -rf ${network.other.binary_name}
git clone https://github.com/piplabs/story.git
cd ${network.other.main_dir}
git checkout v0.9.11
go build -o story ./client
cp story $HOME/go/bin

story version`}
                    </ContentItem>

                    <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                        {`${network.other.binary_name} init --network iliad --moniker "DTEAM_GUIDE"`}
                    </ContentItem>

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

                    <ContentItem title={"SET CUSTOM PORTS / OPTIONAL"}>
                    {`sed -i.bak -e "s%:26658%:\${PORT_${network.name.toUpperCase()}}658%g;
s%:26657%:\${PORT_${network.name.toUpperCase()}}657%g;
s%:6060%:\${PORT_${network.name.toUpperCase()}}060%g;
s%:26656%:\${PORT_${network.name.toUpperCase()}}656%g;
s%^external_address = \\"\\"%external_address = \\"$(wget -qO- eth0.me):\${PORT_${network.name.toUpperCase()}}656\\"%;
s%:26660%:\${PORT_${network.name.toUpperCase()}}660%g" $HOME/${network.other.working_dir}/config/config.toml`}
                    </ContentItem>

                    <ContentItem title={"DISABLE INDEXING / OPTIONAL"}>
                        {`INDEXER="null"
sed -i -e "s/^indexer *=.*/indexer = \\"$INDEXER\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
                    </ContentItem>

                    <ContentItem title={"CREATE GETH SERVICE FILE"}>
                        {`sudo tee /etc/systemd/system/${network.other.binary_name}-geth.service > /dev/null <<EOF
[Unit]
Description=${network.name}-geth ${network.type} node
After=network-online.target

[Service]
User=$USER
ExecStart=$(which ${network.other.binary_name}-geth) --iliad --syncmode full
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                    </ContentItem>

                    <ContentItem title={"CREATE CONSENSUS SERVICE FILE"}>
                    {`sudo tee /etc/systemd/system/${network.other.binary_name}.service > /dev/null <<EOF
[Unit]
Description=${network.name} ${network.type} node
After=network-online.target

[Service]
User=$USER
ExecStart=$(which ${network.other.binary_name}) run
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                    </ContentItem>

                    {network.services.snapshot &&
                        <ContentItem title={"DOWNLOAD GETH SNAPSHOT / OPTIONAL"}>
                            {`mkdir -p $HOME/.story/geth/iliad/geth
curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-geth-snapshot  | lz4 -c -d - | tar -x -C $HOME/.story/geth/iliad/geth`}
                        </ContentItem>
                    }

                    {network.services.snapshot &&
                        <ContentItem title={"DOWNLOAD CONSENSUS SNAPSHOT / OPTIONAL"}>
                            {`curl -o - -L https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot  | lz4 -c -d - | tar -x -C $HOME/${network.other.working_dir}`}
                        </ContentItem>
                    }

                    <ContentItem title={"ENABLE AND START GETH SERVICE"}>
                        {`sudo systemctl daemon-reload
sudo systemctl enable ${network.other.binary_name}-geth               
sudo systemctl restart ${network.other.binary_name}-geth
sudo journalctl -u ${network.other.binary_name}-geth -f -o cat`}
                    </ContentItem>

                    <ContentItem title={"ENABLE AND START CONSENSUS SERVICE"}>
                        {`sudo systemctl daemon-reload
sudo systemctl enable ${network.other.binary_name}                    
sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                    </ContentItem>


            </div>
        );
};

export default NamadaInstallationGuide;