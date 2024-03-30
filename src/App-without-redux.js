import { useEffect } from "react"
import { useState } from "react"

export default function App() {
  // In a Single Page Application the JS doesn't know what the data is to start
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    // React is a germaphobe for asynchronousness - it doesn't want to touch a slow async function
    // So we wrap it in a little baggy (another function)
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:3005/recipes")
      const data = await response.json()
      setRecipeList(data)
    }
    fetchRecipes()
  }, [])

  const deleteRecipe = async (idToDelete) => {
    // remove it from the backend
    await fetch(`http://localhost:3005/recipes/${idToDelete}`, {
      method: "DELETE"
    })

    // remove it from the frontend (have to work off copies)
    setRecipeList(recipeList.filter(r => r.id !== idToDelete))
  }

  const createRecipe = async () => {
    const newRecipeData = {
      title: "New Recipe",
      category: "Main"
    }

    // create on the backend
    const response = await fetch("http://localhost:3005/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipeData)
    })
    const newRecipeWithId = await response.json()

    // create on the frontend
    setRecipeList([...recipeList, newRecipeWithId])
  }

  return (
    <div className="m-4">
      <h3>Recipes</h3>
      <button onClick={createRecipe}>Create</button>
      {recipeList.map(recipe => (
        <div key={recipe.id}>
          {recipe.title}
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}