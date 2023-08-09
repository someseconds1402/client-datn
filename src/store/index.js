import { configureStore } from '@reduxjs/toolkit';
import changeRoleReducer from './reducer/changeRoleSlice';
import selectEpidemicSlice from './reducer/selectEpidemicSlice';
import changeEpidemicDataSlice from './reducer/changeEpidemicDataSlice';
import getPandemicDataSlice from './reducer/getPandemicDataSlice';
import epidemicDataAnalyseSlice from './reducer/epidemicDataAnalyseSlice';
import supplyDataAnalyseSlice from './reducer/supplyDataAnalyseSlice';
import showLoadingScreenSlice from './reducer/showLoadingScreenSlice';

const store = configureStore({
    reducer: {
        changeRole: changeRoleReducer,
        selectEpidemic: selectEpidemicSlice,
        changeEpidemicData: changeEpidemicDataSlice,
        getPandemicData: getPandemicDataSlice,
        epidemicDataAnalyse: epidemicDataAnalyseSlice,
        supplyDataAnalyse: supplyDataAnalyseSlice,
        showLoadingScreen: showLoadingScreenSlice,
    },
});

export default store;