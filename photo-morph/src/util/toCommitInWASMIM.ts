import { getFileName, MagickFile, extractInfo, ExecuteResult } from 'wasm-imagemagick';
import { ExtractInfoResult } from 'wasm-imagemagick/dist/src/util/imageExtractInfoTypes';

export function getFileNameWithoutExtension(filePathOrUrlOrFile: string | MagickFile) {
  const s = getFileName(typeof filePathOrUrlOrFile === 'string' ? filePathOrUrlOrFile : filePathOrUrlOrFile.name)
  return s.substring(0, s.lastIndexOf('.'))
}
export async function extractInfoOne(img: MagickFile): Promise<ExtractInfoResult> {
  const info = await extractInfo(img)
  return info[0]
}
