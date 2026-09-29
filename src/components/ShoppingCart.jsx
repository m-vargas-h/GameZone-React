import { formatearPrecio } from '../utils/formato'

// Contenido del carrito: ítems, cantidades y total.
// Se reutiliza en el panel lateral (enPanel) y en la página /carrito
function ShoppingCart({ carrito, eliminarDelCarrito, modificarCantidad, enPanel = false }) {
  // Total = suma de (precio oferta x cantidad) de cada ítem
  const total = carrito.reduce(
    (acc, item) => acc + item.precioOferta * item.cantidad,
    0
  )

  return (
    <section className={enPanel ? 'carrito-en-panel' : 'seccion-carrito'}>
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