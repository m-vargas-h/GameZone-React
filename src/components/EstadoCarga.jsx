// Renderizado condicional de los estados de carga y error del catálogo
function EstadoCarga({ cargando, error, reintentar }) {
  return (
    <>
      {cargando && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <p className="texto-secundario mt-3">Cargando catálogo...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="alert alert-danger my-4" role="alert">
          <p className="mb-2">No se pudo cargar el catálogo ({error}).</p>
          <button className="btn btn-gamezone" onClick={reintentar}>
            Reintentar
          </button>
        </div>
      )}
    </>
  )
}

export default EstadoCarga