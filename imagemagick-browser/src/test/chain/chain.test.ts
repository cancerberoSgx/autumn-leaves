import { convert } from '../..';

describe('chain', () => {
  it('chain method should return a new Chain', () => {
    const command1 = convert({ name: 'img1.png' }).rotate(33).image('output.png').toCommand()
    expect(command1).toEqual(['convert', 'img1.png', '-rotate', '33', 'output.png'])
  })
})