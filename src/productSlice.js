import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: []
}

// Heavy duty hypoallergenic baggy to protect redux from async stuff
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch("http://localhost:3005/products")
    const fetchedProducts = await response.json()
    return fetchedProducts // option 1: will dispatch automatically a pending and a fulfilled/rejected
})

export const removeProduct = createAsyncThunk("deleteProduct", async (idToDelete, { dispatch }) => {
    /*** Make the change to back-end (long term memory) */
    const response = await fetch("http://localhost:3005/products/" + idToDelete, {
        method: "DELETE"
    })
    /*** Make change to state (short term memory) ***/
    dispatch(deleteProduct(idToDelete)) // option 2: dispatch yourself
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        deleteProduct: (state, action) => {
            return {
                ...state,
                // assuming the payload is the id to delete
                productList: state.productList.filter(p => p.id !== action.payload)
            }
        }
    },
    extraReducers: {
        // pending, fulfilled, reject => 3 statuses that a promise can have
        [fetchProducts.pending]: (state, action) => {
            // updating the loading status
        },
        [fetchProducts.fulfilled]: (state, action) => {
            // update the actual data
            // the payload will be what is returned from fetchProducts
            state.productList = action.payload
        },
        [fetchProducts.rejected]: (state, action) => {
            // show some kind of error message
        },
    }
});

export const { deleteProduct } = productSlice.actions

export const productReducer = productSlice.reducer