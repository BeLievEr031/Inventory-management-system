import { configureStore } from "@reduxjs/toolkit";
import receiptReducer from "./receiptSlice";
import cartReducer from "./cartSlice";
import metadataReducer from "./metadataSlice";

export const store = configureStore({
    reducer: {
        receipts: receiptReducer,
        cart: cartReducer,
        metadata: metadataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
