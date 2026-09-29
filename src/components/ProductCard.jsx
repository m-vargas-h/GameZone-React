import { formatearPrecio } from '../utils/formato'

// Card reutilizable: muestra un juego y su botón de carrito según si ya fue agregado
function ProductCard({ producto, carrito, agregarAlCarrito }) {
  // Renderizado condicional: ¿el producto ya está en el carrito?
  const enCarrito = carrito.some((item) => item.id === producto.id)

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
          src={producto.imagen}
          className="card-img-top"
          alt="Portada del juego"
          onError={(e) => { e.target.src = 'https://placehold.co/400x240?text=GameZone' }}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h5 card-title">{producto.nombre}</h3>
          <p className="card-text">{producto.descripcion}</p>
          <p className="precio-card">
            <span className="texto-secundario text-decoration-line-through me-2" style={{fontSize: '0.9rem'}}>
              {formatearPrecio(producto.precio)}
            </span>
            {formatearPrecio(producto.precioOferta)}
          </p>
          <div className="mt-auto d-flex gap-2">
            <a href={producto.url} target="_blank" rel="noopener noreferrer" className="btn btn-gamezone flex-grow-1">
              Ver mas
            </a>
            <button
              className={`btn-carrito ${enCarrito ? 'en-carrito' : ''}`}
              onClick={() => agregarAlCarrito(producto)}
            >
              {enCarrito ? '✓ En el carrito' : '+ Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard