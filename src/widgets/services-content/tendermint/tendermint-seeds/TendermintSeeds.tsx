import React, {FC} from 'react';
import ContentItem from "@/src/entities/content-item/ContentItem";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";
import dynamic from "next/dynamic";

const NamadaSeeds = dynamic(() => import("@/src/widgets/services-content/namada/namada-seeds/NamadaSeeds"))

const TendermintSeeds:FC<TendermintContentProps> = ({network, chainId}) => {
    if (network.name === "namada") {
        return (
            <NamadaSeeds network={network} chainId={chainId} />
        );
    }

    return (
        <div className={styles.container}>
            <ContentItem title={"Seed node"}>
                {`SEED="${network.other.seed}"
sed -i.bak -e "s/^seed *=.*/seed = \\"$SEED\\"/" $HOME/${network.other.working_dir}/config/config.toml`}
            </ContentItem>
            <ContentItem title={"RESTART NODE AND CHECK LOGS"}>
                {`sudo systemctl restart ${network.other.binary_name}
sudo journalctl -u ${network.other.binary_name} -f -o cat`}
            </ContentItem>
        </div>
    );
};

export default TendermintSeeds;