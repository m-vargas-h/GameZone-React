import { useJuegosExternos } from '../hooks/useJuegosExternos'

const IMAGEN_RESPALDO = 'https://placehold.co/400x240?text=GameZone'

// Sección "Descubre más juegos": datos de la API externa GameBrain
function DescubreJuegos() {
  const { juegos, cargando, error, reintentar } = useJuegosExternos()

  return (
    <section id="descubre">
      <h2>Descubre más juegos</h2>
      <p className="texto-secundario">Los títulos mejor valorados según GameBrain:</p>

      {/* Renderizado condicional: carga, error, vacío o resultados */}
      {cargando && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <p className="texto-secundario mt-3">Cargando juegos...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="alert alert-danger my-4" role="alert">
          <p className="mb-2">No se pudieron cargar los juegos ({error}).</p>
          <button className="btn btn-gamezone" onClick={reintentar}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && juegos.length === 0 && (
        <p className="texto-secundario">No se encontraron juegos.</p>
      )}

      {!cargando && !error && juegos.length > 0 && (
        <div className="row g-4">
          {juegos.map((juego) => (
            <div key={juego.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 card-gamezone">
                <img
                  src={juego.imagen || IMAGEN_RESPALDO}
                  className="card-img-top"
                  alt={`Portada de ${juego.nombre}`}
                  onError={(e) => { e.target.src = IMAGEN_RESPALDO }}
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h5 card-title">{juego.nombre}</h3>
                  <p className="card-text">
                    {juego.genero}
                    {juego.plataforma && ` — ${juego.plataforma}`}
                    {juego.rating && ` · ★ ${juego.rating}`}
                  </p>
                  <a
                    href={juego.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gamezone mt-auto"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default DescubreJuegos