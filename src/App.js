import { useEffect } from "react"
import { useState } from "react"

// If you can do this well, you're in a really good place
// This is React (only missing props)

export default function App() {
  // start the data empty - renders first with no data
  const [productList, setProductList] = useState([])

  // run some code AFTER the first render
  // React is deathly allergic to asynchronous code
  useEffect(() => {
    // wrap it in a hypoallergenic baggy
    const nastyDirtyAsyncCode = async () => {
      const response = await fetch("http://localhost:3005/products")
      const fetchedProducts = await response.json()
      setProductList(fetchedProducts)
    }
    nastyDirtyAsyncCode()
  }, []) // empty = there's no reason to ever run again

  const handleDeleteClick = async (idToDelete) => {
    /*** Make the change to back-end (long term memory) */
    const response = await fetch("http://localhost:3005/products/" + idToDelete, {
      method: "DELETE"
    })

    /*** Make change to state (short term memory) ***/
    // make a copy and set state to the changed copy
    // const copyOfProductList = [...productList]
    // const indexToDelete = productList.findIndex(p => p.id === idToDelete)
    // copyOfProductList.splice(indexToDelete)
    // setProductList(copyOfProductList)
    setProductList(productList.filter(p => p.id !== idToDelete))
  }

  return (
    <div>
      {productList.map(product => (
        <div key={product.id}>
          {product.name}
          <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
