import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function formatoEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function Contacto({ cantidadCarrito }) {
  const [campos, setCampos] = useState({ nombre: '', email: '', telefono: '', motivo: '', mensaje: '' })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function handleChange(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value })
  }

  function validar() {
    const nuevosErrores = {}

    if (campos.nombre.trim() === '')
      nuevosErrores.nombre = 'El nombre es obligatorio.'

    if (campos.email.trim() === '')
      nuevosErrores.email = 'El correo es obligatorio.'
    else if (!formatoEmailValido(campos.email.trim()))
      nuevosErrores.email = 'Ingresa un correo válido.'

    if (campos.motivo === '')
      nuevosErrores.motivo = 'Selecciona un motivo de contacto.'

    if (campos.mensaje.trim() === '')
      nuevosErrores.mensaje = 'El mensaje no puede estar vacío.'
    else if (campos.mensaje.trim().length < 10)
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

    return nuevosErrores
  }

  function handleEnviar(e) {
    e.preventDefault() // evita la recarga de página al enviar el form
    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true)
      setCampos({ nombre: '', email: '', telefono: '', motivo: '', mensaje: '' })
      setTimeout(() => setEnviado(false), 4000)
    }
  }

  return (
    <div className="principal">
      <Navbar cantidadCarrito={cantidadCarrito} />

      <header>
        <h1 className="site-title">📬 Contacto</h1>
        <p className="site-description">Envíanos un mensaje y te responderemos a la brevedad.</p>
      </header>

      <div className="contenido">
        <main>
          <section id="contacto">
            <h2>Formulario de contacto</h2>

            {enviado && (
              <div className="mb-3" style={{ color: 'var(--color-exito)', fontWeight: 600 }}>
                ✔ Mensaje enviado correctamente. ¡Gracias por contactarnos!
              </div>
            )}

            <form className="row g-3" onSubmit={handleEnviar} noValidate>
              <div className="col-12 col-md-6">
                <label className="label-filtro d-block mb-1">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control form-control-gamezone"
                  placeholder="Tu nombre completo"
                  value={campos.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <p className="texto-error mt-1">{errores.nombre}</p>}
              </div>

              <div className="col-12 col-md-6">
                <label className="label-filtro d-block mb-1">Correo electrónico *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-gamezone"
                  placeholder="tucorreo@email.com"
                  value={campos.email}
                  onChange={handleChange}
                />
                {errores.email && <p className="texto-error mt-1">{errores.email}</p>}
              </div>

              <div className="col-12 col-md-6">
                <label className="label-filtro d-block mb-1">Teléfono (opcional)</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control form-control-gamezone"
                  placeholder="+56 9 1234 5678"
                  value={campos.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="label-filtro d-block mb-1">Motivo *</label>
                <select
                  name="motivo"
                  className="form-control form-control-gamezone"
                  value={campos.motivo}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un motivo...</option>
                  <option value="consulta">Consulta general</option>
                  <option value="pedido">Estado de pedido</option>
                  <option value="devolucion">Devolución</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="otro">Otro</option>
                </select>
                {errores.motivo && <p className="texto-error mt-1">{errores.motivo}</p>}
              </div>

              <div className="col-12">
                <label className="label-filtro d-block mb-1">Mensaje *</label>
                <textarea
                  name="mensaje"
                  className="form-control form-control-gamezone"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                  value={campos.mensaje}
                  onChange={handleChange}
                />
                {errores.mensaje && <p className="texto-error mt-1">{errores.mensaje}</p>}
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-gamezone">
                  Enviar mensaje
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Contacto