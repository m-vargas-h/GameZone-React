import { useState, useEffect } from 'react'

// Hook del catálogo: carga desde JSON (con estados de carga/error/reintento)
// y operaciones para agregar y eliminar juegos
export function useProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0) // cambia al reintentar y vuelve a ejecutar el efecto

  // Efecto secundario: cargar el catálogo desde el JSON (al montar y en cada reintento)
  useEffect(() => {
    const controller = new AbortController()

    async function cargarProductos() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/productos.json`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        const data = await res.json()
        setProductos(data)
      } catch (err) {
        // Un abort (desmontaje / StrictMode) no es un error real
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    return () => controller.abort() // limpieza del efecto
  }, [intento])

  // Reinicia los estados de carga y dispara de nuevo el efecto
  function reintentar() {
    setError(null)
    setCargando(true)
    setIntento((n) => n + 1)
  }

  // Agrega un juego al catálogo (id autoincremental)
  function agregarProducto(nuevo) {
    setProductos((prev) => {
      const id = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1
      return [...prev, { ...nuevo, id }]
    })
  }

  // Elimina un juego del catálogo
  function eliminarProducto(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  return { productos, cargando, error, reintentar, agregarProducto, eliminarProducto }
}