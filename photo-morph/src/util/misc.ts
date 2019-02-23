import { MagickFile, loadImageElement } from 'wasm-imagemagick';
import pMap from 'p-map';

let counter = 0
export function getUniqueId(){
  return ""+counter++
}

export {parseJSON as jsonParseOr} from 'misc-utils-of-mine-generic'
// export function jsonParseOr<K>(s: string, defaultValue: K): K {
//   let val : K = defaultValue
//   try {
//     val = JSON.parse(s)
//   } catch (error) {
//   }
//   return val
// }

// TODO: use misc localStorageGetJSON
export function getFromLS(key) {
  let ls = {}
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8")) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key]
}
// TODO: use misc localStorageGetJSON
export function saveToLS(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    )
  }
}


export async function showImages(images: MagickFile[]|MagickFile): Promise<HTMLImageElement[]> {
  images = Array.isArray(images) ? images : [images]
  return await pMap(images, async image => {
    const el = document.createElement('img')
    el.title = el.alt = image.name
    document.body.appendChild(el)
    return loadImageElement(image, el)
  }, {concurrency: 1})
}
