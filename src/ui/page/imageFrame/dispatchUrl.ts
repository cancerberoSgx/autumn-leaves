import { CommandTemplate, TemplateContext } from 'imagemagick-browser';
import { config } from '../../main/config';

export interface UrlData {
  template: string
  context: TemplateContext,
  image?: string
}

export function dispatchUrl(url_: string = window.location.href): UrlData {
  // debugger
  let url = new URL(url_)

  if (config.hashRouter) {
    // heads up! reparsing url from hash if we are using a HashRouter
    const newUrlString = 'http://localhost/' + url.hash.substring(2, url.hash.length)
    url = new URL(newUrlString)
  }

  return {
    template: url.searchParams.get('template'),
    context: JSON.parse(url.searchParams.get('context')),
    image: url.searchParams.get('image')
  }
}

export function buildUrl(template: CommandTemplate, data: UrlData): string {
  return 'TODO'
}