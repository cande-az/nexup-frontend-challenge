/**
 * Lee un parámetro de la URL de forma genérica.
 * @param search - String de búsqueda de la URL (ej: "?category=Fruit&q=manzana")
 * @param paramName - Nombre del parámetro a leer
 * @returns El valor del parámetro encontrado o null si no existe
 */
export function readUrlParam(search: string, paramName: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(paramName);
}

/**
 * Escribe un parámetro en la URL del navegador de forma genérica.
 * @param paramName - Nombre del parámetro a escribir
 * @param value - Valor a establecer o null para eliminar
 * @param options - Opciones: trim para limpiar espacios, validator para validar valores
 */
export function writeUrlParam(paramName: string, value: string | null): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  // ?: Si el valor es el mismo, no hacemos nada.
  const current = params.get(paramName);
  if (value === current || (value === null && current === null)) return;

  // ?: Si el valor es null, eliminamos el parámetro.
  if (value === null || value === undefined || value === '')
    params.delete(paramName);
  else params.set(paramName, value);

  // ?: Actualizamos la URL.
  window.history.pushState({}, '', url.toString());
}
