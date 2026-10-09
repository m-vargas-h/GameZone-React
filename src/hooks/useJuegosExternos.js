import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GAMEBRAIN_KEY
const API_URL = 'https://api.gamebrain.co/v1/games?limit=6&sort_by=rating'

// La API puede devolver los campos con distintos nombres: se normalizan a una forma única
function normalizarJuego(juego, indice) {
  return {
    id: juego.id ?? indice,
    nombre: juego.name || juego.title || 'Sin título',
    imagen: juego.cover_image || juego.thumbnail || juego.background_image || juego.image || juego.cover || '',
    genero: juego.genre || juego.genres?.[0]?.name || 'Videojuego',
    plataforma: juego.platform || juego.platforms?.[0]?.name || '',
    rating: juego.rating?.mean ? (juego.rating.mean * 10).toFixed(1) : '',
    url: juego.link
      ? `https://gamebrain.co/game/${juego.link.split('/game/').pop()}`
      : 'https://gamebrain.co',
  }
}

// Hook de la API externa: carga juegos de GameBrain con estados de carga/error/reintento
export function useJuegosExternos() {
  const [juegos, setJuegos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0) // cambia al reintentar y vuelve a ejecutar el efecto

  useEffect(() => {
    const controller = new AbortController()

    async function cargarJuegos() {
      try {
        if (!API_KEY) throw new Error('falta la clave de la API')

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const datos = await res.json()
        const lista = datos.results || datos.games || datos || []
        setJuegos(Array.isArray(lista) ? lista.map(normalizarJuego) : [])
      } catch (err) {
        // Un abort (desmontaje / StrictMode) no es un error real
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarJuegos()
    return () => controller.abort() // limpieza del efecto
  }, [intento])

  function reintentar() {
    setError(null)
    setCargando(true)
    setIntento((n) => n + 1)
  }

  return { juegos, cargando, error, reintentar }
}