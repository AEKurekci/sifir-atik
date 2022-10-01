import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        fetchProducts(state, action){
            state.products = action.payload.productList;
        },
        addProduct(state, action){
            state.products.push(action.payload.product)
        }
    }
})

export const productActions = productSlice.actions;
export default productSlice;