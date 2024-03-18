import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    userId: null,
    refresToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action){
            state.accessToken = action.payload.accessToken
            state.refresToken = action.payload.refreshToken
        }
    }
})

export const authActions = authSlice.actions
export default authSlice;