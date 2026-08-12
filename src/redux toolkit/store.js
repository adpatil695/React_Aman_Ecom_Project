import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'
const store = configureStore({reducer:{cartData:cartReducer}})

export default store