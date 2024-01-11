import {createSlice} from "@reduxjs/toolkit";
import {fetchTendermintParams} from "@/src/app/store/action-creators/fetchTendermintParams";
import {TendermintParams} from "@/src/app/models/INetwork";

interface TendermintParamsState {
    tendermintParamsArray: TendermintParams[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: TendermintParamsState = {
    tendermintParamsArray: [],
    loading: 'idle',
}

export const TendermintParamsSlice = createSlice({
    name: 'tendermint/params',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTendermintParams.fulfilled, (state, action) => {
            state.tendermintParamsArray.push(action.payload);
            state.loading = 'succeeded';
        });
        builder.addCase(fetchTendermintParams.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(fetchTendermintParams.rejected, (state, action) => {
            state.loading = 'failed';
        });
    }
});

export default TendermintParamsSlice.reducer