import React from 'react';
import { shallow } from 'enzyme';
import DirectionIndicator from './DirectionIndicator';

it('Renders without crashing', () => {
  shallow(<DirectionIndicator />);
});

it('Renders with correct props c and r', () => {
  const c = 1;
  const r = 2;
  const wrapper = shallow(<DirectionIndicator c={c} r={r} />);
  expect(wrapper.find('.direction-indicator-js')).toHaveClassName('grid-item-'+c+'-'+r);
});

it('Renders / correctly with forward direction', () => {
  const direction = 'forward';
  const wrapper = shallow(<DirectionIndicator direction={direction} />);
  expect(wrapper.find('.direction-js')).toHaveText('/');
});

it('Renders \\ correctly with some other direction', () => {
  const direction = 'other-direction';
  const wrapper = shallow(<DirectionIndicator direction={direction} />);
  expect(wrapper.find('.direction-js')).toHaveText('\\');
});
