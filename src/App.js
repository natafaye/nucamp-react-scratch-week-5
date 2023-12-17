import { useEffect, useState } from "react"

export default function App() {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:3005/products")
      if(!response.ok) {
        setErrorMessage(response.statusText)
        setLoading(false)
        return // emergency exit out of the function
      }
      const data = await response.json()
      setProductList(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if(loading) {
    return <h5>Loading...</h5>
  }

  if(errorMessage) {
    return <h5 className="text-danger">{errorMessage}</h5>
  }

  return (
    <div>
      <h3>Products</h3>
      {productList.map(product => (
        <div>
          {product.name} (${product.price})
        </div>
      ))}
    </div>
  )
}