import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styles from "./ContentItem.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

interface ContentItemProps {
    title: string;
    isInstallationGuidePage?: boolean;
    isUsefulCommandsPage?: boolean;

    setWallet?: (wallet: string) => void;
    setMoniker?: (moniker: string) => void;
    setPort?: (port: number) => void;
}

const ContentItem: FC<PropsWithChildren<ContentItemProps>> = ({ title, children, setWallet, setPort, setMoniker }) => {
    const contentItemRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const codeBlocks = contentItemRef.current?.querySelectorAll('pre code');
        codeBlocks?.forEach(block => {
            if (block instanceof HTMLElement) {
                hljs.highlightElement(block);
            }
        });
    }, []);

    const handleCopyClick = () => {
        if (children) {
            navigator.clipboard.writeText(children.toString()).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 5000);
            });
        }
    };

    return (
        <div ref={contentItemRef} className={`${styles.content__item}`}>
            <div className={styles.title__wrapper}>
                <h2 className={styles.title}>{title}</h2>
                <button onClick={handleCopyClick} className={styles.copy__button}>
                    <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
                </button>
            </div>
            <pre className={styles.pre}>
                <code className={`bash ${styles.code__wrapper}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

export default ContentItem;