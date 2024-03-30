import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/*** NASTY ASYNC UPDATE THE DATABASE STUFF */

export const fetchRecipes = createAsyncThunk("fetch-recipes", async () => {
    const response = await fetch("http://localhost:3005/recipes")
    const data = await response.json()
    // whatever you return here shows up in the payload
    return data
})

export const deleteRecipe = createAsyncThunk("delete-recipe", async (idToDelete) => {
    // remove it from the backend
    await fetch(`http://localhost:3005/recipes/${idToDelete}`, {
        method: "DELETE"
    })
    return idToDelete
})

export const createRecipe = createAsyncThunk("create-recipe", async (newRecipeData) => {
    // create on the backend
    const response = await fetch("http://localhost:3005/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipeData)
    })
    const newRecipeWithId = await response.json()
    return newRecipeWithId
})

/* NICE STATE UPDATING */

export const recipeSlice = createSlice({
    name: 'counter',
    initialState: {
        recipeArray: [],
        loading: false,
        deleting: false,
        errorMessage: null
    },
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.loading = true
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.recipeArray = action.payload
            state.loading = false
        },
        [fetchRecipes.rejected]: (state, action) => {
            state.loading = false
            state.errorMessage = action.error.message
        },
        [deleteRecipe.pending]: (state, action) => {
            state.deleting = true
        },
        [deleteRecipe.fulfilled]: (state, action) => {
            // remove it from the frontend
            return { 
                ...state, 
                deleting: false, 
                recipeArray: state.recipeArray.filter(r => r.id !== action.payload) 
            }
        },
        [createRecipe.fulfilled]: (state, action) => {
            // create on the frontend
            state.recipeArray.push(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { } = recipeSlice.actions

export const recipeReducer = recipeSlice.reducer