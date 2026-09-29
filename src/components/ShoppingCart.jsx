import { formatearPrecio } from '../utils/formato'

// Carrito de compras: lista los ítems, permite ajustar cantidades y muestra el total
function ShoppingCart({ carrito, eliminarDelCarrito, modificarCantidad }) {
  // Total = suma de (precio oferta x cantidad) de cada ítem
  const total = carrito.reduce(
    (acc, item) => acc + item.precioOferta * item.cantidad,
    0
  )

  return (
    <section id="carrito">
      <h2>🛒 Carrito
        {carrito.length > 0 && (
          <span className="badge bg-primary ms-2">
            {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </span>
        )}
      </h2>

      {/* Renderizado condicional: carrito vacío o lista de ítems */}
      {carrito.length === 0 ? (
        <p className="texto-secundario">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="lista-carrito-items">
            {carrito.map((item) => (
              <li key={item.id} className="carrito-item">
                <span className="carrito-nombre">{item.nombre}</span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn-eliminar"
                    onClick={() => modificarCantidad(item.id, -1)}
                  >−</button>
                  <span className="carrito-cantidad">{item.cantidad}</span>
                  <button
                    className="btn-eliminar"
                    onClick={() => modificarCantidad(item.id, 1)}
                  >+</button>
                </div>
                <span className="carrito-subtotal">
                  {formatearPrecio(item.precioOferta * item.cantidad)}
                </span>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <p className="total-carrito">
            Total: <span>{formatearPrecio(total)}</span>
          </p>
        </>
      )}
    </section>
  )
}

export default ShoppingCart