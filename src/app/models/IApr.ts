export interface ITokensPool {
    pool: {
        bonded_tokens: number;
    }
}

export interface ITotalSupplyItem {
    amount: number;
    denom: string;
}

export interface ITotalSupply {
    supply: ITotalSupplyItem[];
}

export interface IValidator {
    operator_address: string;
    tokens: number;
    commission: {
        commission_rates: {
            rate: number;
        }
    }
}

export interface IValidatorList {
    validators: IValidator[];
}

export interface IInflation {
    inflation: number;
}

export interface IAprItem {
    id: number,
    apr: string
}

export interface ICantoEpochMintProvisionResponse {
    epoch_mint_provision: {
        denom: string;
        amount: number;
    };
}

export interface IGuruChainApi {
    chainId: string;
    communityPool: number;
    supply: number;
    apr: number;
    inflation: number;
    bondedTokens: number;
    onlineVotingPower: number;
    totalValidators: number;
    activeValidators: number;
}