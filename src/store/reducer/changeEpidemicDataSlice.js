import { createSlice } from '@reduxjs/toolkit';

const changeEpidemicDataSlice = createSlice({
    name: 'EpidemicData',
    initialState: {
        data: {
            "Lây nhiễm": [{
                date: '',
                quantity_in_today: 0,
                total_quantity: 0,
            }],
            "Hồi phục": [{
                date: '',
                quantity_in_today: 0,
                total_quantity: 0,
            }],
            "Tử vong": [{
                date: '',
                quantity_in_today: 0,
                total_quantity: 0,
            }],
            "Cấp độ dịch": [{
                date: '',
                quantity_in_today: 0,
                total_quantity: 0,
            }],
        },
        option: [true, false, false, false],
    },
    reducers: {
        changeEpidemicData: (state, action) => {
            state.data = action.payload.data;
        },
        changeEpidemicOption: (state, action) => {
            const order = action.payload.order;
            state.option[order] = !state.option[order];
        }
    },
});

export const { changeEpidemicData, changeEpidemicOption } = changeEpidemicDataSlice.actions;
export default changeEpidemicDataSlice.reducer;