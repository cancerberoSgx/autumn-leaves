let counter = 0
export function getUniqueId(){
  return ""+counter++
}


export function jsonParseOr<K>(s: string, defaultValue: K): K {
  let val : K = defaultValue
  try {
    val = JSON.parse(s)
  } catch (error) {
  }
  return val
}

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
