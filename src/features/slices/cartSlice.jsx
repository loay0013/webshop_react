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
            // Da vi ikke længere bruger size og color, fjernes de fra sammenligningen
            const existingProductIndex = state.cart.findIndex(
                (product) => product.id === newProduct.id
            );

            if (existingProductIndex >= 0) {
                const existingProduct = state.cart[existingProductIndex];
                existingProduct.amount += 1;
                // Antag at newProduct.price allerede er sat som standardpris eller beregnet andetsteds
                existingProduct.totalPrice += newProduct.price;
            } else {
                // Tilføj et nyt produkt med en antagelse om, at price er defineret i payload
                state.cart.push({ ...newProduct, amount: 1, totalPrice: newProduct.price });
            }

            state.totalAmount += 1;
            state.totalPrice += newProduct.price;
        },
        removeFromCart(state, action) {
            const { id } = action.payload;
            // Fjern size og color fra søgningen, da de ikke længere er relevante
            const existingProductIndex = state.cart.findIndex(
                (product) => product.id === id
            );

            if (existingProductIndex >= 0) {
                const existingProduct = state.cart[existingProductIndex];
                state.totalAmount -= existingProduct.amount;
                state.totalPrice -= existingProduct.totalPrice;
                state.cart.splice(existingProductIndex, 1);
            }
        },
        updateCartItemQuantity(state, action) {
            const { id, amount } = action.payload;
            // Fjern size og color fra opdateringen
            const product = state.cart.find(
                (product) => product.id === id
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
