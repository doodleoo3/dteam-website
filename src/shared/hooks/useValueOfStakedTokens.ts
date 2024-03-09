import {INetwork} from "@/src/app/models/INetwork";
import axios from "axios";
import {useEffect, useState} from "react";

export async function useValueOfStakedTokens(network: INetwork, tokensAmount: number) {
    const [valueOfTokens, setValueOfTokens] = useState<number | null>(null);

    useEffect(() => {

    }, []);

    return valueOfTokens
}