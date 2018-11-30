
import { install } from '../testUtil';
install()

const jasmineEnzyme = require('jasmine-enzyme');
import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { BooleanEditor } from '../../src';
import { ArgumentChangeEvent } from 'imagemagick-browser';

describe('BooleanEditor', () => {

  beforeEach(jasmineEnzyme)

  it('show render with unchecked by default', async done => {
    const values :  ArgumentChangeEvent<boolean>[]= []
    const onButtonClick = (e: ArgumentChangeEvent<boolean>) => { 
      values.push(e)
    }
    const ed = <BooleanEditor onChange={onButtonClick} />
    const wrapper = shallow(ed)
    expect(wrapper).toHaveState('value', false)  
    expect(values.length).toBe(0)
    expect(wrapper.find('input')).not.toBeChecked();
    wrapper.find('input').simulate('change', {target: {checked: true}});
    expect(wrapper.find('input')).toBeChecked();

    expect(values.length).toBe(1)
    expect(values[0].value).toBe(true)
    expect(wrapper).toHaveState('value', true)

    wrapper.find('input').simulate('change', {target: {checked: false}});
    expect(wrapper.find('input')).not.toBeChecked();
    expect(wrapper).toHaveState('value', false)
    expect(values.length).toBe(2)
    expect(values[1].value).toBe(false)
    done()
  })

  xit('show render with unchecked by default', async done => {
    function Fixture() {
      return (
        <div>
          <input id="disabled" disabled />
          <input id="not" />
        </div>
      );
    }
    const wrapper = shallow(<Fixture />)
    expect(wrapper.find('#disabled')).toBeDisabled();
    expect(wrapper.find('#not')).not.toBeDisabled();
    done()
  })

});
