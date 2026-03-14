import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";

interface CartState {
    items: CartItem[];
    taxRate: number;
}

const initialState: CartState = {
    items: [],
    taxRate: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter((i) => i.id !== action.payload.id);
                }
            }
        },
        clearCart(state) {
            state.items = [];
        },
        setTaxRate(state, action: PayloadAction<number>) {
            state.taxRate = action.payload;
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart, setTaxRate } =
    cartSlice.actions;
export default cartSlice.reducer;
