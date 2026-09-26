import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FeaturedProducts from './components/FeaturedProducts'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer'
import Contacto from './pages/Contacto'

function Home({ carrito, agregarAlCarrito, eliminarDelCarrito, modificarCantidad }) {
  return (
    <div className="principal">
      <Navbar />

      <header>
        <h1 className="site-title">🎮 GameZone</h1>
        <p className="site-description">Tu tienda de videojuegos favorita. Encuentra los mejores títulos para todas las plataformas.</p>
      </header>

      <Carousel />

      <div className="contenido">
        <main>
          <section id="inicio">
            <h2>Bienvenido a GameZone</h2>
            <p>Somos una tienda especializada en videojuegos para PS5, Xbox Series X, Nintendo Switch y PC. Contamos con los últimos lanzamientos y los clásicos más queridos.</p>
          </section>

          <SearchBar agregarAlCarrito={agregarAlCarrito} />
          <FeaturedProducts agregarAlCarrito={agregarAlCarrito} />
          <ShoppingCart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />
          <ProductList agregarAlCarrito={agregarAlCarrito} />
        </main>
      </div>

      <Footer />
    </div>
  )
}

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
    <Routes>
      <Route
        path="/"
        element={
          <Home
            carrito={carrito}
            agregarAlCarrito={agregarAlCarrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />
        }
      />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  )
}

export default App