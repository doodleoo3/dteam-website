import React, {FC, useEffect} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import dynamic from "next/dynamic";

import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss"

import ContentItem from "@/src/entities/content-item/ContentItem";
import InstallationGuideTypeSelector from "@/src/features/service-type-selector/InstallationGuideTypeSelector";
import LoadingService from "@/src/shared/ui/loading-service/LoadingService";

import WardenBuild from "@/src/entities/download-build-binary/WardenBuild";
import DefaultBuild from "@/src/entities/download-build-binary/DefaultBuild";
import SelfchainDownload from "@/src/entities/download-build-binary/SelfchainDownload";
import LavaDownload from "@/src/entities/download-build-binary/LavaDownload";
import ZeroGravityBuild from "@/src/entities/download-build-binary/ZeroGravityBuild";
import CelestiaBuild from "@/src/entities/download-build-binary/CelestiaBuild";

// import StoryInstallationGuide
//     from "@/src/widgets/services-content/story/story-installation-guide/StoryInstallationGuide";
// import NamadaInstallationGuide from "@/src/widgets/services-content/namada/namada-installation-guide/NamadaInstallationGuide";

const CelestiaBridgeInstallationGuide = dynamic(() => import("@/src/widgets/services-content/celestia/celestia-installation-guide/bridge/CelestiaBridgeInstallationGuide"), {loading: LoadingService})
const CelestiaFullInstallationGuide = dynamic(() => import("@/src/widgets/services-content/celestia/celestia-installation-guide/full/CelestiaFullInstallationGuide"), {loading: LoadingService})
const CelestiaLightInstallationGuide = dynamic(() => import("@/src/widgets/services-content/celestia/celestia-installation-guide/light/CelestiaLightInstallationGuide"), {loading: LoadingService})
const TendermintInstallationGuideWithCosmovisor = dynamic(() => import("@/src/widgets/services-content/tendermint/tendermint-installation-guide/TendermintInstallationGuideWithCosmovisor"), {loading: LoadingService})
const StoryInstallationGuide = dynamic(() => import("@/src/widgets/services-content/story/story-installation-guide/StoryInstallationGuide"))
const NamadaInstallationGuide = dynamic(() => import("@/src/widgets/services-content/namada/namada-installation-guide/NamadaInstallationGuide"))


const TendermintInstallationGuide:FC<TendermintContentProps> = ({network, nodeVersion, chainId, peers}) => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const router = useRouter();

    useEffect(() => {
        if (type === null) {
            router.push(`/services/${network.type}/installation-guide/${network.name}?type=consensus`);
        }
    }, []);

    if (network.name === "namada") {
        return (
            <NamadaInstallationGuide network={network} chainId={chainId} />
        );
    }

    if (network.name === "story") {
        return (
           <StoryInstallationGuide network={network} peers={peers} />
        );
    }

    if (type === "cosmovisor") {
        return (
            <TendermintInstallationGuideWithCosmovisor network={network} nodeVersion={nodeVersion} chainId={chainId} peers={peers} />
        );
    }

    if (type === "bridge" && network.name === "celestia") {
        return (
            <CelestiaBridgeInstallationGuide network={network} />
            // <TendermintInstallationGuideWithCosmovisor network={network} nodeVersion={nodeVersion} chainId={chainId} peers={peers} />
        );
    }

    if (type === "full" && network.name === "celestia") {
        return (
            <CelestiaFullInstallationGuide network={network} />
        );
    }

    if (type === "light" && network.name === "celestia") {
        return (
            <CelestiaLightInstallationGuide network={network} />
        );
    }

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
                                                {network.name === "warden" &&
                                                    <WardenBuild network={network} nodeVersion={nodeVersion}/>}
                                                {network.name === "0g" &&
                                                    <ZeroGravityBuild network={network} nodeVersion={nodeVersion}/>}
                                                {network.name === "celestia" &&
                                                    <CelestiaBuild network={network} nodeVersion={nodeVersion}/>}
                                        </>
                                        : <DefaultBuild network={network} nodeVersion={nodeVersion}/>
                                    }
                            </>
                            :
                            <>
                                    {network.name === "selfchain" && <SelfchainDownload network={network}/>}
                                    {network.name === "lava" &&
                                        <LavaDownload network={network} nodeVersion={nodeVersion}/>}
                            </>
                        }

                        {network.name === "initia" || network.name === "kopi" || network.name === "nillion"
                            ?
                            <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                                    {`${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${chainId}
${network.other.binary_name} config set client chain-id ${chainId}
${network.other.binary_name} config set client keyring-backend os
${network.other.binary_name} config set client node tcp://localhost:\${PORT_${network.name.toUpperCase()}}657`}
                            </ContentItem>
                            :
                            <ContentItem title={"CONFIG AND INITIALIZE NODE"}>
                                    {`${network.other.binary_name} init "DTEAM_GUIDE" --chain-id ${chainId}
${network.other.binary_name} config chain-id ${chainId}
${network.other.binary_name} config keyring-backend os
${network.other.binary_name} config node tcp://localhost:\${PORT_${network.name.toUpperCase()}}657`}
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
                                            {`sed -i -e "s/^pruning *=.*/pruning = \\"custom\\"/" $HOME/${network.other.working_dir}/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"100\\"/" $HOME/${network.other.working_dir}/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \\"20\\"/" $HOME/${network.other.working_dir}/config/app.toml`}
                                    </ContentItem>
                                    :
                                    <></>
                        }

                        <ContentItem title={"SET MINIMUM GAS PRICE / OPTIONAL"}>
                                {`sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "${network.other.min_gas_price}${network.other.denom}"|g' $HOME/${network.other.working_dir}/config/app.toml`}
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

                    {network.services.snapshot &&
                        <ContentItem title={"DOWNLOAD SNAPSHOT / OPTIONAL"}>
                            {`${network.other.binary_name} tendermint unsafe-reset-all --home $HOME/${network.other.working_dir}
curl https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot | lz4 -dc - | tar -xf - -C $HOME/${network.other.working_dir}`}
                        </ContentItem>
                    }

                        <ContentItem title={"ENABLE AND START SERVICE"}>
                                {`sudo systemctl daemon-reload
sudo systemctl enable ${network.other.binary_name}                    
sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
                        </ContentItem>
                </div>
        </div>
    );
};

export default TendermintInstallationGuide;