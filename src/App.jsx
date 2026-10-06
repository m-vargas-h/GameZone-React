import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useCarrito } from './hooks/useCarrito'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FeaturedProducts from './components/FeaturedProducts'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import CarritoPanel from './components/CarritoPanel'
import Footer from './components/Footer'
import Contacto from './pages/Contacto'
import CarritoPagina from './pages/CarritoPagina'
import Admin from './pages/Admin'

function Home({
  productos, cargando, error, reintentar,
  carrito, cantidadCarrito, agregarAlCarrito,
  eliminarProducto,
}) {
  // El catálogo solo se muestra cuando los datos cargaron sin errores
  const catalogoListo = !cargando && !error

  return (
    <div className="principal">
      <Navbar cantidadCarrito={cantidadCarrito} />

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
          {catalogoListo && (
            <ProductList
              productos={productos}
              carrito={carrito}
              agregarAlCarrito={agregarAlCarrito}
              eliminarProducto={eliminarProducto}
            />
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

  // Sesión de administrador simulada (se mantiene mientras dure la pestaña)
  const [esAdmin, setEsAdmin] = useState(() => sessionStorage.getItem('gamezone-admin') === 'true')

  // Carrito: estado, operaciones y persistencia encapsulados en el hook
  const {
    carrito, cantidadTotal, agregarAlCarrito, modificarCantidad, eliminarDelCarrito,
  } = useCarrito()

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

  // Agrega un juego al catálogo (id autoincremental)
  function agregarProducto(nuevo) {
    setProductos((prev) => {
      const id = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1
      return [...prev, { ...nuevo, id }]
    })
  }

  // Elimina un juego del catálogo y, si estaba, también del carrito
  function eliminarProducto(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id))
    eliminarDelCarrito(id)
  }

  // Login simulado: las credenciales están en el frontend (no es seguridad real)
  function iniciarSesion(usuario, clave) {
    if (usuario === 'admin' && clave === 'gamezone123') {
      setEsAdmin(true)
      sessionStorage.setItem('gamezone-admin', 'true')
      return true
    }
    return false
  }

  function cerrarSesion() {
    setEsAdmin(false)
    sessionStorage.removeItem('gamezone-admin')
  }

  return (
    <>
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
              cantidadCarrito={cantidadTotal}
              agregarAlCarrito={agregarAlCarrito}
              eliminarProducto={esAdmin ? eliminarProducto : undefined}
            />
          }
        />
        <Route path="/contacto" element={<Contacto cantidadCarrito={cantidadTotal} />} />
        <Route
          path="/carrito"
          element={
            <CarritoPagina
              carrito={carrito}
              cantidadCarrito={cantidadTotal}
              eliminarDelCarrito={eliminarDelCarrito}
              modificarCantidad={modificarCantidad}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              cantidadCarrito={cantidadTotal}
              esAdmin={esAdmin}
              iniciarSesion={iniciarSesion}
              cerrarSesion={cerrarSesion}
              agregarProducto={agregarProducto}
            />
          }
        />
      </Routes>

      {/* Panel lateral del carrito: un único panel disponible en todas las páginas */}
      <CarritoPanel
        carrito={carrito}
        cantidadTotal={cantidadTotal}
        eliminarDelCarrito={eliminarDelCarrito}
        modificarCantidad={modificarCantidad}
      />
    </>
  )
}

export default App