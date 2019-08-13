import React from 'react';
import { shallow } from 'enzyme';
import Stitch from './Stitch';

it('Renders without crashing', () => {
  shallow(<Stitch />);
});

// Status
it('Correct status', () => {
  const status = 'some-status';
  const wrapper = shallow(<Stitch status={status} />);
  expect(wrapper.find('.oval')).toHaveClassName('oval__' + status);
});

// Color
it('Correct color for double stitch', () => {
  const color = 'some-color';
  const wrapper = shallow(<Stitch isDouble={true} color={color} />);
  expect(wrapper.find('.double-oval')).toHaveStyle({backgroundColor: color});
});

it('Correct color for normal stitch', () => {
  const color = 'some-color';
  const wrapper = shallow(<Stitch isDouble={false} color={color} />);
  expect(wrapper.find('.oval')).toHaveStyle({backgroundColor: color});
});

// Against master stitch direction
it('Against master direction', () => {
  const wrapper = shallow(<Stitch againstMasterDir={true} />);
  expect(wrapper.find('.stitch')).toHaveClassName('stitch__against');
  expect(wrapper.find('.stitch')).not.toHaveClassName('stitch__along');
});

it('Along master direction', () => {
  const wrapper = shallow(<Stitch againstMasterDir={false} />);
  expect(wrapper.find('.stitch')).toHaveClassName('stitch__along');
  expect(wrapper.find('.stitch')).not.toHaveClassName('stitch__against');
});

// Doubleness
it('Double stitch is rendered correctly', () => {
  const wrapper = shallow(<Stitch isDouble={true} />);
  expect(wrapper.find('.oval')).toHaveClassName('oval');
  expect(wrapper.find('.double-oval')).toHaveClassName('double-oval');
})

it('Normal stitch is not a double stitch', () => {
  const wrapper = shallow(<Stitch isDouble={false} />);
  expect(wrapper.find('.oval')).toHaveClassName('oval');
  expect(wrapper.find('.double-oval')).not.toHaveClassName('double-oval');
})
