import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    userProducts: [],
    favorites: [],
    filteredProducts: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        fetchProducts(state, action){
            state.products = action.payload.productList;
            state.filteredProducts = action.payload.productList;
            state.favorites = action.payload.productList.filter(p => p.category.value === 7);
        },
        fetchUserProducts(state, action){
            state.userProducts = action.payload.userProductList
        },
        addProduct(state, action){
            state.products.push(action.payload.product)
            state.userProducts.push(action.payload.product)
        },
        addFood(state, action){
            state.favorites.push(action.payload.food)
            state.userProducts.push(action.payload.food)
        },
        filterProduct(state, action){
            state.filteredProducts = action.payload.productList;
        }
    }
})

export const productActions = productSlice.actions;
export default productSlice;