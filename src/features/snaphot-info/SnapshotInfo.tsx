import React, {FC, useEffect, useState} from 'react';
import styles from "./SnapshotInfo.module.scss";
import LoadingBlock from "@/src/shared/ui/loading-block/LoadingBlock";
import axios from "axios";
import {INetwork} from "@/src/app/models/INetwork";

interface ISnapshotInfo {
    network: INetwork
}

const SnapshotInfo:FC<ISnapshotInfo> = ({network}) => {
    const [snapshotData, setSnapshotData] = useState<ISnapshot | null>(null);

    const currentTime = Date.now();
    async function fetchSnapshotData() {
        try {
            const response = await axios.get<ISnapshot>(`https://data.dteam.tech/${network.name}/${network.type}/snapshot`);
            return response.data;
        } catch (e) {
            throw Error("Error while get snapshot data")
        }
    }

    useEffect(() => {
        fetchSnapshotData().then(data => {
            if (data) {
                setSnapshotData(data);
            }
        });
    }, []);

    return (
        <div className={styles.snap__info__container}>
            <div className={styles.latest__snapshot}>
                <h2>Latest snapshot</h2>
                {snapshotData
                    ?
                    <>
                        <div>
                            <h3>NAME: </h3>
                            <p>{`${snapshotData.latest.name}`}</p>
                        </div>

                        <div>
                            <h3>HEIGHT: </h3>
                            <p>{snapshotData.latest.height}</p>
                        </div>
                        <div>
                            <h3>SIZE: </h3>
                            <p>{`${(snapshotData.latest.size / 1000000).toFixed(0)}MB`}</p>
                        </div>
                        <div>
                            <h3>TIME: </h3>
                            <p>{`${Math.floor((currentTime - snapshotData.latest.time * 1000) / (1000 * 60 * 60))} hours ago`}</p>
                        </div>
                        <div>
                            <h3>URL: </h3>
                            <p>{`https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot`}</p>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <h3>NAME: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>

                        <div>
                            <h3>HEIGHT: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>
                        <div>
                            <h3>SIZE: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>

                        </div>
                        <div>
                            <h3>TIME: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>
                        <div>
                            <h3>URL: </h3>
                            <span>{`https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot`}</span>
                        </div>
                    </>
                }
            </div>

            <div className={styles.past__snapshot}>
                <h2>Past snapshot</h2>
                {snapshotData
                    ?
                    <>
                        <div>
                            <h3>NAME: </h3>
                            <p>{`${snapshotData.past.name}`}</p>
                        </div>

                        <div>
                            <h3>HEIGHT: </h3>
                            <p>{snapshotData.past.height}</p>
                        </div>
                        <div>
                            <h3>SIZE: </h3>
                            <p>{`${(snapshotData.past.size / 1000000).toFixed(0)}MB`}</p>
                        </div>
                        <div>
                            <h3>TIME: </h3>
                            <p>{`${Math.floor((currentTime - snapshotData.past.time * 1000) / (1000 * 60 * 60))} hours ago`}</p>
                        </div>
                        <div>
                            <h3>URL: </h3>
                            <p>{`https://download.dteam.tech/${network.name}/${network.type}/past-snapshot`}</p>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <h3>NAME: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>

                        <div>
                            <h3>HEIGHT: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>
                        <div>
                            <h3>SIZE: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>

                        </div>
                        <div>
                            <h3>TIME: </h3>
                            <div className={styles.loading__container}><LoadingBlock width={100}/></div>
                        </div>
                        <div>
                            <h3>URL: </h3>
                            <span>{`https://download.dteam.tech/${network.name}/${network.type}/latest-snapshot`}</span>
                        </div>
                    </>
                }
            </div>

        </div>
    );
};

export default SnapshotInfo;