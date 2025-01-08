import React from 'react';
import {INetwork} from "@/src/app/models/INetwork";
import {useRouter, useSearchParams} from "next/navigation";
import styles from "@/src/features/service-type-selector/TypeSelector.module.scss";

interface ServiceTypeSelectorProps {
    network: INetwork;
}
const SnapshotTypeSelector:React.FC<ServiceTypeSelectorProps> = ({ network }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const snapshot = network.services['snapshot'];

    if (!snapshot) {
        return null;
    }

    const guideKeys = Object.keys(snapshot).filter(key => snapshot[key] === true);

    if (guideKeys.length <= 0) {
        return null;
    }

    const handleButtonClick = (key: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('type', key);
        router.push(`/services/${network.type}/snapshot/${network.name}?${newSearchParams.toString()}`);
    };

    return (
        <div className={styles.wrapper}>
            {guideKeys.map(key => (
                <button
                    className={`${styles.button} ${type === key || (key === 'pruned' && !type) ? styles.active__button : ''}`}
                    key={key}
                    onClick={() => handleButtonClick(key)}
                >{key}</button>
            ))}
        </div>
    );
};

export default SnapshotTypeSelector;