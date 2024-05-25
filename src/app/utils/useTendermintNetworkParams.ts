import {RootState} from '@/src/app/store/store';
import {selectNetworkByNameAndType} from "@/src/app/store/slices/tendermintNetworksInfoSlice";
import {useSelector} from "react-redux";
import {NetworkType} from "@/src/app/models/INetwork";

interface NetworkParams {
    apr: string;
    chain_id: string;
    last_time_updated: string;
    staked_tokens: number;
    staked_value: string;
    version: string;
    rpc_status: string;
    peers: string;
}

export const useTendermintNetworkParams = (name: string, type: string): NetworkParams | undefined => {
    const networkState = useSelector((state: RootState) => type === NetworkType.mainnet ? state.networks.mainnetNetworks : state.networks.testnetNetworks);
    const network = selectNetworkByNameAndType(networkState, name, type);

    if (!network) return undefined;

    const { apr, chain_id, last_time_updated, staked_tokens, staked_value, version, rpc_status, peers } = network;

    return { apr, chain_id, last_time_updated, staked_tokens, staked_value, version, rpc_status, peers };
};

