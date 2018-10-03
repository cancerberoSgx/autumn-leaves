import { convert } from '../../chain';

describe('chain', () => {
  it('chain method should return a new Chain', () => {
    // debugger
    const command1 = convert({ name: 'img1.png' }).rotate(33).image('output.png').toCommand()
    expect(command1).toEqual(['convert', 'img1.png', '-rotate', '33', 'output.png'])
    // console.log(command1);
    // expect(1).toBe(1)

  })
})