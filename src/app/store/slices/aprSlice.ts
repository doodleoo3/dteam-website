import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAprItem} from "@/src/app/models/IApr";
import {fetchTendermintApr} from "@/src/app/store/action-creators/fetchTendermintApr";

interface TendermintAprState {
    tendermintAprArray: IAprItem[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    fetchingNetworks: string[]; // Этот массив должен содержать id сетей, которые в данный момент запрашиваются
}

const initialState: TendermintAprState = {
    tendermintAprArray: [],
    loading: 'idle',
    fetchingNetworks: [],
}

export const TendermintAprSlice = createSlice({
    name: 'tendermint/apr',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTendermintApr.pending, (state, action) => {
            const networkId = action.meta.arg.id.toString();
            if (!state.fetchingNetworks.includes(networkId)) {
                state.loading = 'pending';
                state.fetchingNetworks.push(networkId);
            }
        });
        builder.addCase(fetchTendermintApr.fulfilled, (state, { payload }) => {
            if (payload) {
                state.fetchingNetworks = state.fetchingNetworks.filter(id => id !== payload.id.toString());
                const existingIndex = state.tendermintAprArray.findIndex(item => item.id === payload.id);
                if (existingIndex !== -1) {
                    state.tendermintAprArray[existingIndex] = payload;
                } else {
                    state.tendermintAprArray.push(payload);
                }
            }
            state.loading = 'succeeded';
        });
        builder.addCase(fetchTendermintApr.rejected, (state, action) => {
            const networkId = action.meta.arg.id.toString();
            state.fetchingNetworks = state.fetchingNetworks.filter(id => id !== networkId);
            state.loading = 'failed';
        });
    }
});

export default TendermintAprSlice.reducer;
