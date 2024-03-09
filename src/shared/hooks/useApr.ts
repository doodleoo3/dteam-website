import {useAppDispatch, useAppSelector} from "../../app/store/hooks";
import {useEffect, useState} from "react";
import {INetwork, NetworkType} from "../../app/models/INetwork";
import {fetchTendermintApr} from "@/src/app/store/action-creators/fetchTendermintApr";

export function useApr(network: INetwork) {
    const dispatch = useAppDispatch();
    const aprArray = useAppSelector(state => state.apr.tendermintAprArray);
    const loading = useAppSelector(state => state.apr.loading);

    const apr = aprArray.find(item => item.id === network.id)?.apr || null;

    useEffect(() => {
        if (network.type === NetworkType.mainnet) {
            dispatch(fetchTendermintApr(network));
        }
    }, [network, dispatch, loading]);

    return apr;
}