import React from 'react';
import { shallow } from 'enzyme';
import LetterIndicator from './LetterIndicator';

it('renders without crashing', () => {
  shallow(<LetterIndicator />);
});

it('Renders correct letter', () => {
  const letter = 'some-letter';
  const wrapper = shallow(<LetterIndicator letter={letter}/>);
  expect(wrapper.find('.letter-indicator-js')).toHaveText(letter);
})

it('Renders correct c and r props', () => {
  const c = 1;
  const r = 2;
  const wrapper = shallow(<LetterIndicator c={c} r={r}/>);
  expect(wrapper.find('.letter-indicator-js')).toHaveClassName('grid-item-'+c+'-'+r);
})
