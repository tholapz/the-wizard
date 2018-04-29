import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FieldGroup from './FieldGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FieldGroup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
