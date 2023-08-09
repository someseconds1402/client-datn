import { createSlice } from '@reduxjs/toolkit';
import { role } from '../../constant/constant';

const changeRoleSlice = createSlice({
    name: 'Role',
    initialState: {
        role: role.GUEST,
        email: '',
    },
    reducers: {
        logoutAction: state => {
            state.role = role.GUEST;
            state.email = '';
        },
        loginAction: (state, action) => {
            state.role = action.payload.roleId;
            state.email = action.payload.email;
        },
    },
});

export const { logoutAction, loginAction } = changeRoleSlice.actions;
export default changeRoleSlice.reducer;