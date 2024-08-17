import { useEffect } from "react"
import { useState } from "react"


export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // protects React from the nasty async stuff
    const fetchData = async () => {
      const response = await fetch("http://localhost:3005/products")
      const data = await response.json() // something that takes a while
      setProducts(data)
    }
    fetchData() // does not wait for it
  }, []) // run after the first render (dev mode it will actually run twice)

  return (
    <div>
      App
      {products.map(product => <div key={product.id}>{product.name}</div>)}
    </div>
  )
}