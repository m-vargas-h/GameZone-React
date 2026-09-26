import { Link } from 'react-router-dom'

function Navbar() {
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
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#destacados">Destacados</a></li>
            <li className="nav-item"><a className="nav-link" href="#catalogo">Catálogo</a></li>
            <li className="nav-item"><a className="nav-link" href="#carrito">Carrito</a></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar