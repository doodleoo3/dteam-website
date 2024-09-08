import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NetworkAPI {
    id: number;
    apr: string;
    chain_id: string;
    last_time_updated: string;
    name: string;
    rpc_status: string;
    validator_status: string;
    staked_tokens: number;
    staked_value: string;
    type: string;
    version: string;
    peers: string;
}

interface NetworksState {
    data: NetworkAPI[];
    loading: boolean;
    error: string | null;
}

interface RootState {
    networks: {
        mainnetNetworks: NetworksState;
        testnetNetworks: NetworksState;
    };
}


const initialState: NetworksState = {
    data: [],
    loading: false,
    error: null,
};


export const fetchMainnetNetworks = createAsyncThunk<NetworkAPI[], void, { rejectValue: string }>(
    'networks/fetchMainnetNetworks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<NetworkAPI[]>('https://api.dteam.tech/api/mainnets');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTestnetNetworks = createAsyncThunk<NetworkAPI[], void, { rejectValue: string }>(
    'networks/fetchTestnetNetworks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<NetworkAPI[]>('https://api.dteam.tech/api/testnets');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const tendermintNetworksInfoSlice = createSlice({
    name: 'networks',
    initialState: {
        mainnetNetworks: initialState,
        testnetNetworks: initialState,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMainnetNetworks.pending, (state) => {
                state.mainnetNetworks.loading = true;
                state.mainnetNetworks.error = null;
            })
            .addCase(fetchMainnetNetworks.fulfilled, (state, action: PayloadAction<NetworkAPI[]>) => {
                state.mainnetNetworks.loading = false;
                state.mainnetNetworks.data = action.payload.map(({...rest }) => rest);
            })
            .addCase(fetchMainnetNetworks.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.mainnetNetworks.loading = false;
                state.mainnetNetworks.error = action.payload || 'Failed to fetch mainnet networks';
            })

            .addCase(fetchTestnetNetworks.pending, (state) => {
                state.testnetNetworks.loading = true;
                state.testnetNetworks.error = null;
            })
            .addCase(fetchTestnetNetworks.fulfilled, (state, action: PayloadAction<NetworkAPI[]>) => {
                state.testnetNetworks.loading = false;
                state.testnetNetworks.data = action.payload.map(({...rest }) => rest);
            })
            .addCase(fetchTestnetNetworks.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.testnetNetworks.loading = false;
                state.testnetNetworks.error = action.payload || 'Failed to fetch testnet networks';
            });
    },
});

export const selectNetworkByNameAndType = (state: NetworksState, name: string, type: string): NetworkAPI | undefined => {
    if (!state.data) {
        return undefined;
    }
    return state.data.find(network => network.name === name && network.type === type);
};


export default tendermintNetworksInfoSlice.reducer;