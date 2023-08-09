import { createSlice } from '@reduxjs/toolkit';

const showLoadingScreenSlice = createSlice({
    name: 'showLoading',
    initialState: {
        value: false,
    },
    reducers: {
        enebleLoadingScreen: (state) => {
            state.value = true;
        },
        disableLoadingScreen: (state) => {
            state.value = false;
        },
    },
});

export const { enebleLoadingScreen, disableLoadingScreen } = showLoadingScreenSlice.actions;
export default showLoadingScreenSlice.reducer;