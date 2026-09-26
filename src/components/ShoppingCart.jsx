function formatearPrecio(precio) {
  return precio === 0 ? 'Gratis' : '$' + precio.toLocaleString('es-CL')
}

function ShoppingCart({ carrito, eliminarDelCarrito, modificarCantidad }) {
  const total = carrito.reduce(
    (acc, item) => acc + item.precioOferta * item.cantidad,
    0
  )

  return (
    <section id="carrito">
      <h2>🛒 Carrito
        {carrito.length > 0 && (
          <span className="badge bg-primary ms-2">{carrito.length}</span>
        )}
      </h2>

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