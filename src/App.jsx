import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FeaturedProducts from './components/FeaturedProducts'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer'
import Contacto from './pages/Contacto'

function Home({ productos, carrito, agregarAlCarrito, eliminarDelCarrito, modificarCantidad }) {
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

          <SearchBar productos={productos} agregarAlCarrito={agregarAlCarrito} />
          <FeaturedProducts productos={productos} agregarAlCarrito={agregarAlCarrito} />
          <ShoppingCart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />
          <ProductList productos={productos} agregarAlCarrito={agregarAlCarrito} />
        </main>
      </div>

      <Footer />
    </div>
  )
}

function App() {
  // Estado del catálogo: lista de productos y estados de la carga
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Estado del carrito
  const [carrito, setCarrito] = useState([])

  // Efecto secundario: cargar el catálogo desde el JSON al montar la app
  useEffect(() => {
    const controller = new AbortController()

    async function cargarProductos() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/productos.json`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        const data = await res.json()
        setProductos(data)
      } catch (err) {
        // Un abort (desmontaje / StrictMode) no es un error real
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    return () => controller.abort() // limpieza del efecto
  }, [])

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
            productos={productos}
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