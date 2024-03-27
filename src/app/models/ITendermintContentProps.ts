import {INetwork} from "@/src/app/models/INetwork";

export interface TendermintContentProps {
    network: INetwork;
    nodeVersion?: string | null;
    chainId?: string | null;
    peers?: string | null;
}

export interface OverviewContentProps {
    network: INetwork;
    nodeVersion?: string | null;
    chainId?: string | null;
    peers?: string | null;
    valueOfStakedTokens: number | "not implemented" | null;
    amountOfTokens: number | null;
    apr?: string | null
}