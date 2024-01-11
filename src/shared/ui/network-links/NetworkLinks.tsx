import React, {FC} from 'react';
import {INetwork, NetworkType} from "@/src/app/models/INetwork";
import {useRouter} from "next/navigation";
import styles from "./NetworkLinks.module.scss"
import ComingSoon from "@/src/shared/ui/coming-soon/ComingSoon";

interface NetworkLinksProps {
    network: INetwork;
    type: NetworkType;
}

const NetworkLinks:FC<NetworkLinksProps> = ({network, type}) => {
    const router = useRouter()

    return (
        <div className={styles.links}>
            {type === NetworkType.mainnet
                ? <a target="__blank" href={network.links.delegate}
                     className={`${styles.stake__link} ${styles.link}`}>STAKE</a>
                : <></>
            }
            <button className={styles.link}
                    onClick={() => router.push(`/services/${network.type}/overview/${network.name}`)}>SERVICES
            </button>
            <button className={styles.link} disabled style={{cursor: "default"}}><ComingSoon>EXPLORER</ComingSoon></button>

            <a target="__blank" href={network.links.website} className={styles.link}>WEBSITE</a>
        </div>
    );
};

export default NetworkLinks;