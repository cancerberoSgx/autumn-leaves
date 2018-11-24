let counter = 0
export function getUniqueId(){
  return ""+counter++
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
