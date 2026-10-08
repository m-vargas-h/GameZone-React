import { useNavigate } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'

// Panel lateral del carrito (Offcanvas de Bootstrap), disponible en todas las páginas
function CarritoPanel({ carrito, cantidadTotal, eliminarDelCarrito, modificarCantidad, vaciarCarrito }) {
  const navigate = useNavigate()

  return (
    <div
      className="offcanvas offcanvas-end panel-carrito"
      tabIndex="-1"
      id="panelCarrito"
      aria-labelledby="panelCarritoTitulo"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="panelCarritoTitulo">
          🛒 Carrito
          {cantidadTotal > 0 && <span className="badge bg-primary ms-2">{cantidadTotal}</span>}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar carrito"
        ></button>
      </div>

      <div className="offcanvas-body">
        <ShoppingCart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
          modificarCantidad={modificarCantidad}
          vaciarCarrito={vaciarCarrito}
          enPanel
        />

        {/* Renderizado condicional: el acceso a la página solo aparece si hay productos */}
        {carrito.length > 0 && (
          <button
            className="btn btn-gamezone w-100 mt-3"
            data-bs-dismiss="offcanvas"
            onClick={() => navigate('/carrito')}
          >
            Ver carrito
          </button>
        )}
      </div>
    </div>
  )
}

export default CarritoPanel