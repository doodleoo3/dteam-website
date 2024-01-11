import {IServices} from "@/src/app/models/IServices";

export interface IChainId {
    result: {
        peers: [ { node_info: { network: string } } ]
    }

}

export interface INodeVersion {
    result: {
        response: {
            version: string
        }
    }
}

export interface TendermintParams {
    id: number,
    chainId: string,
    nodeVersion: string
}

export enum NetworkType {
    mainnet = 'mainnet',
    testnet = 'testnet'
}

export interface ILinks {
    delegate: string;
    website: string;
    inflation: string;
}

export interface IOther {
    binary_name: string;

    main_dir: string; //example: canto
    working_dir: string; //example: cantod

    valoper_address: string;

    denom: string;
    denom_exponent: number;

    ticker: string;
    cg_ticker: string;
}

export interface INetwork {
    id: number;
    name: string;
    type: string;
    description: string;

    is_tendermint_chain: boolean;

    links: ILinks;
    services: IServices;
    other: IOther;
}