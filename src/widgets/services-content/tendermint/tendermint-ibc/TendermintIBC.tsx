import React, {FC} from 'react';
import styles from "./TendermintIBC.module.scss";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";

const TendermintIbc:FC<TendermintContentProps> = ({network}) => {
    return (
        <div className={styles.container}>
                {network.other.ibc
                    ?
                    <>
                        {network.other.ibc.map((item, index) => (
                            <div key={index} className={styles.ibc__item}>
                                <div>
                                    <Image src={`/images/${network.name}.png`} width={100} height={100} alt={item.name}/>
                                    <a href={item.wallet_link}>wallet</a>
                                </div>

                                <FontAwesomeIcon icon={faRepeat}/>

                                <div>
                                    <Image src={`/images/${item.name}.png`} width={100} height={100} alt={item.name}/>
                                    <a href={item.wallet_link}>wallet</a>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <></>
                }
        </div>
    );
};

export default TendermintIbc;