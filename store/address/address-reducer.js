import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cities: []
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        fetchAddress(state, action){
            state.cities = action.payload.cities
        }
    }
})

export const addressActions = addressSlice.actions;
export default addressSlice;