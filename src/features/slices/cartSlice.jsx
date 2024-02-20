import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newProduct = action.payload;
      const existingProductIndex = state.cart.findIndex(
          (product) => product.id === newProduct.id && product.size === newProduct.size && product.color === newProduct.color
      );

      if (existingProductIndex >= 0) {
        const existingProduct = state.cart[existingProductIndex];
        existingProduct.amount += 1;
        existingProduct.totalPrice += newProduct.price;
      } else {
        state.cart.push({ ...newProduct, amount: 1, totalPrice: newProduct.price });
      }

      state.totalAmount += 1;
      state.totalPrice += newProduct.price;
    },
    removeFromCart(state, action) {
      const { id, size, color } = action.payload;
      const existingProductIndex = state.cart.findIndex(
          (product) => product.id === id && product.size === size && product.color === color
      );

      if (existingProductIndex >= 0) {
        const existingProduct = state.cart[existingProductIndex];
        state.totalAmount -= existingProduct.amount;
        state.totalPrice -= existingProduct.totalPrice;
        state.cart.splice(existingProductIndex, 1);
      }
    },
    updateCartItemQuantity(state, action) {
      const { id, size, color, amount } = action.payload;
      const product = state.cart.find(
          (product) => product.id === id && product.size === size && product.color === color
      );

      if (product) {
        state.totalAmount += (amount - product.amount);
        state.totalPrice += (amount - product.amount) * product.price;
        product.amount = amount;
        product.totalPrice = product.price * amount;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
