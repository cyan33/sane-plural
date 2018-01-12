export function type(o) {
  return toString.call(o).slice(8, -1).toLowerCase()
}
