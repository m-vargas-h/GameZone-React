import { Routes, Route, Link } from 'react-router-dom'
import EstadoCarga from './components/EstadoCarga'
import Catalogo from './pages/Catalogo'
import { useCarrito } from './hooks/useCarrito'
import { useProductos } from './hooks/useProductos'
import { useAdmin } from './hooks/useAdmin'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FeaturedProducts from './components/FeaturedProducts'
import CarritoPanel from './components/CarritoPanel'
import Footer from './components/Footer'
import Contacto from './pages/Contacto'
import CarritoPagina from './pages/CarritoPagina'
import Admin from './pages/Admin'
import DescubreJuegos from './components/DescubreJuegos'

function Home({
  productos, cargando, error, reintentar,
  carrito, cantidadCarrito, agregarAlCarrito,
}) {
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

          <EstadoCarga cargando={cargando} error={error} reintentar={reintentar} />

          {catalogoListo && (
            <>
              <FeaturedProducts productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
              <div className="text-center my-4">
                <Link to="/catalogo" className="btn btn-gamezone">Ver catálogo completo →</Link>
              </div>
            </>
          )}

          <DescubreJuegos />
        </main>
      </div>

      <Footer />
    </div>
  )
}

function App() {
  // Catálogo: carga, estados y operaciones encapsulados en el hook
  const {
    productos, cargando, error, reintentar, agregarProducto, eliminarProducto,
  } = useProductos()

  // Sesión de administrador simulada
  const { esAdmin, iniciarSesion, cerrarSesion } = useAdmin()

  // Carrito: estado, operaciones y persistencia encapsulados en el hook
  const {
    carrito, cantidadTotal, agregarAlCarrito, modificarCantidad, eliminarDelCarrito, vaciarCarrito,
  } = useCarrito()

  // Elimina un juego del catálogo y, si estaba, también del carrito
  function eliminarJuego(id) {
    eliminarProducto(id)
    eliminarDelCarrito(id)
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
              vaciarCarrito={vaciarCarrito}
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
        <Route
          path="/catalogo"
          element={
            <Catalogo
              productos={productos}
              cargando={cargando}
              error={error}
              reintentar={reintentar}
              carrito={carrito}
              cantidadCarrito={cantidadTotal}
              agregarAlCarrito={agregarAlCarrito}
              eliminarProducto={esAdmin ? eliminarJuego : undefined}
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
        vaciarCarrito={vaciarCarrito}
      />
    </>
  )
}

export default App