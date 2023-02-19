export function parseMoney(value) {
  return parseFloat(value.replace('$', ''))
}
