import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EstadoCarga from '../components/EstadoCarga'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'

// Página /catalogo: búsqueda y catálogo completo con filtros
function Catalogo({
  productos, cargando, error, reintentar,
  carrito, cantidadCarrito, agregarAlCarrito, eliminarProducto,
}) {
  const catalogoListo = !cargando && !error

  return (
    <div className="principal">
      <Navbar cantidadCarrito={cantidadCarrito} />

      <header>
        <h1 className="site-title">Catálogo</h1>
        <p className="site-description">Busca y filtra todos los títulos disponibles en GameZone.</p>
      </header>

      <div className="contenido">
        <main>
          <EstadoCarga cargando={cargando} error={error} reintentar={reintentar} />

          {catalogoListo && (
            <SearchBar productos={productos} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
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

export default Catalogo