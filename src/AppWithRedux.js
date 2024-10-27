import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeProduct, fetchProducts } from "./productSlice"

export default function App() {
  const productList = useSelector(state => state.products.productList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleDeleteClick = async (idToDelete) => {
    dispatch(removeProduct(idToDelete))
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
