// react context
import Cookies from 'js-cookie'
import { createContext , useReducer ,useContext } from "react";

export const Store = createContext();
const initialState = {
    darkMode :false,
    cart : {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
    }
}

function reducer(state, action){
    switch(action.type){
        case 'CART_ADD_PRODUCT':{
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(item => item._id === newItem._id)
            const cartItems = existingItem ? 
                            state.cart.cartItems.map((item) => item.name === existingItem.name ? newItem: item) 
                            : [...state.cart.cartItems , newItem]
            Cookies.set('cartItems' , JSON.stringify(cartItems))
            return {...state, cart : {...state.cart , cartItems}}
        }
    }
}

export function StoreProvider(props){
    const [state , dispatch] = useReducer(reducer , initialState)
    const value ={state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}