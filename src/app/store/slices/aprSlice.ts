import {createSlice} from "@reduxjs/toolkit";
import {AprItem} from "@/src/app/models/IApr";
import {fetchTendermintApr} from "@/src/app/store/action-creators/fetchTendermintApr";

interface TendermintAprState {
    tendermintAprArray: AprItem[] ;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: TendermintAprState= {
    tendermintAprArray: [],
    loading: 'idle',
}

export const TendermintAprSlice = createSlice({
    name: 'tendermint/apr',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTendermintApr.fulfilled, (state, action) => {
            state.tendermintAprArray.push(action.payload);
            state.loading = 'succeeded';
        });
        builder.addCase(fetchTendermintApr.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(fetchTendermintApr.rejected, (state, action) => {
            state.loading = 'failed';
        });
    }
})

export default TendermintAprSlice.reducer