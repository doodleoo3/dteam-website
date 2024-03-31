'use client'

import React from 'react';
import styles from "./Header.module.scss"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import { toggle } from '@/src/app/store/slices/mobileMenuSlice';
import {RootState} from "@/src/app/store/store";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faDiscord, faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    const pathname = usePathname()
    const dispatch = useDispatch();

    const isOpen = useSelector((state: RootState) => state.mobileMenu.isOpen);

    if (isOpen) {
        return (
            <>
                <header className={styles.header}>
                    <h1 className={styles.dteam__logo}>DTEAM</h1>

                    <button className={styles.mobile__menu__btn} onClick={() => dispatch(toggle())}>
                        {isOpen
                            ? <FontAwesomeIcon icon={faXmark} />
                            : <FontAwesomeIcon icon={faBars} />
                        }
                    </button>
                </header>

                <div className={styles.mobile__nav}>
                    <div className={styles.mobile__stake__wrapper}>
                        <Link
                            onClick={() => dispatch(toggle())}
                            className={`link ${pathname === '/stake' ? `${styles.active__stake__btn} ${styles.stake__btn}` : `${styles.stake__btn}`}`}
                            href="/stake"
                        >STAKE NOW
                        </Link>
                    </div>

                    <ul className={styles.mobile__links}>
                        <li className={styles.link}>
                            <Link
                                onClick={() => dispatch(toggle())}
                                className={`link ${pathname === '/' ? 'active' : ''}`}
                                href="/"
                            >HOME
                            </Link>
                        </li>
                        <li className={styles.link}>
                            <Link
                                onClick={() => dispatch(toggle())}
                                className={`link ${pathname === '/features' ? 'active' : ''}`}
                                href="/features"
                            >FEATURES
                            </Link>
                        </li>
                        <li className={styles.link}>
                            <Link
                                onClick={() => dispatch(toggle())}
                                className={`link ${pathname?.includes('/networks') ? 'active' : ''}`}
                                href="/networks/mainnet"
                            >NETWORKS
                            </Link>
                        </li>
                        <li className={styles.link}>
                            <Link
                                onClick={() => dispatch(toggle())}
                                className={`link ${pathname?.includes('/services') ? 'active' : ''}`}
                                href="/services/mainnet"
                            >SERVICES
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.socials}>
                        <a target="__blank" href="https://twitter.com/dteamtech"><FontAwesomeIcon
                            icon={faXTwitter}/></a>
                        <a target="__blank" href="https://github.com/DTEAMTECH"><FontAwesomeIcon icon={faGithub}/></a>
                        <a target="__blank" href="https://discord.gg/aFfJH3zW4M"><FontAwesomeIcon icon={faDiscord}/></a>
                    </div>
                </div>
            </>
        );
    }


    return (
        <header className={styles.header}>
            <div className={styles.header__element__wrapper}>
                <h1 className={styles.dteam__logo}>DTEAM</h1>
            </div>

            <button className={styles.mobile__menu__btn} onClick={() => dispatch(toggle())}>
                <FontAwesomeIcon icon={faBars}/>
            </button>

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