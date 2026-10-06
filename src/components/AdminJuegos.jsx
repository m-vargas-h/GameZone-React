import { useState } from 'react'

const generos = ['Acción', 'RPG', 'Deportes', 'Estrategia', 'Simulación', 'Carreras']
const plataformas = ['PS5', 'Xbox', 'Switch', 'PC']
const inicial = { nombre: '', categoria: '', plataforma: '', precio: '', descripcion: '', imagen: '' }

// Formulario para agregar juegos al catálogo (actualiza el estado de App vía props)
function AdminJuegos({ agregarProducto }) {
  const [campos, setCampos] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [agregado, setAgregado] = useState(false)

  function handleChange(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value })
  }

  function validar() {
    const e = {}
    if (campos.nombre.trim() === '') e.nombre = 'El nombre es obligatorio.'
    if (campos.categoria === '') e.categoria = 'Selecciona un género.'
    if (campos.plataforma === '') e.plataforma = 'Selecciona una plataforma.'
    if (campos.precio === '' || Number(campos.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
    if (campos.descripcion.trim().length < 10) e.descripcion = 'La descripción debe tener al menos 10 caracteres.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const precio = Number(campos.precio)
    agregarProducto({
      nombre: campos.nombre.trim(),
      descripcion: campos.descripcion.trim(),
      imagen: campos.imagen.trim() || 'https://placehold.co/400x240?text=GameZone',
      categoria: campos.categoria,
      plataformas: [campos.plataforma],
      precio,
      precioOferta: precio,
      url: '',
      destacado: false,
    })
    setCampos(inicial)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 3000)
  }

  return (
    <section id="agregar-juego">
      <h2>Agregar juego al catálogo</h2>
      <p className="texto-secundario">Completa los datos para sumar un nuevo título a la lista.</p>

      {agregado && (
        <div className="mb-3" style={{ color: 'var(--color-exito)', fontWeight: 600 }}>
          ✔ Juego agregado al catálogo.
        </div>
      )}

      <form className="row g-3" onSubmit={handleSubmit} noValidate>
        <div className="col-12 col-md-6">
          <label htmlFor="nombre-juego" className="label-filtro d-block mb-1">Nombre *</label>
          <input id="nombre-juego" type="text" name="nombre" className="form-control form-control-gamezone"
            value={campos.nombre} onChange={handleChange} />
          {errores.nombre && <p className="texto-error mt-1">{errores.nombre}</p>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="precio-juego" className="label-filtro d-block mb-1">Precio (CLP) *</label>
          <input id="precio-juego" type="number" name="precio" min="1" className="form-control form-control-gamezone"
            value={campos.precio} onChange={handleChange} />
          {errores.precio && <p className="texto-error mt-1">{errores.precio}</p>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="genero-juego" className="label-filtro d-block mb-1">Género *</label>
          <select id="genero-juego" name="categoria" className="form-control form-control-gamezone"
            value={campos.categoria} onChange={handleChange}>
            <option value="">Selecciona un género...</option>
            {generos.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {errores.categoria && <p className="texto-error mt-1">{errores.categoria}</p>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="plataforma-juego" className="label-filtro d-block mb-1">Plataforma *</label>
          <select id="plataforma-juego" name="plataforma" className="form-control form-control-gamezone"
            value={campos.plataforma} onChange={handleChange}>
            <option value="">Selecciona una plataforma...</option>
            {plataformas.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errores.plataforma && <p className="texto-error mt-1">{errores.plataforma}</p>}
        </div>

        <div className="col-12">
          <label htmlFor="imagen-juego" className="label-filtro d-block mb-1">URL de imagen (opcional)</label>
          <input id="imagen-juego" type="url" name="imagen" placeholder="https://..."
            className="form-control form-control-gamezone" value={campos.imagen} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label htmlFor="desc-juego" className="label-filtro d-block mb-1">Descripción *</label>
          <textarea id="desc-juego" name="descripcion" rows={3} className="form-control form-control-gamezone"
            value={campos.descripcion} onChange={handleChange} />
          {errores.descripcion && <p className="texto-error mt-1">{errores.descripcion}</p>}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-gamezone">Agregar juego</button>
        </div>
      </form>
    </section>
  )
}

export default AdminJuegos