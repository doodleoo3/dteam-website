export enum MainnetServices {
    overview = 'overview',
    installation_guide = 'installation-guide',
    snapshot = 'snapshot',
    state_sync = 'state-sync',
    endpoints = 'endpoints',
    addrbook = 'addrbook',
    genesis = 'genesis',
    ibc = 'ibc',
    peers = 'peers',
    seeds = 'seeds',
    useful_commands = 'useful-commands'
}

export enum TestnetServices {
    overview = 'overview',
    installation_guide = 'installation-guide',
    snapshot = 'snapshot',
    state_sync = 'state-sync',
    endpoints = 'endpoints',
    addrbook = 'addrbook',
    genesis = 'genesis',
    peers = 'peers',
    seeds = 'seeds',
    useful_commands = 'useful-commands'
}

export interface IServices {
    "overview": boolean,
    "installation-guide": boolean,
    "snapshot": boolean,
    "state-sync": boolean,
    "endpoints": {
        "api": boolean,
        "rpc": boolean,
        "grpc": boolean,
        "json_rpc": boolean
    },
    "addrbook": boolean,
    "genesis": boolean,
    "ibc": boolean,
    "peers": boolean,
    "seeds": boolean,
    "useful-commands": boolean
}