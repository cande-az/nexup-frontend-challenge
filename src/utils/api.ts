/**
 * Construye un query string a partir de un objeto de filtros genérico.
 * Solo incluye parámetros que tienen valor (no undefined/null).
 *
 * @param filters - Objeto con filtros opcionales de tipo T
 * @returns Query string formateado (ej: "?category=Fruit&status=Active") o string vacío si no hay filtros
 */
export const buildQueryString = <T extends Record<string, unknown>>(
  filters?: T,
): string => {
  if (!filters) {
    return '';
  }

  const params = new URLSearchParams();

  Object.entries(filters as Record<string, unknown>).forEach(([key, value]) => {
    if (!value) {
      return;
    }

    params.append(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Convierte un error desconocido a un error con un mensaje por defecto.
 *
 * @param err - Error desconocido
 * @returns Error con un mensaje por defecto
 */
export function toError(err: unknown): Error {
  return err instanceof Error
    ? err
    : new Error('Error desconocido al cargar productos');
}
