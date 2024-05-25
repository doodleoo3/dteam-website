import React, {memo} from 'react';
import { useSelector } from 'react-redux';
import styles from "./RpcStatus.module.scss";
import {useTendermintNetworkParams} from "@/src/app/utils/useTendermintNetworkParams";
import {RootState} from "@/src/app/store/store";

interface IStatus {
    name: string;
    type: string;
}

const RpcStatus: React.FC<IStatus> = ({ name, type }) => {
    const networkParams = useTendermintNetworkParams(name, type);
    const mainnetNetworks = useSelector((state: RootState) => state.networks.mainnetNetworks);
    const testnetNetworks = useSelector((state: RootState) => state.networks.testnetNetworks);

    if ((mainnetNetworks.loading || testnetNetworks.loading || !networkParams?.rpc_status) && (!mainnetNetworks.error || !testnetNetworks.error)) {
        return (
            <div className={styles.rpc__status}>
                Rpc status:<span className={styles.loading}>loading...</span>
            </div>
        );
    }

    if (mainnetNetworks.error || testnetNetworks.error) {
        return (
            <div className={styles.rpc__status}>
                Rpc status:<span className={styles.not__available}>not available</span>
            </div>
        );
    }

    return (
        <div className={styles.rpc__status}>
            {networkParams?.rpc_status === "not available"
                ? <>Rpc status:<span className={styles.not__available}>{networkParams?.rpc_status}</span></>
                : <>Rpc status:<span className={styles.active}>{networkParams?.rpc_status}</span></>
            }
        </div>
    );
};

export default RpcStatus;