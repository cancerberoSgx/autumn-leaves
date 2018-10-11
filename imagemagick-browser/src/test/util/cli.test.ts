import { convert } from '../..';
import { arrayToIMCommand } from '../../util/cli';

describe('cli utils', () => {
  it('arrayToIMCommand', () => {
    const result = arrayToIMCommand(['convert', '$INPUT', '-sharpen', '10x8', '$OUTPUT'])
    console.log(result);
    
  })
})