import React, {FC, PropsWithChildren, useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styles from "./ContentItem.module.scss";

interface ContentItemProps {
    title: string;
    isInstallationGuidePage?: boolean;
    isUsefulCommandsPage?: boolean;

    setWallet?: (wallet: string) => void;
    setMoniker?: (moniker: string) => void;
    setPort?: (port: number) => void;
}
const ContentItem:FC<PropsWithChildren<ContentItemProps>> = ({title, children, setWallet, setPort, setMoniker}) => {
    const contentItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const codeBlocks = contentItemRef.current?.querySelectorAll('pre code');
        codeBlocks?.forEach(block => {
            if (block instanceof HTMLElement) {
                hljs.highlightElement(block);
            }
        });
    }, []);

    return (
        <div ref={contentItemRef} className={`${styles.content__item}`}>
            <h2 className={styles.title}>{title}</h2>
            <pre className={styles.pre}>
                <code className={`bash ${styles.code__wrapper}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

export default ContentItem;