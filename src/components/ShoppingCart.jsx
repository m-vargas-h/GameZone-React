// Formatea precio en CLP
function formatearPrecio(precio) {
  return precio === 0 ? 'Gratis' : '$' + precio.toLocaleString('es-CL')
}

function ShoppingCart({ carrito, eliminarDelCarrito }) {
  // Calcula el total sumando precioOferta * cantidad de cada item
  const total = carrito.reduce(
    (acc, item) => acc + item.precioOferta * item.cantidad,
    0
  )

  return (
    <aside className="mt-5">
      <h2>🛒 Carrito
        {carrito.length > 0 && (
          <span className="badge bg-primary ms-2">{carrito.length}</span>
        )}
      </h2>

      {/* Renderizado condicional: carrito vacío vs con productos */}
      {carrito.length === 0 ? (
        <p className="text-muted">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.nombre}</strong>
                  <span className="text-muted ms-2">x{item.cantidad}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span>{formatearPrecio(item.precioOferta * item.cantidad)}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-end">
            <strong>Total: {formatearPrecio(total)}</strong>
          </div>
        </>
      )}
    </aside>
  )
}

export default ShoppingCart