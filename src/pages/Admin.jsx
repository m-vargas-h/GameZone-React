import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminJuegos from '../components/AdminJuegos'

// Página de administración: login simulado y, al ingresar, gestión del catálogo
function Admin({ cantidadCarrito, esAdmin, iniciarSesion, cerrarSesion, agregarProducto }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (usuario.trim() === '' || clave === '') {
      setError('Completa usuario y clave.')
      return
    }
    if (iniciarSesion(usuario.trim(), clave)) {
      setError('')
      setUsuario('')
      setClave('')
    } else {
      setError('Usuario o clave incorrectos.')
    }
  }

  return (
    <div className="principal">
      <Navbar cantidadCarrito={cantidadCarrito} />

      <header>
        <h1 className="site-title">Administración</h1>
        <p className="site-description">Gestiona el catálogo de GameZone.</p>
      </header>

      <div className="contenido">
        <main>
          {!esAdmin ? (
            <section id="login">
              <h2>Iniciar sesión</h2>
              <form className="row g-3" onSubmit={handleLogin} noValidate>
                <div className="col-12 col-md-6">
                  <label htmlFor="usuario" className="label-filtro d-block mb-1">Usuario</label>
                  <input id="usuario" type="text" className="form-control form-control-gamezone"
                    value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="clave" className="label-filtro d-block mb-1">Clave</label>
                  <input id="clave" type="password" className="form-control form-control-gamezone"
                    value={clave} onChange={(e) => setClave(e.target.value)} />
                </div>
                {error && <p className="texto-error col-12 mb-0">{error}</p>}
                <div className="col-12">
                  <button type="submit" className="btn btn-gamezone">Ingresar</button>
                </div>
              </form>
            </section>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">Sesión iniciada como administrador. Los botones de eliminar aparecen en el catálogo.</p>
                <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>Cerrar sesión</button>
              </div>
              <AdminJuegos agregarProducto={agregarProducto} />
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Admin