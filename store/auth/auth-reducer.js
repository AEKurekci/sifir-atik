import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    userId: null,
    refreshToken: null,
    didTryAuthLogin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action){
            state.accessToken = action.payload.accessToken
            state.refresToken = action.payload.refreshToken
            state.userId = action.payload.userId
        },
        setDidTry(state, action){
            state.didTryAuthLogin = action.payload.didTry
        }
    }
})

export const authActions = authSlice.actions
export default authSlice;