import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Create a special THUNK action creator
export const loadProducts = createAsyncThunk("loading-products", async () => {
    const response = await fetch("http://localhost:3005/products")
    const data = await response.json()
    // Option 1:
    return data
    // Option 2: use a dispatch function to dispatch ourselves
})

export const postProduct = createAsyncThunk("post-product", async (newProduct, { dispatch }) => {
    const response = await fetch("http://localhost:3005/products", {
        method: "POST",
        body: JSON.stringify(newProduct), // smooshify the data for the new product
        headers: {
            "Content-Type": "application/json",
        }
    })
    const createdProductWithId = await response.json()
    // Option 1:
    //return createdProductWithId
    // Option 2:
    dispatch(addProduct(createdProductWithId))
})

const initialState = {
    productList: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // Option 2:
        addProduct: (state, action) => {
            state.productList.push(action.payload)
        }
    },
    extraReducers: {
        // Option 1:
        [loadProducts.pending]: (state, action) => {
            state.loading = true
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.productList = action.payload
        },
        [loadProducts.rejected]: (state, action) => {
            state.loading = false
            state.error = "whatever the error is"
        },
        // Option 1:
        // [postProduct.fulfilled]: (state, action) => {
        //     state.productList.push(action.payload)
        // }
    }
});

// Option 2:
export const { addProduct } = productSlice.actions

export const productReducer = productSlice.reducer