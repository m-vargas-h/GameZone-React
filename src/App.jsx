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

function Home({
  productos, cargando, error, reintentar,
  carrito, agregarAlCarrito, eliminarDelCarrito, modificarCantidad,
}) {
  // El catálogo solo se muestra cuando los datos cargaron sin errores
  const catalogoListo = !cargando && !error

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

          {/* Renderizado condicional: estado de carga */}
          {cargando && (
            <div className="text-center my-5">
              <div className="spinner-border" role="status" aria-hidden="true"></div>
              <p className="texto-secundario mt-3">Cargando catálogo...</p>
            </div>
          )}

          {/* Renderizado condicional: estado de error */}
          {!cargando && error && (
            <div className="alert alert-danger my-4" role="alert">
              <p className="mb-2">No se pudo cargar el catálogo ({error}).</p>
              <button className="btn btn-gamezone" onClick={reintentar}>
                Reintentar
              </button>
            </div>
          )}

          {catalogoListo && (
            <SearchBar productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
          )}
          {catalogoListo && (
            <FeaturedProducts productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
          )}

          <ShoppingCart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />

          {catalogoListo && (
            <ProductList productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
          )}
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
  const [intento, setIntento] = useState(0) // cambia al reintentar y vuelve a ejecutar el efecto

  // Estado del carrito
  const [carrito, setCarrito] = useState([])

  // Efecto secundario: cargar el catálogo desde el JSON (al montar y en cada reintento)
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
  }, [intento])

  // Reinicia los estados de carga y dispara de nuevo el efecto
  function reintentar() {
    setError(null)
    setCargando(true)
    setIntento((n) => n + 1)
  }

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
            cargando={cargando}
            error={error}
            reintentar={reintentar}
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