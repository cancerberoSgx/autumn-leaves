/** easily list given enum's keys as an array */
export function list(anEnum: any): string[] {
    const a = []
    for(let i in anEnum){
      a.push(i)
    }
    return a
  }