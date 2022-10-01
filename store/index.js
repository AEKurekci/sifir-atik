import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/product-reducer";
import userReducer from "./user/user-reducer";

const store = configureStore({
    reducer: {
        products: productReducer.reducer,
        users: userReducer.reducer
    }
})

export default store;