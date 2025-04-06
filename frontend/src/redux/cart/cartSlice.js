import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item: { _id, name, price, quantity, ... }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },


    removeFromCart(state, action) {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item._id !== idToRemove);
    },

    increaseQuantity: (state, action) => {
        const item = state.items.find((item) => item._id === action.payload);
        if (item) item.quantity += 1;
      },
      
      decreaseQuantity: (state, action) => {
        const item = state.items.find((item) => item._id === action.payload);
        if (item && item.quantity > 1) item.quantity -= 1;
      },
           

    clearCart(state) {
      state.items = [];
    },
  },
});

// Selectors
export const selectCartItems = state => state.cart.items;

export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartCount = state =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
