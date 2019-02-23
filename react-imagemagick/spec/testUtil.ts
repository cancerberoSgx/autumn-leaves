
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';

export function install(){
  (global as any).Worker = class { };
  configure({ adapter: new Adapter() });
}


export {sleep} from 'misc-utils-of-mine-generic'