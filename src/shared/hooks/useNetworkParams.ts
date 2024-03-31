import {INetwork, TendermintParams} from "../../app/models/INetwork";
import {useAppSelector} from "../../app/store/hooks";
import {useEffect, useState} from "react";


export function useNetworkParams(network: INetwork | null) {
    const {tendermintParamsArray} = useAppSelector(state => state.params);
    const [params, setParams] = useState<{chainId : string, nodeVersion: string}>({chainId: "", nodeVersion: ""})

    const getParamsById = (ParamsArray: TendermintParams[], id: number)  => {
        const item: TendermintParams | undefined = ParamsArray.find(item  => item.id === id);

        if (!item) {
            throw new Error("Error receiving network params");
        }

        return {
            chainId: item.chainId,
            nodeVersion: item.nodeVersion
        };
    }

    useEffect(() => {
        if (tendermintParamsArray.length > 0) {
            tendermintParamsArray.map(params => {
                if (params.id === network?.id) {
                    setParams(getParamsById(tendermintParamsArray, network.id));
                }
            })
        }
    }, [tendermintParamsArray, network]);

    if (network?.name === "namada") {
        return {
            chainId: params?.chainId,
            nodeVersion: network?.other.version
        }
    }

    if (params?.chainId === "canto_7700-1") {
        return {
            chainId: params?.chainId,
            nodeVersion: "7.0.0"
        }
    }

    if (params?.chainId === "self-dev-1") {
        return {
            chainId: params?.chainId,
            nodeVersion: "not implemented"
        }
    }

    return {
        chainId: params?.chainId,
        nodeVersion: params?.nodeVersion?.startsWith("v") ? params?.nodeVersion.slice(1) : params?.nodeVersion
    }
}