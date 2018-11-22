import { getFileName, MagickFile } from 'wasm-imagemagick';

export function getFileNameWithoutExtension(filePathOrUrlOrFile: string | MagickFile) {
  const s = getFileName(typeof filePathOrUrlOrFile === 'string' ? filePathOrUrlOrFile : filePathOrUrlOrFile.name)
  return s.substring(0, s.lastIndexOf('.'))
}