import ProductCard from './ProductCard'

function FeaturedProducts({ productos, carrito, agregarAlCarrito }) {
  const destacados = productos.filter((p) => p.destacado === true)

  return (
    <section id="destacados">
      <h2>Productos Destacados</h2>
      <p className="texto-secundario">Los títulos más populares de GameZone esta semana:</p>
      <div className="row g-4">
        {destacados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            carrito={carrito}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts