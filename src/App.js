import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts, postProduct } from "./productSlice"


export default function App() {
  const products = useSelector( 
    state => state.products.productList 
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProducts())
  }, [])

  const handleCreateClick = () => {
    const newProduct = {
      name: "Candy",
      price: 5
    }
    dispatch(postProduct(newProduct))
  }

  return (
    <div>
      App
      <button onClick={handleCreateClick}>Create Candy Product</button>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}