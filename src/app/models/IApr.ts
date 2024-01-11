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

export interface AprItem {
    id: number,
    apr: string
}