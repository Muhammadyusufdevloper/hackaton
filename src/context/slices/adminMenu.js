import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: localStorage.getItem("admin-menu") || true,
}

const adminMenuSlice = createSlice({
    name: 'admin-menu',
    initialState,
    reducers: {
        toggleAdminMenu: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("admin-menu", action.payload);
        }
    },
});

export const { toggleAdminMenu } = adminMenuSlice.actions;
export default adminMenuSlice.reducer;