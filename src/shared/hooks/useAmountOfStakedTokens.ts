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
export function useAmountOfStakedTokens(network: INetwork) {
    const [amountOfTokens, setAmountOfTokens] = useState<number | null>(null);

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

    useEffect(() => {
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

        fetchValidatorsData().then(async () => {
            try {

            } catch (e) {
                console.log(e)
            }
        })
    }, [network, guruProcessResponse, processResponse]);

    return amountOfTokens;
}