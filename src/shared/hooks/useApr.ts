import {useAppDispatch, useAppSelector} from "../../app/store/hooks";
import {useEffect, useState} from "react";
import {INetwork, NetworkType} from "../../app/models/INetwork";
import {AprItem} from "@/src/app/models/IApr";
import {fetchTendermintApr} from "@/src/app/store/action-creators/fetchTendermintApr";

export function useApr(network: INetwork) {
    const dispatch = useAppDispatch();
    const {tendermintAprArray} = useAppSelector(state => state.apr);
    const [apr, setApr] = useState<string | null>(null);

    const getAprById = (APRArray : AprItem[], id : number)  => {
        const item: AprItem | undefined = APRArray.find(item  => item.id === id);
        return item ? item.apr : null;
    }

    useEffect(() => {
        if (network.type === NetworkType.mainnet) {
            if (tendermintAprArray.length === 0) {
                dispatch(fetchTendermintApr(network))
            }
            setApr(getAprById(tendermintAprArray, network.id))
        }
    }, [network, tendermintAprArray,  dispatch]);

    return apr
}