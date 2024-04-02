import React from 'react';
import PageTitle from "@/src/shared/ui/page-title/PageTitle";
import styles from "./HomePage.module.scss"
import PyramidScene from "@/src/shared/ui/pyramid/PyramidScene";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faXTwitter} from '@fortawesome/free-brands-svg-icons'
const HomePage = () => {
    return (
        <>
            <PageTitle>Home</PageTitle>
            <div className={styles.home__page__content}>
                <div className={styles.left__side}>
                    <h1>DTEAM</h1>
                    <p>
                        DTEAM is a reliable validator. We provides the best and most up-to-date services on the market as well as create useful tools for the project community, node operators and developers.
                    </p>
                    <div className={styles.socials__container}>
                        <a target="__blank" href="https://twitter.com/dteamtech"><FontAwesomeIcon icon={faXTwitter} /></a>
                        <a target="__blank" href="https://github.com/DTEAMTECH"><FontAwesomeIcon icon={faGithub} /></a>
                        <a target="__blank" href="https://discord.gg/aFfJH3zW4M"><FontAwesomeIcon icon={faDiscord} /></a>
                    </div>
                </div>

                <div className={styles.right__side}>
                    <PyramidScene/>
                </div>
            </div>
        </>
    );
};

export default HomePage;