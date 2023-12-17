import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],
    loading: false,
    errorMessage: null
}

// export const fetchData = async (payload, { dispatch }) => {
//     dispatch(fetchDataPending())
//     const response = await fetch("http://localhost:3005/products")
//     if (!response.ok) {
//         dispatch(fetchDataRejected(response.statusText))
//         return // emergency exit out of the function
//     }
//     const data = await response.json()
//     dispatch(fetchDataFulfilled(data))
// }

// Shortcut version that handles the dispatching for you, based off the Promise status
// Makes an action creator that returns a function (thunk) instead of an object
export const fetchData = createAsyncThunk("fetching-data", async () => {
    // for us, createasyncthunk will dispatch the pending action
    const response = await fetch("http://localhost:3005/products")
    if (!response.ok) {
        return Promise.reject(response.statusText)// emergency exit out of the function and dispatch rejected action
    }
    const data = await response.json()
    return data // this will get bundled into a fulfilled promise and then the fulfilled action will be dispatched
})

export const postProduct = createAsyncThunk("posting-product", async (newProduct, { dispatch }) => { 
    // newProduct will be whatever was passed in
    const response = await fetch("http://localhost:3005/products", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
    })
    
    if (!response.ok) {
        return Promise.reject(response.statusText)
    }
    const data = await response.json()
    // option 1: dispatch yourself a normal reducer
    dispatch(addProduct(data))
    // option 2: return the data and have createasyncthunk dispatch an extra reducer
    //return data // data will be newProduct with an id property from the backend
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // fetchDataPending: (state, action) => { // starts
        //     state.loading = true
        // },
        // fetchDataFulfilled: (state, action) => { // finishes succesfully
        //     state.loading = false
        //     state.errorMessage = null
        //     state.productList = action.payload
        // },
        // fetchDataRejected: (state, action) => { // finishes unsuccessfully
        //     state.loading = false
        //     state.errorMessage = action.payload
        // }
        // option 1
        addProduct: (state, action) => {
            state.productList.push(action.payload) // add the newly created product (with the id) into the list
        }
    },
    extraReducers: { // technically old syntax, the new syntax is pretty similar
        [fetchData.pending]: (state, action) => { // starts
            state.loading = true
        },
        [fetchData.fulfilled]:  (state, action) => { // finishes succesfully
            state.loading = false
            state.errorMessage = null
            state.productList = action.payload
        },
        [fetchData.rejected]: (state, action) => { // finishes unsuccessfully
            state.loading = false
            state.errorMessage = action.error.message // I can't remember
        },
        // option 2
        // [postProduct.fulfilled]: (state, action) => {
        //     state.productList.push(action.payload) // add the newly created product (with the id) into the list
        // }
    }
});

export const { addProduct } = productSlice.actions

export const productReducer = productSlice.reducer