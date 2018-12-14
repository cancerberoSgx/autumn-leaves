import { list } from 'imagemagick-browser';

export function getLocale(): Locale{
  return locale
}

export enum Locale {
  'en-US'='en-US',
  'es-ES'='es-ES'
}

export function setLocale(l: Locale){
  locale = l
  //TODO: save in localStorage?
}

let locale: Locale = list(Locale).indexOf(window.navigator.language) ===-1 ? Locale["es-ES"] : Locale[window.navigator.language]

export function translate(k:LocaleKey, ...args: string[]) :string {
  const expr = getLocaleDict(getLocale()).get(k)
  if(typeof expr === 'string'){
    return expr
  }
  else if(expr) {
    return expr.apply(null, args)
  }
  else {
    return k
  }
}


export type LocaleKey = 'lock-layout'|'options'
export type LocaleValue = string|((...args)=>string)
export type LocaleDic = Map<LocaleKey, LocaleValue>// {[k: LocaleKey]: LocaleValue}
let localeDicts: {[l:string]: LocaleDic} 

function getLocaleDict(l: Locale): LocaleDic {
if(!localeDicts){
  localeDicts = {}
  list(Locale).forEach(l=>{
    localeDicts[l] = locales[l] || {}
  })
}
return localeDicts[l]
}



const spanish: LocaleDic = new Map()
spanish.set('lock-layout', 'Bloquear Layout')

const english: LocaleDic  = new Map()
english.set('lock-layout', 'Lock Layout')

const locales = {
  [Locale['en-US']]: english,
  [Locale['es-ES']]: spanish,
}