import { useState } from 'react'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const [carrito, setCarrito] = useState([])

  // Agrega producto al carrito; si ya existe, aumenta la cantidad
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  // Elimina completamente un producto del carrito
  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="container-fluid">
      <header className="py-3 mb-4">
        <h1 className="text-center">🎮 GameZone</h1>
      </header>

      <main className="container">
        <ProductList agregarAlCarrito={agregarAlCarrito} />
        <ShoppingCart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />
      </main>
    </div>
  )
}

export default App