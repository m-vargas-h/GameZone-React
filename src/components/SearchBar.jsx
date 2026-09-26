import { useState } from 'react'
import productos from '../data/productos.json'
import ProductCard from './ProductCard'

function SearchBar({ agregarAlCarrito }) {
  const [termino, setTermino] = useState('')
  const [resultados, setResultados] = useState([])
  const [buscado, setBuscado] = useState(false)

  function ejecutarBusqueda(e) {
    e.preventDefault()
    const texto = termino.trim().toLowerCase()
    setBuscado(true)

    if (texto === '') {
      setResultados([])
      return
    }

    const encontrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto)
    )
    setResultados(encontrados)
  }

  return (
    <section id="busqueda">
      <h2>Buscar juego</h2>
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control form-control-gamezone"
            placeholder="Escribe el nombre de un juego..."
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ejecutarBusqueda(e)}
          />
        </div>
        <div className="col-12 col-md-4">
          <button className="btn btn-gamezone w-100" onClick={ejecutarBusqueda}>
            Buscar
          </button>
        </div>
      </div>

      {/* Renderizado condicional de resultados */}
      {buscado && termino.trim() === '' && (
        <p className="texto-secundario mt-3">Ingresa un término para buscar.</p>
      )}
      {buscado && termino.trim() !== '' && resultados.length === 0 && (
        <p className="texto-secundario mt-3">
          No se encontraron juegos para "<strong>{termino}</strong>".
        </p>
      )}
      {resultados.length > 0 && (
        <div className="row g-4 mt-1">
          {resultados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default SearchBar