// Formatea un precio en pesos chilenos; el precio 0 se muestra como "Gratis"
export function formatearPrecio(precio) {
  return precio === 0 ? 'Gratis' : '$' + precio.toLocaleString('es-CL')
}