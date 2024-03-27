import {useCallback, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { INetwork } from "../../app/models/INetwork";
import { fetchTendermintApr } from "@/src/app/store/action-creators/fetchTendermintApr";

export function useApr(network: INetwork) {
    const dispatch = useAppDispatch();

    const aprArray = useAppSelector((state) => state.apr.tendermintAprArray);
    const apr = aprArray.find((item) => item.id === network.id)?.apr || null;

    const dispatchFetchTendermintApr = useCallback(() => {
        if (apr === null && network.type === "mainnet") {
            dispatch(fetchTendermintApr(network));
        }
    }, [network, dispatch]);

    useEffect(() => {
        dispatchFetchTendermintApr();
    }, [dispatchFetchTendermintApr]);

    return apr;
}