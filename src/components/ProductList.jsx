import productos from '../data/productos.json'

function formatearPrecio(precio) {
  return precio === 0 ? 'Gratis' : '$' + precio.toLocaleString('es-CL')
}

function ProductList({ agregarAlCarrito }) {
  return (
    <section>
      <h2>Catálogo de Juegos</h2>
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <div className="card card-gamezone h-100">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={`Portada de ${producto.nombre}`}
                onError={(e) => { e.target.src = 'https://placehold.co/400x240?text=GameZone' }}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{producto.nombre}</h3>
                <p className="card-text">{producto.descripcion}</p>
                <p className="precio-card">
                  <span className="text-decoration-line-through texto-secundario me-2" style={{fontSize: '0.9rem'}}>
                    {formatearPrecio(producto.precio)}
                  </span>
                  {formatearPrecio(producto.precioOferta)}
                </p>
                <button
                  className="btn-carrito mt-auto"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  + Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList