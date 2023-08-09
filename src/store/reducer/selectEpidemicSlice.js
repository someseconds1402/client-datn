import { createSlice } from '@reduxjs/toolkit';
import { role } from '../../constant/constant';

const selectEpidemicSlice = createSlice({
    name: 'epidemic',
    initialState: {
        id: -1,
        name: '',
    },
    reducers: {
        changeEpidemic: (state, action) => {
            state.role = action.payload.id;
            state.email = action.payload.name;
        },
    },
});

export const { changeEpidemic } = selectEpidemicSlice.actions;
export default selectEpidemicSlice.reducer;