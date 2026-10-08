import { useState, useEffect } from 'react'

const CLAVE_STORAGE = 'gamezone-carrito'

// Lee el carrito guardado; si no existe o está dañado, parte con uno vacío
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

// Hook del carrito: estado, operaciones y persistencia en localStorage
export function useCarrito() {
  // Inicialización perezosa: se lee localStorage solo en el primer render
  const [carrito, setCarrito] = useState(leerCarritoGuardado)

  // Efecto: guarda el carrito cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito))
    } catch {
      // localStorage no disponible: el carrito sigue funcionando en memoria
    }
  }, [carrito])

  // Cantidad total de unidades (para el badge del navbar y del panel)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function modificarCantidad(id, delta) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  // Vacía el carrito por completo
  function vaciarCarrito() {
    setCarrito([])
  }

  return { carrito, cantidadTotal, agregarAlCarrito, modificarCantidad, eliminarDelCarrito, vaciarCarrito }
}