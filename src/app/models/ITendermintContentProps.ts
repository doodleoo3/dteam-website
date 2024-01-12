import {INetwork} from "@/src/app/models/INetwork";

export interface TendermintContentProps {
    network: INetwork;
    nodeVersion?: string | null;
    chainId?: string | null;
}