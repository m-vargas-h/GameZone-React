import { useState } from 'react'

const CLAVE_SESION = 'gamezone-admin'

// Hook de la sesión de administrador simulada (dura mientras dure la pestaña)
export function useAdmin() {
  const [esAdmin, setEsAdmin] = useState(() => sessionStorage.getItem(CLAVE_SESION) === 'true')

  // Login simulado: las credenciales están en el frontend (no es seguridad real)
  function iniciarSesion(usuario, clave) {
    if (usuario === 'admin' && clave === 'gamezone123') {
      setEsAdmin(true)
      sessionStorage.setItem(CLAVE_SESION, 'true')
      return true
    }
    return false
  }

  function cerrarSesion() {
    setEsAdmin(false)
    sessionStorage.removeItem(CLAVE_SESION)
  }

  return { esAdmin, iniciarSesion, cerrarSesion }
}