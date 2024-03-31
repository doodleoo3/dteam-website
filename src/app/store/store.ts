import { configureStore } from '@reduxjs/toolkit'
import tendermintAprReducer from "./slices/aprSlice"
import tendermintParamsReducer from "./slices/tendermintParamsSlice";
import mobileMenuReducer from './slices/mobileMenuSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            mobileMenu: mobileMenuReducer,
            apr: tendermintAprReducer,
            params: tendermintParamsReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']