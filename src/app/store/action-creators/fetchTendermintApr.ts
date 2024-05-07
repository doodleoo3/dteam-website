import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {
    ICantoEpochMintProvisionResponse, IGuruChainApi,
    IInflation,
    ITokensPool,
    ITotalSupply,
    ITotalSupplyItem,
    IValidatorList
} from "@/src/app/models/IApr";
import {INetwork} from "@/src/app/models/INetwork";
import { RootState } from "../store";

export const fetchTendermintApr = createAsyncThunk(
    'networks/fetchTendermintAPR',
    async (network: INetwork, {getState}) => {

        const state = (getState() as RootState);
        const currentApr = state.apr.tendermintAprArray.find((item) => item.id === network.id)?.apr;
        if (currentApr != null) {
            console.log(`APR already fetched for network: ${network.id}`);
            return;
        }

        try {
            if (!network.links.inflation) {
                return {
                    id: network.id,
                    apr: "0.00%"
                };
            }

            const tokensPoolResponse = await axios.get<ITokensPool>(`https://api.${network.name}.mainnet.dteam.tech/cosmos/staking/v1beta1/pool`);
            const bondedTokens = tokensPoolResponse.data.pool.bonded_tokens;

            let apr = 0;

            if (network.name === "canto") {
                const inflationResponse = await axios.get<ICantoEpochMintProvisionResponse>(network.links.inflation);
                const cantoEpochMintProvision = inflationResponse.data.epoch_mint_provision.amount;
                apr = ((cantoEpochMintProvision * 365) / bondedTokens) * 100;
            } else if (network.name === "haqq" || network.name === "quicksilver") {
                const inflationResponse = await axios.get<IGuruChainApi>(network.links.inflation);
                apr = inflationResponse.data.apr * 100;
            } else {
                const [inflationResponse, totalSupplyResponse, validatorsListResponse] = await Promise.all([
                    axios.get<IInflation>(network.links.inflation),
                    axios.get<ITotalSupply>(`https://api.${network.name}.mainnet.dteam.tech/cosmos/bank/v1beta1/supply`),
                    axios.get<IValidatorList>(`https://api.${network.name}.mainnet.dteam.tech/cosmos/staking/v1beta1/validators`)
                ]);

                const inflation = inflationResponse.data.inflation;
                const totalSupplyNativeTokens = totalSupplyResponse.data.supply
                    .find((item: ITotalSupplyItem) => item.denom === network.other.denom)?.amount || 0;
                const validatorCommission = validatorsListResponse.data.validators
                    .find(validator => validator.operator_address === network.other.valoper_address)?.commission.commission_rates.rate || 0;

                apr = inflation * ((totalSupplyNativeTokens) / bondedTokens) * (1 - (validatorCommission)) * 100;
            }

            return {
                id: network.id,
                apr: apr.toFixed(2) + "%"
            };

        } catch (error) {
            return {
                id: network.id,
                apr: "Not available"
            };
        }
    }
);