import { createSlice } from '@reduxjs/toolkit';

export const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState: {
        isOpen: false,
    },

    reducers: {
        toggle: state => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggle } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
