import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShoppingCart from '../components/ShoppingCart'

// Página aparte con el detalle completo del carrito
function CarritoPagina({ carrito, cantidadCarrito, eliminarDelCarrito, modificarCantidad, vaciarCarrito }) {
  return (
    <div className="principal">
      <Navbar cantidadCarrito={cantidadCarrito} />

      <header>
        <h1 className="site-title">Tu carrito</h1>
        <p className="site-description">Revisa los juegos que agregaste antes de finalizar tu compra.</p>
      </header>

      <div className="contenido">
        <main>
          <ShoppingCart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
            vaciarCarrito={vaciarCarrito}
          />
          <Link to="/" className="btn btn-gamezone">← Seguir comprando</Link>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default CarritoPagina