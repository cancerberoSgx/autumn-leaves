export async function readUrlContent(url: string): Promise<Uint8Array> {
  let fetchedSourceImage = await fetch(url)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let sourceBytes = new Uint8Array(arrayBuffer)
  return sourceBytes
}