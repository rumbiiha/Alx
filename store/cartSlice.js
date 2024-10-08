import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i._id === id);

            if (item) {
                item.quantity = quantity;
                // Optionally remove the item if quantity is zero
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i._id !== id);
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
