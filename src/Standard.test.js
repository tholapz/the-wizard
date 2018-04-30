import React from 'react';
import { shallow } from 'enzyme';

import { Standard } from './Standard';
import mockUser from './mockUser'; 

it('should call submitUser() if all fields are good', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(<Standard user={mockUser} submitUser={mockSubmitUser} />);
	wrapper.find('.btn-primary').simulate('click');
	expect(mockSubmitUser.mock.calls.length).toBe(1);
});

it('should not call submitUser() if getValidationState does not pass', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(<Standard user={mockUser} submitUser={mockSubmitUser} />);
	wrapper.setState({country: ''});
	wrapper.find('.btn-primary').simulate('click');
	expect(mockSubmitUser.mock.calls.length).toBe(0);
});
