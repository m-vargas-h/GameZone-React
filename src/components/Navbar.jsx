import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar({ cantidadCarrito = 0 }) {
  const navigate = useNavigate()
  const location = useLocation()

  function scrollTo(id) {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-md" id="navbar-principal">
      <div className="container-fluid">
        <Link className="navbar-brand site-title" to="/">GameZone</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollTo('inicio')}>Inicio</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollTo('destacados')}>Destacados</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollTo('catalogo')}>Catálogo</button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                data-bs-toggle="offcanvas"
                data-bs-target="#panelCarrito"
                aria-controls="panelCarrito"
              >
                Carrito
                {cantidadCarrito > 0 && <span className="badge bg-primary ms-2">{cantidadCarrito}</span>}
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar