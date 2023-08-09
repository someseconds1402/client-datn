import { createSlice } from '@reduxjs/toolkit';

const epidemicDataAnalyseSlice = createSlice({
    name: 'EpidemicDataAnalyse',
    initialState: {
        data: [{
            province_id: 0,
            province_name: '',
            population: 0,
            population_density: 0,
            level: 0,
            infection_new: 0,
            infection_total: 0,
            infection_average: 0,
            recovered_new: 0,
            recovered_total: 0,
            recovered_average: 0,
            death_new: 0,
            death_total: 0,
            death_average: 0,
        }],
    },
    reducers: {
        changeEpidemicDataAnalyse: (state, action) => {
            state.data = action.payload.data;
        },
        changeLevel: (state, action) => {
            state.data.forEach(e => {
                if (e.province_id == action.payload.province_id) {
                    e.level = action.payload.level;
                }
            })
        },
        sortWithLevel: (state) => {
            state.data.sort((a, b) => a.level - b.level);
        },
        resetAllLevel: (state) => {
            state.data.forEach(e => {
                e.level = 0;
            })
        }
    },
});

export const { changeEpidemicDataAnalyse, changeLevel, sortWithLevel, resetAllLevel } = epidemicDataAnalyseSlice.actions;
export default epidemicDataAnalyseSlice.reducer;