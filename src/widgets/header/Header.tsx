'use client'

import React from 'react';
import styles from "./Header.module.scss"
import Link from "next/link";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            <h1 className={styles.dteam__logo}>DTEAM</h1>

            <ul className={styles.nav__links}>
                <li className={styles.link}>
                    <Link
                        className={`link ${pathname === '/' ? 'active' : ''}`}
                        href="/"
                    >HOME
                    </Link>
                </li>
                <li className={styles.link}>
                    <Link
                        className={`link ${pathname === '/features' ? 'active' : ''}`}
                        href="/features"
                    >FEATURES
                    </Link>
                </li>
                <li className={styles.link}>
                    <Link
                        className={`link ${pathname?.includes('/networks') ? 'active' : ''}`}
                        href="/networks/mainnet"
                    >NETWORKS
                    </Link>
                </li>
                <li className={styles.link}>
                    <Link
                        className={`link ${pathname?.includes('/services') ? 'active' : ''}`}
                        href="/services/mainnet"
                    >SERVICES
                    </Link>
                </li>
            </ul>

            <div className={styles.btn__wrapper}>
                <Link
                    className={`link ${pathname === '/stake' ? `${styles.active__stake__btn} ${styles.stake__btn}` : `${styles.stake__btn}`}`}
                    href="/stake"
                >STAKE NOW
                </Link>
            </div>
        </header>
    );
};

export default Header;