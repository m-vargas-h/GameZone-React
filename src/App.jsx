import { useState } from 'react'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const [carrito, setCarrito] = useState([])

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

  // Si la cantidad llega a 0, elimina el producto
  function modificarCantidad(id, delta) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="principal">
      <header>
        <h1 className="site-title">🎮 GameZone</h1>
        <p className="site-description">Tu tienda de videojuegos online</p>
      </header>

      <div className="contenido">
        <main>
          <ProductList agregarAlCarrito={agregarAlCarrito} />
          <ShoppingCart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />
        </main>
      </div>

      <footer>
        <h2>GameZone</h2>
        <p>© 2025 GameZone — Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App