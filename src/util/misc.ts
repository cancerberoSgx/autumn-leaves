export function clone(a: any): any {
  return JSON.parse(JSON.stringify(a))
}
export function query(selector: string): Element[] {
  const result = document.querySelectorAll(selector)
  const arr: Element[] = []
  for (let i = 0; i < result.length; i++) {
    const element = result.item(i)
    arr.push(element)
  }
  return arr
}