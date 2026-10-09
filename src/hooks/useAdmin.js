import { useState } from 'react'

const CLAVE_SESION = 'gamezone-admin'
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS

// Hook de la sesión de administrador simulada (dura mientras dure la pestaña)
export function useAdmin() {
  const [esAdmin, setEsAdmin] = useState(() => sessionStorage.getItem(CLAVE_SESION) === 'true')

  // Login simulado: las credenciales vienen del .env
  function iniciarSesion(usuario, clave) {
    if (ADMIN_USER && ADMIN_PASS && usuario === ADMIN_USER && clave === ADMIN_PASS) {
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