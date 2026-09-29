import { useState } from 'react'
import ProductCard from './ProductCard'

const plataformas = ['Todos', 'PS5', 'Xbox', 'Switch', 'PC']
const generos = ['Todos', 'Acción', 'RPG', 'Deportes', 'Estrategia', 'Simulación', 'Carreras']

function ProductList({ productos, carrito, agregarAlCarrito }) {
  const [filtroPlataforma, setFiltroPlataforma] = useState('Todos')
  const [filtroGenero, setFiltroGenero] = useState('Todos')

  const filtrados = productos.filter((p) => {
    const coincidePlataforma = filtroPlataforma === 'Todos' || p.plataformas.includes(filtroPlataforma)
    const coincideGenero = filtroGenero === 'Todos' || p.categoria === filtroGenero
    return coincidePlataforma && coincideGenero
  })

  return (
    <section id="catalogo">
      <h2>Catálogo completo</h2>
      <p className="texto-secundario">Explora todos nuestros títulos. Filtra por plataforma o por género:</p>

      {/* Filtros plataforma */}
      <div className="mb-2">
        <span className="label-filtro">Plataforma:</span>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {plataformas.map((p) => (
            <button
              key={p}
              className={`btn btn-filtro ${filtroPlataforma === p ? 'active' : ''}`}
              onClick={() => setFiltroPlataforma(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros género */}
      <div className="mb-4">
        <span className="label-filtro">Género:</span>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {generos.map((g) => (
            <button
              key={g}
              className={`btn btn-filtro ${filtroGenero === g ? 'active' : ''}`}
              onClick={() => setFiltroGenero(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Renderizado condicional: sin resultados */}
      {filtrados.length === 0 ? (
        <p className="texto-secundario">No hay juegos disponibles para el filtro seleccionado.</p>
      ) : (
        <div className="row g-4">
          {filtrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              carrito={carrito}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList