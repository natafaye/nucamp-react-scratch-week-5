import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData, postProduct } from "./productSlice"

export default function App() {
  const productList = useSelector(state => state.products.productList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]) // dispatch never actually changes

  const onAddClick = () => {
    const newProduct = {
        name: "Cake",
        price: 0
    }
    dispatch(postProduct(newProduct))
  }

  return (
    <div>
      <h3>Products</h3>
      <button onClick={onAddClick}>Add new product</button>
      {productList.map(product => (
        <div>
          {product.name} (${product.price})
        </div>
      ))}
    </div>
  )
}