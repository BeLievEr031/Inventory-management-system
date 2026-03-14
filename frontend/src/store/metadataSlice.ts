import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

interface MetadataState {
    products: any[];
    warehouses: any[];
    locations: any[];
    loading: boolean;
}

const initialState: MetadataState = {
    products: [],
    warehouses: [],
    locations: [],
    loading: false,
};

export const fetchProducts = createAsyncThunk("metadata/fetchProducts", async () => {
    const response = await api.get<ApiResponse<any[]>>("/products");
    return response.data.data;
});

export const fetchWarehouses = createAsyncThunk("metadata/fetchWarehouses", async () => {
    const response = await api.get<ApiResponse<any[]>>("/warehouses");
    return response.data.data;
});

export const fetchLocationsByWarehouse = createAsyncThunk("metadata/fetchLocations", async (warehouseCode: string) => {
    const response = await api.get<ApiResponse<any[]>>(`/warehouses/${warehouseCode}/locations`);
    return response.data.data;
});

const metadataSlice = createSlice({
    name: "metadata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchWarehouses.fulfilled, (state, action) => {
                state.warehouses = action.payload;
            })
            .addCase(fetchLocationsByWarehouse.fulfilled, (state, action) => {
                state.locations = action.payload;
            });
    },
});

export default metadataSlice.reducer;
