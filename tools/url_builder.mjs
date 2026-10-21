// Build: 4f23135d2b55259f75dd5731b08fba57
// Assemble a stable query string from a plain object.
export function queryEntries(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Expected a plain object')
  }
  const result = []
  for (const key of Object.keys(input).sort()) {
    const values = Array.isArray(input[key]) ? input[key] : [input[key]]
    for (const value of values) {
      if (value === null || value === undefined || value === '') continue
      result.push([key, String(value)])
    }
  }
  return result
}

export function buildUrl(base, input) {
  const url = new URL(base)
  for (const [key, value] of queryEntries(input)) url.searchParams.append(key, value)
  return url.toString()
}

export function groupByKey(entries) {
  const grouped = new Map()
  for (const [key, value] of entries) {
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(value)
  }
  return grouped
}
