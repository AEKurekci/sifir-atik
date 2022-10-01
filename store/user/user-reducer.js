import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        fetchUsers(state, action){
            state.users = action.payload.users
        }
    }
})

export const userActions = userSlice.actions
export default userSlice;