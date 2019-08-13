import React from 'react';
import { shallow } from 'enzyme';
import ColorPanel from './ColorPanel';

it('Renders with correct colors and changeFn', () => {
  const colors = ['some-color-1', 'some-color-2'];
  const someFunction = () => {};
  const wrapper = shallow(<ColorPanel colors={colors} handleChange={someFunction}/>);
  expect(wrapper.find('.color-panel-js')).toExist();
  expect(wrapper.find('ColorButton')).toExist();
  expect(wrapper.find('ColorButton').at(0).prop('color')).toEqual(colors[0]);
  expect(wrapper.find('ColorButton').at(1).prop('color')).toEqual(colors[1]);
  expect(wrapper.find('ColorButton').at(0).prop('handleChange')).toEqual(someFunction);
  expect(wrapper.find('ColorButton').at(1).prop('handleChange')).toEqual(someFunction);
})
