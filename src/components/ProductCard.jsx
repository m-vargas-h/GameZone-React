import { formatearPrecio } from '../utils/formato'

// Card reutilizable: muestra un juego y su botón de carrito según si ya fue agregado
function ProductCard({ producto, carrito, agregarAlCarrito, onEliminar }) {
  const enCarrito = carrito.some((item) => item.id === producto.id)
  const srcImagen = producto.imagen.startsWith('http')
    ? producto.imagen
    : `${import.meta.env.BASE_URL}${producto.imagen}`

  function handleMouseOver(e) {
    e.currentTarget.style.borderColor = 'var(--color-acento)'
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.transition = 'transform 0.2s ease, border-color 0.2s ease'
  }

  function handleMouseOut(e) {
    e.currentTarget.style.borderColor = ''
    e.currentTarget.style.transform = ''
  }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 card-gamezone" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <img
          src={srcImagen}
          className="card-img-top"
          alt={`Portada de ${producto.nombre}`}
          onError={(e) => { e.target.src = 'https://placehold.co/400x240?text=GameZone' }}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h5 card-title">{producto.nombre}</h3>
          <p className="card-text">{producto.descripcion}</p>
          <p className="precio-card">
            {producto.precioOferta < producto.precio && (
              <span className="texto-secundario text-decoration-line-through me-2" style={{ fontSize: '0.9rem' }}>
                {formatearPrecio(producto.precio)}
              </span>
            )}
            {formatearPrecio(producto.precioOferta)}
          </p>
          <div className="mt-auto d-flex gap-2">
            {producto.url && (
              <a href={producto.url} target="_blank" rel="noopener noreferrer" className="btn btn-gamezone flex-grow-1">
                Ver mas
              </a>
            )}
            <button
              className={`btn-carrito ${enCarrito ? 'en-carrito' : ''}`}
              onClick={() => agregarAlCarrito(producto)}
            >
              {enCarrito ? '✓ En el carrito' : '+ Carrito'}
            </button>
          </div>
          {onEliminar && (
            <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => onEliminar(producto.id)}>
              Eliminar juego
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard