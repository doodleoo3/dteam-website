import {IServices} from "@/src/app/models/IServices";

// export interface IChainId {
//     result: {
//         peers: [ { node_info: { network: string } } ]
//     }
//
// }

// export interface INodeVersion {
//     result: {
//         response: {
//             version: string
//         }
//     }
// }

// export interface TendermintParams {
//     id: number,
//     chainId: string,
//     nodeVersion: string
// }

interface IBCItem {
    name: string;
    wallet_link: string;
}

export enum NetworkType {
    mainnet = 'mainnet',
    testnet = 'testnet'
}

export interface ILinks {
    delegate?: string;
    inflation?: string;

    binary_download: string;
    git_network_repo: string;

    explorer: string;
    website: string;
    github: string;
    twitter: string;
    discord: string;
}

export interface ITx {
    gas: string;
    gas_adjustment: number;
    gas_prices: number;
}

export interface IOther {
    binary_name: string;
    main_dir: string; //example: canto
    working_dir: string; //example: cantod
    valoper_address?: string;
    min_gas_price: number;

    denom: string;
    denom_exponent: number;

    ticker?: string;
    cg_ticker?: string;

    peer?: string
    seed?: string

    grpc_port?: string

    version?: string //hardcoded node version

    ibc?: IBCItem[];
    ibc_wallet?: string;

    pruning: boolean;
}

export interface INetwork {
    id: number;
    name: string;
    type: string;
    description: string;
    is_tendermint_chain: boolean;
    need_build_binary: boolean;
    links: ILinks;
    services: IServices;
    tx: ITx;
    other: IOther;
}