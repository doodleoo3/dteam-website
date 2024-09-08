import React from 'react';
import { INetwork } from '@/src/app/models/INetwork';
import styles from './InstallationGuideTypeSelector.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

interface ServiceTypeSelectorProps {
    network: INetwork;
}

const InstallationGuideTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ network }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const installationGuide = network.services['installation-guide'];

    if (!installationGuide) {
        return null;
    }

    const guideKeys = Object.keys(installationGuide).filter(key => installationGuide[key] === true);

    if (guideKeys.length <= 1) {
        return null;
    }

    const handleButtonClick = (key: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('type', key);
        router.push(`/services/${network.type}/installation-guide/${network.name}?${newSearchParams.toString()}`);
    };

    return (
        <div className={styles.wrapper}>
            {guideKeys.map(key => (
                <button
                    className={`${styles.button} ${type === key || (key === 'consensus' && !type) ? styles.active__button : ''}`}
                    key={key}
                    onClick={() => handleButtonClick(key)}
                >
                    {key === "cosmovisor"
                        ? "consensus / cosmovisor"
                        : key
                    }
                </button>
            ))}
        </div>
    );
};

export default InstallationGuideTypeSelector;
