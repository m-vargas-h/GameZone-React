import { useEffect } from 'react'

const banners = [
  { imagen: '/img/banner-black-myth-wukong.jpg', titulo: 'Black Myth: Wukong', descripcion: 'La épica aventura del Rey Mono — PC / PS5' },
  { imagen: '/img/banner-ea-fc-25.jpg', titulo: 'EA FC 25', descripcion: 'El fútbol más realista de la generación — Multi' },
  { imagen: '/img/banner-nba-2k25.jpg', titulo: 'NBA 2K25', descripcion: 'Vive la experiencia NBA al máximo nivel — Multi' },
  { imagen: '/img/banner-baldurs-gate-3.jpg', titulo: "Baldur's Gate 3", descripcion: 'El RPG definitivo de la década — PC / PS5' },
  { imagen: '/img/banner-cities-skylines-2.jpg', titulo: 'Cities: Skylines II', descripcion: 'Construye y gestiona la ciudad de tus sueños — PC / Xbox' },
]

function Carousel() {
  // Inicializa el carrusel de Bootstrap manualmente
  useEffect(() => {
    const el = document.getElementById('carruselGameZone')
    if (el && window.bootstrap) {
      new window.bootstrap.Carousel(el, { interval: 3000, ride: 'carousel' })
    }
  }, [])

  return (
    <div id="carruselGameZone" className="carousel slide">
      <div className="carousel-indicators">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carruselGameZone"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((banner, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
            <img
              src={banner.imagen}
              className="d-block w-100"
              alt={`Banner de ${banner.titulo}`}
              onError={(e) => { e.target.src = 'https://placehold.co/1200x420?text=GameZone' }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3 className="h5">{banner.titulo}</h3>
              <p>{banner.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carruselGameZone" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carruselGameZone" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  )
}

export default Carousel