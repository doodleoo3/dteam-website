import { configureStore } from '@reduxjs/toolkit'
import mobileMenuReducer from './slices/mobileMenuSlice';
import tendermintNetworksInfoSlice from "@/src/app/store/slices/tendermintNetworksInfoSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            mobileMenu: mobileMenuReducer,
            networks: tendermintNetworksInfoSlice,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']