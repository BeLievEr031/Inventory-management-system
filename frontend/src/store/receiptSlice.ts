import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Receipt, ApiResponse } from "@/types";

interface ReceiptState {
    list: Receipt[];
    currentReceipt: Receipt | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReceiptState = {
    list: [],
    currentReceipt: null,
    loading: false,
    error: null,
};

export const fetchReceipts = createAsyncThunk(
    "receipts/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<ApiResponse<Receipt[]>>("/receipts");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch receipts");
        }
    }
);

export const fetchReceiptById = createAsyncThunk(
    "receipts/fetchById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.get<ApiResponse<Receipt>>(`/receipts/${id}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch receipt details");
        }
    }
);

export const createReceipt = createAsyncThunk(
    "receipts/create",
    async (receiptData: any, { rejectWithValue }) => {
        try {
            const response = await api.post<ApiResponse<Receipt>>("/receipts", receiptData);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create receipt");
        }
    }
);

export const validateReceipt = createAsyncThunk(
    "receipts/validate",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.post<ApiResponse<Receipt>>(`/receipts/${id}/validate`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to validate receipt");
        }
    }
);

const receiptSlice = createSlice({
    name: "receipts",
    initialState,
    reducers: {
        clearCurrentReceipt: (state) => {
            state.currentReceipt = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchReceipts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceipts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchReceipts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch By ID
            .addCase(fetchReceiptById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceiptById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentReceipt = action.payload;
            })
            .addCase(fetchReceiptById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create
            .addCase(createReceipt.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })
            // Validate
            .addCase(validateReceipt.fulfilled, (state, action) => {
                state.currentReceipt = action.payload;
                const index = state.list.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export const { clearCurrentReceipt } = receiptSlice.actions;
export default receiptSlice.reducer;
