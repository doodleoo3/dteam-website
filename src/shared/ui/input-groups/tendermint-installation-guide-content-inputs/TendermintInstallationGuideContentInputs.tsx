import React, {FC, useState} from 'react';
import styles from "./TendermintInstallationGuideContentInputs.module.scss";
import Input from "@/src/shared/ui/input/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

interface SetVarsInputsProps {
    setWallet: (wallet: string) => void;
    setMoniker: (moniker: string) => void;
    setPort: (port: number) => void;
}

const TendermintInstallationGuideContentInputs:FC<SetVarsInputsProps> = ({setPort, setMoniker, setWallet}) => {
    const [port, setLocalPort] = useState<number>(25);
    const [wallet, setLocalWallet] = useState<string>("wallet");
    const [moniker, setLocalMoniker] = useState<string>("DTEAM_GUIDE");

    const handleIncrement = () => {
        const newPort = port + 1;
        setLocalPort(newPort);
        setPort(newPort);
    };

    const handleDecrement = () => {
        const newPort = port > 1 ? port - 1 : port;
        setLocalPort(newPort);
        setPort(newPort);
    };

    const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalWallet(e.target.value)
        setWallet(e.target.value);
    };

    const handleMonikerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMoniker(e.target.value);
        setMoniker(e.target.value);
    };

    const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setLocalPort(value);
            setPort(value);
        } else {
            setLocalPort(1);
            setPort(1);
        }
    };

    return (
        <div className={styles.inputs__wrapper}>

            <div>
                <h3>wallet name:</h3>
                <Input
                    placeholder="wallet"
                    value={wallet}
                    onChange={handleWalletChange}
                />
            </div>

            <div>
                <h3>moniker:</h3>
                <Input
                    placeholder="moniker"
                    value={moniker}
                    onChange={handleMonikerChange}
                />
            </div>

            <div>
                <h3>port:</h3>
                <div className={styles.input__with__buttons}>
                    <Input
                        placeholder="port"
                        value={port}
                        onChange={handlePortChange}
                    />
                    <div className={styles.buttons__container}>
                        <button className={styles.increment__button} onClick={handleIncrement}><FontAwesomeIcon icon={faChevronUp} /></button>
                        <button className={styles.decrement__button} onClick={handleDecrement}><FontAwesomeIcon icon={faChevronDown} /></button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TendermintInstallationGuideContentInputs;