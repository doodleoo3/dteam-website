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

                                <a target="__blank" href={network.other.ibc_wallet}>
                                    <div>
                                        <Image src={`/images/${network.name}.png`} width={100} height={100}
                                               alt={network.name}/>
                                        <p>Relayer wallet</p>
                                    </div>
                                </a>


                                <FontAwesomeIcon icon={faRepeat}/>

                                <a target="__blank" href={item.wallet_link}>
                                    <div>
                                        <Image src={`/images/${item.name}.png`} width={100} height={100}
                                               alt={item.name}/>
                                        <p>Relayer wallet</p>
                                    </div>
                                </a>

                                {/*<div>*/}
                                {/*    <Image src={`/images/${item.name}.png`} width={100} height={100} alt={item.name}/>*/}
                                {/*    <a href={item.wallet_link}>Relayer wallet</a>*/}
                                {/*</div>*/}
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