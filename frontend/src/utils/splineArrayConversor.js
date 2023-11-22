export function getDomainString(x, y) {
  // convertimos x e y a array
  x = JSON.parse(x);
  y = JSON.parse(y);
  // obtenemos el minimo y maximo de x
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  // obtenemos el minimo y maximo de y
  const yMin = Math.min(...y);
  const yMax = Math.max(...y);
  // retornamos el string
  return `${xMin},${xMax},${yMin},${yMax}`;
}
