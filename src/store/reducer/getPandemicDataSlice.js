import { createSlice } from '@reduxjs/toolkit';

const getPandemicDataSlice = createSlice({
    name: 'epidemic',
    initialState: {
        data: {},
    },
    reducers: {
        changePandemicData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { changePandemicData } = getPandemicDataSlice.actions;
export default getPandemicDataSlice.reducer;