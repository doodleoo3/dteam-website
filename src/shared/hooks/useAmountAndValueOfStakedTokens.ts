import {INetwork} from "@/src/app/models/INetwork";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

interface IGuruValidatorInfo {
    rank: number;
    operatorAddress: string;
    jailed: boolean;
    bondStatus: string;
    uptime: number;
    commission: number;
    moniker: string;
    votingPowerPercent: number;
    avatar: string;
    tokens: number;
    cumulativeShare: number;
}

interface IValidatorsResponse {
    validators: IValidatorInfo[];
}

interface IValidatorInfo {
    operator_address: string;
    tokens: number;
}



export function useAmountAndValueOfStakedTokens(network: INetwork) {
    const [amountOfTokens, setAmountOfTokens] = useState<number | null>(null);
    const [valueOfStakedTokens, setValueOfStakedTokens] = useState<null | "not implemented"| number>(null)

    async function getValueOfStakedTokens() {
        try {
            let priceResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${network.other.cg_ticker}&vs_currencies=usd`)
            let keys = Object.keys(priceResponse.data)

            if (amountOfTokens === 0) {
                setValueOfStakedTokens("not implemented")
            } else {
                setValueOfStakedTokens((Math.ceil(priceResponse.data[keys[0]].usd * Number(amountOfTokens))))
            }
        } catch (e) {
            setValueOfStakedTokens("not implemented")
        }
    }

    const guruProcessResponse = useCallback((response: IGuruValidatorInfo[]) => {
        const denomExponent = network.other.denom_exponent;

        response.forEach((validator) => {
            if (validator.operatorAddress === network.other.valoper_address) {
                setAmountOfTokens(validator.tokens / 10 ** denomExponent);
            }
        });
    }, [network.other.denom_exponent, network.other.valoper_address]);

    const processResponse = useCallback((response: IValidatorsResponse) => {
        const validatorList = response.validators;
        const denomExponent = network.other.denom_exponent;

        validatorList.forEach((validator) => {
            if (validator.operator_address === network.other.valoper_address) {
                setAmountOfTokens(validator.tokens / 10 ** denomExponent);
            }
        });
    }, [network.other.denom_exponent, network.other.valoper_address]);

    const fetchValidatorsData = async () => {
        try {
            let guruValidatorsResponse = await axios.get<IGuruValidatorInfo[]>(`https://${network.name}.api.explorers.guru/api/v1/validators`);
            guruProcessResponse(guruValidatorsResponse.data);
        } catch (error) {
            try {
                let validatorsResponse = await axios.get<IValidatorsResponse>(`https://api.${network.name}.${network.type}.dteam.tech/cosmos/staking/v1beta1/validators`);
                processResponse(validatorsResponse.data);
            } catch (error) {
                setAmountOfTokens(0);
            }
        }
    };

    useEffect(() => {
        fetchValidatorsData()
    }, [network]);

    useEffect(() => {
        if (amountOfTokens && amountOfTokens !== 0) {
            getValueOfStakedTokens()
        }
    }, [amountOfTokens]);

    return {
        amount: amountOfTokens,
        value: valueOfStakedTokens
    };
}