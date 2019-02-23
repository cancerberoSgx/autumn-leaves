/** easily list given enum's keys as an array */
export {enumKeys as list} from 'misc-utils-of-mine-typescript'
export {stringToUInt8Array} from 'misc-utils-of-mine-dom'
export {seq} from 'misc-utils-of-mine-generic'

export function toCliArg(arg: string): string {
  return arg.match(/[\s()]/) ? `'${arg}'` : arg // quote if includes spaces or parenthesis
}
