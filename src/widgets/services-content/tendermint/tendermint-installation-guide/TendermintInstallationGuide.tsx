import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintInstallationGuide:FC<TendermintContentProps> = ({network, nodeVersion, chainId}) => {
    return (
        <>
            <ContentItem title={"INSTALL DEPENDENCIES"}>
                <p>sudo apt update</p>
                <p>apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</p>
            </ContentItem>

            <ContentItem title={"INSTALL GO"}>
                <p>cd $HOME</p>
                <p>{`! [ -x "$(command -v go)" ] && {`}</p>
                <p>{`VER="1.19.5"`}</p>
                <p>{`wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"`}</p>
                <p>sudo rm -rf /usr/local/go</p>
                <p>{`sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"`}</p>
                <p>{`rm "go$VER.linux-amd64.tar.gz"`}</p>
                <p>[ ! -f ~/.bash_profile ] && touch ~/.bash_profile</p>
                <p>{`echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile`}</p>
                <p>source $HOME/.bash_profile</p>
                <p>{`}`}</p>
                <p>[ ! -d ~/go/bin ] && mkdir -p ~/go/bin</p>
            </ContentItem>

            <ContentItem title={"SET VARIABLES"}>
                <p>{`echo "export WALLET="wallet"" >> $HOME/.bash_profile`}</p>
                <p>{`echo "export MONIKER="test"" >> $HOME/.bash_profile`}</p>
                <p>{`echo "export ${network.name.toUpperCase()}_CHAIN_ID="${chainId}"" >> $HOME/.bash_profile`}</p>
                <p>{`echo "export ${network.name.toUpperCase()}_PORT="25"" >> $HOME/.bash_profile`}</p>
                <p>source $HOME/.bash_profile</p>
            </ContentItem>

            <ContentItem title={"DOWNLOAD BINARY"}>
                <p>sudo apt update</p>
                <p>cd $HOME</p>
                <p>rm -rf {network.name}</p>
                {/*<p>{network.other.download_binary_command}</p>*/}
                <p>cd {network.name}</p>
                <p>git checkout v{nodeVersion}</p>
                <p>make install</p>
                <p>{network.other.binary_name} v{nodeVersion}</p>
            </ContentItem>

            <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                <p>{`${network.other.binary_name} config node tcp://localhost:\${${network.name.toUpperCase()}_PORT}657`}</p>
                <p>{`${network.other.binary_name} config keyring-backend os`}</p>
                <p>{`${network.other.binary_name} config chain-id ${chainId}`}</p>
                <p>{`${network.other.binary_name} init "test" --chain-id ${chainId}`}</p>
            </ContentItem>

            <ContentItem title={"DOWNLOAD GENESIS AND ADDRBOOK"}>
                <p>{`wget -O $HOME/.${network.other.working_dir}/config/genesis.json https://download.${network.type}.${network.name}.dteam.tech/genesis`}</p>
                <p>{`wget -O $HOME/.${network.other.working_dir}/config/addrbook.json https://download.${network.type}.${network.name}.dteam.tech/addrbook`}</p>
            </ContentItem>

            <ContentItem title={"SET SEEDS AND PEERS"}>
                <p>SEEDS=</p>
                <p>PEERS=</p>
                <p>{`sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/; s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.${network.other.working_dir}/config/config.toml`}</p>
            </ContentItem>

            <ContentItem title={"SET CUSTOM PORTS"}>
                <p>{`sed -i.bak -e "s%:1317%:\${${network.name.toUpperCase()}_PORT}317%g;`}</p>
                <p>{`s%:8080%:\${${network.name.toUpperCase()}_PORT}080%g;`}</p>
                <p>{`s%:9090%:\${${network.name.toUpperCase()}_PORT}090%g;`}</p>
                <p>{`s%:9091%:\${${network.name.toUpperCase()}_PORT}091%g;`}</p>
                <p>{`s%:8545%:\${${network.name.toUpperCase()}_PORT}545%g;`}</p>
                <p>{`s%:8546%:\${${network.name.toUpperCase()}_PORT}546%g;`}</p>
                <p>{`s%:6065%:\${${network.name.toUpperCase()}_PORT}065%g" $HOME/.${network.other.working_dir}/config/app.toml`}</p>
                <br/>
                <p>{`sed -i.bak -e "s%:26658%:\${${network.name.toUpperCase()}_PORT}658%g;`}</p>
                <p>{`s%:26657%:\${${network.name.toUpperCase()}_PORT}657%g;`}</p>
                <p>{`s%:6060%:\${${network.name.toUpperCase()}_PORT}060%g;`}</p>
                <p>{`s%:26656%:\${${network.name.toUpperCase()}_PORT}656%g;`}</p>
                <p>{`s%^external_address = \\"\\"%external_address = \\"$(wget -qO- eth0.me):\${${network.name.toUpperCase()}_PORT}656\\"%;`}</p>
                <p>{`s%:26660%:\${${network.name.toUpperCase()}_PORT}660%g" $HOME/.${network.other.working_dir}/config/config.toml`}</p>
            </ContentItem>

            <ContentItem title={"CONFIG PRUNING"}>
                <p>{`sed -i -e "s/^pruning *=.*/pruning = \\"nothing\\"/" $HOME/.${network.other.working_dir}/config/app.toml`}</p>
                <p>{`sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"100\\"/" $HOME/.${network.other.working_dir}/config/app.toml`}</p>
                <p>{`sed -i -e "s/^pruning-interval *=.*/pruning-interval = \\"50\\"/" $HOME/.${network.other.working_dir}/config/app.toml`}</p>
            </ContentItem>

            <ContentItem title={"SET MINIMUM GAS PRICE AND DISABLE INDEXING"}>
                <p>{`sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "0.0025${network.other.denom}"|g' $HOME/.${network.other.working_dir}/config/app.toml`}</p>
                <p>{`sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/.${network.other.working_dir}/config/config.toml`}</p>
            </ContentItem>

            <ContentItem title={"CREATE SERVICE FILE"}>
                <p>{`sudo tee /etc/systemd/system/${network.other.binary_name}.service > /dev/null <<EOF`}</p>
                <p>[Unit]</p>
                <p>{`Description=${network.name} node`}</p>
                <p>After=network-online.target</p>
                <p>[Service]</p>
                <p>User=$USER</p>
                <p>{`WorkingDirectory=$HOME/.${network.other.working_dir}`}</p>
                <p>{`ExecStart=$(which ${network.other.binary_name}) start --home $HOME/.${network.other.working_dir}`}</p>
                <p>Restart=on-failure</p>
                <p>RestartSec=5</p>
                <p>LimitNOFILE=65535</p>
                <p>[Install]</p>
                <p>WantedBy=multi-user.target</p>
                <p>EOF</p>
            </ContentItem>

            <ContentItem title={"RESET AND DOWNLOAD SNAPSHOT"}>
                <p>{`${network.other.binary_name} tendermint unsafe-reset-all --home $HOME/.${network.other.working_dir}`}</p>
                <p>{`curl https://download.${network.type}.${network.name}.dteam.tech/snapshot | lz4 -dc - | tar -xf - -C $HOME/.${network.other.working_dir}`}</p>
            </ContentItem>

            <ContentItem title={"ENABLE AND START SERVICE"}>
                <p>sudo systemctl daemon-reload</p>
                <p>{`sudo systemctl enable ${network.other.binary_name}`}</p>
                <p>{`sudo systemctl restart ${network.other.binary_name} && sudo journalctl -u ${network.other.binary_name} -f`}</p>
            </ContentItem>
        </>
    );
};

export default TendermintInstallationGuide;