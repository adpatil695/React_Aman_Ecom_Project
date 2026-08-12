import { createSlice } from "@reduxjs/toolkit";
const initialState={cartItem:[]}
const cartSlice=createSlice(
    {name:'CartItem' ,
        initialState,
      reducers:{
        addCartItem:(state,action)=>{
            state.cartItem.push(action.payload)
        },
          removeCartItem: (state, action) => {
              state.cartItem =state.cartItem.filter((item)=>item.id!==action.payload)
          },
          
        
      }
    })

export  const {addCartItem,removeCartItem}=cartSlice.actions

    export default cartSlice.reducer