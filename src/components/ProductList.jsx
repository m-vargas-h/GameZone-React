import productos from '../data/productos.json'

function formatearPrecio(precio) {
  return precio === 0 ? 'Gratis' : '$' + precio.toLocaleString('es-CL')
}

function ProductList() {
  return (
    <section>
      <h2 className="mb-4">Catálogo de Juegos</h2>
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={`Portada de ${producto.nombre}`}
                onError={(e) => { e.target.src = 'https://placehold.co/400x240?text=GameZone' }}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="h5 card-title">{producto.nombre}</h3>
                <p className="card-text">{producto.descripcion}</p>
                <p className="mb-1">
                  <span className="text-decoration-line-through text-muted me-2">
                    {formatearPrecio(producto.precio)}
                  </span>
                  <strong>{formatearPrecio(producto.precioOferta)}</strong>
                </p>
                <button className="btn btn-primary mt-auto">
                  + Carrito
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