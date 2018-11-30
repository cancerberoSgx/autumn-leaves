
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';

export function install(){

  (global as any).Worker = class { };
  configure({ adapter: new Adapter() });
}



export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}
