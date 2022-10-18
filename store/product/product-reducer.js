import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    userProducts: [],
    foods: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        fetchProducts(state, action){
            state.products = action.payload.productList.filter(p => !p.forAnimals);
            state.foods = action.payload.productList.filter(p => p.forAnimals);
        },
        fetchUserProducts(state, action){
            state.userProducts = action.payload.userProductList
        },
        addProduct(state, action){
            state.products.push(action.payload.product)
            state.userProducts.push(action.payload.product)
        },
        addFood(state, action){
            state.foods.push(action.payload.food)
            state.userProducts.push(action.payload.food)
        }
    }
})

export const productActions = productSlice.actions;
export default productSlice;