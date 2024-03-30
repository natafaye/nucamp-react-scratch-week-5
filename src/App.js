import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRecipe, deleteRecipe, fetchRecipes } from "./recipeSlice"

export default function App() {
  const recipeList = useSelector(state => state.recipes.recipeArray)
  const loadingRecipes = useSelector(state => state.recipes.loading)
  const deletingRecipe = useSelector(state => state.recipes.deleting)
  const dispatch = useDispatch()

  useEffect(() => {
    // tell redux to load the data in
    dispatch(fetchRecipes())
  }, [dispatch])

  const handleCreateClick = () => {
    const newRecipeData = {
      title: "New Recipe",
      category: "Main"
    }
    dispatch(createRecipe(newRecipeData))
  }

  return (
    <div className="m-4">
      <h3>Recipes</h3>
      <button onClick={handleCreateClick}>Create</button>
      { loadingRecipes && <p>Loading...</p>}
      {recipeList.map(recipe => (
        <div key={recipe.id}>
          {recipe.title}
          <button disabled={deletingRecipe} onClick={() => dispatch(deleteRecipe(recipe.id))}>Delete</button>
        </div>
      ))}
    </div>
  )
}