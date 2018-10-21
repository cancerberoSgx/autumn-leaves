/** easily list given enum's keys as an array */
export function list(anEnum: any): string[] {
  const a = []
  for (let i in anEnum) {
    a.push(i)
  }
  return a
}

export function stringToUInt8Array(s: string): Uint8Array {
  var enc = new TextEncoder(); // always utf-8
  return enc.encode(s)
}