import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styles from "./ContentItem.module.scss";

interface ContentItemProps {
    title: string;
}
const ContentItem:FC<PropsWithChildren<ContentItemProps>> = ({title, children}) => {
    const contentItemRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState<'left' | 'right' | 'middle'>('left');

    useEffect(() => {
        document.querySelectorAll('code p').forEach((block) => {
            if (block instanceof HTMLElement) {
                hljs.highlightBlock(block);
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
            <h2 className={styles.title}>{title}</h2>

            <code className={`bash ${styles.code__wrapper}`}>
                {children}
            </code>
        </div>
    );
};

export default ContentItem;