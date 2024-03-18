import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        fetchUsers(state, action){
            state.users = action.payload.users
        },
        login(state, action){
            state.user = action.payload.user
        },
        setUser(state, action){
            state.user = action.payload.user
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;