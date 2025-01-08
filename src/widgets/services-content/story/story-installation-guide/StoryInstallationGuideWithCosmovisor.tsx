import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import InstallationGuideTypeSelector
    from "@/src/features/service-type-selector/installation-guide/InstallationGuideTypeSelector";
import ContentItem from "@/src/entities/content-item/ContentItem";

const StoryInstallationGuideWithCosmovisor:FC<TendermintContentProps> = ({network, nodeVersion, chainId, peers}) => {
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
ver="1.22.3" && \\
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \\
sudo rm -rf /usr/local/go && \\
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \\
rm "go$ver.linux-amd64.tar.gz" && \\
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile && \\
source $HOME/.bash_profile && \\
go version`}
                </ContentItem>

                <ContentItem title={"SET VARIABLES"}>
                    {`echo "export DAEMON_NAME="story"" >> $HOME/.bash_profile
echo "export DAEMON_HOME="$HOME/.story/story"" >> $HOME/.bash_profile
source $HOME/.bash_profile`}
                </ContentItem>

                <ContentItem title={"Install And Initialize Cosmovisor"}>
                    {`go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
cosmovisor init $(which story)`}
                </ContentItem>

                <ContentItem title={"CREATE DIRECTORIES"}>
                    {`mkdir -p $HOME/.story/story/cosmovisor/upgrades/v0.13.0/bin`}
                </ContentItem>

                <ContentItem title={"Download Binaries"}>
                    {`wget -O $HOME/.story/story/cosmovisor/upgrades/v0.13.0/bin/story https://github.com/piplabs/story/releases/download/v0.13.0/story-linux-amd64
chmod +x $HOME/.story/story/cosmovisor/upgrades/v0.13.0/bin/story`}
                </ContentItem>

                <ContentItem title={"CREATE CONSENSUS SERVICE FILE"}>
                    {`sudo tee /etc/systemd/system/${network.other.binary_name}.service > /dev/null <<EOF
[Unit]
Description=story cosmovisor service
After=network-online.target

[Service]
User=$USER
Environment="DAEMON_NAME=story"
Environment="DAEMON_HOME=$HOME/.story/story"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="DAEMON_DATA_BACKUP_DIR=$HOME/.story/story/data"
ExecStart=$(which cosmovisor) run run
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                </ContentItem>

                <ContentItem title={"ENABLE AND START COSMOVISOR SERVICE"}>
                    {`sudo systemctl daemon-reload
sudo systemctl enable ${network.other.binary_name}
sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                </ContentItem>
            </div>
        </div>
    );
};

export default StoryInstallationGuideWithCosmovisor;