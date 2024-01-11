import {INetwork, NetworkType, TendermintParams} from "../../app/models/INetwork";
import {useAppDispatch, useAppSelector} from "../../app/store/hooks";
import {useEffect, useState} from "react";
import {fetchTendermintParams} from "@/src/app/store/action-creators/fetchTendermintParams";


export function useNetworkParams(network: INetwork | null) {
    const dispatch = useAppDispatch();
    const {tendermintParamsArray} = useAppSelector(state => state.params);
    const [params, setParams] = useState<{chainId : string | null, nodeVersion: string | null} | null>({chainId: null, nodeVersion: null})

    const getParamsById = (ParamsArray : TendermintParams[], id : number)  => {
        const item : TendermintParams | undefined = ParamsArray.find(item  => item.id === id);

        return item ? {
            chainId: item.chainId,
            nodeVersion: item.nodeVersion
        } : {
            chainId: null,
            nodeVersion: null
        };
    }

    useEffect(() => {
        if (network !== null) {
            if (network.type === NetworkType.mainnet) {
                if (tendermintParamsArray.length === 0) {
                    dispatch(fetchTendermintParams(network))
                }
                setParams(getParamsById(tendermintParamsArray, network.id))
            }
        }
    }, [network, tendermintParamsArray,  dispatch]);

    if (network === null) {
        return {
            chainId: null,
            nodeVersion: null
        }
    }

    return {
        chainId: params?.chainId ? params.chainId : null,
        nodeVersion: params?.nodeVersion ? params.nodeVersion : null
    }
}