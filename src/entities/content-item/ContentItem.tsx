import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styles from "./ContentItem.module.scss";
import TendermintInstallationGuideContentInputs from "@/src/shared/ui/input-groups/tendermint-installation-guide-content-inputs/TendermintInstallationGuideContentInputs";

interface ContentItemProps {
    title: string;
    isInstallationGuidePage?: boolean;
    isUsefulCommandsPage?: boolean;

    setWallet?: (wallet: string) => void;
    setMoniker?: (moniker: string) => void;
    setPort?: (port: number) => void;
}
const ContentItem:FC<PropsWithChildren<ContentItemProps>> = ({title, children, isInstallationGuidePage, isUsefulCommandsPage, setWallet, setPort, setMoniker}) => {
    const contentItemRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState<'left' | 'right' | 'middle'>('left');

    useEffect(() => {
        document.querySelectorAll('code p').forEach((block) => {
            if (block instanceof HTMLElement) {
                hljs.highlightElement(block);
            }
        });

        const handleScroll = () => {
            const div = contentItemRef.current;
            if (div) {
                const maxScrollLeft = div.scrollWidth - div.clientWidth;
                if (div.scrollLeft === 0) {
                    setScrollPosition('left');
                } else if (div.scrollLeft >= maxScrollLeft) {
                    setScrollPosition('right');
                } else {
                    setScrollPosition('middle');
                }
            }
        };

        const div = contentItemRef.current;
        div?.addEventListener('scroll', handleScroll);
        return () => div?.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <div
            ref={contentItemRef}
            className={`${styles[scrollPosition]} ${styles.content__item}`}
        >
            {
                isInstallationGuidePage && setPort && setMoniker && setWallet
                    ?
                    <div className={styles.title__wrapper}>
                        <h2 className={styles.title}>{title}</h2>
                        <TendermintInstallationGuideContentInputs setWallet={setWallet} setMoniker={setMoniker} setPort={setPort}/>
                    </div>
                    :
                    <h2 className={styles.title}>{title}</h2>
            }
            <code className={`bash ${styles.code__wrapper}`}>
                {children}
            </code>
        </div>
    );
};

export default ContentItem;