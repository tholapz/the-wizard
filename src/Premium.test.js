import React from 'react';
import { shallow } from 'enzyme';

import { Premium } from './Premium';
import mockUser from './mockUser'; 

it('should call submitUser() if all fields are good', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(
		<Premium user={mockUser} submitUser={mockSubmitUser} />,
		{ disableLifecycleMethods: true }
	);
	wrapper.setState({ isValid: true });
	wrapper.find('.btn-primary').simulate('click');

	expect(mockSubmitUser.mock.calls.length).toBe(1);
});

it('should not call submitUser() if not valid', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(
		<Premium user={mockUser} submitUser={mockSubmitUser} />,
		{ disableLifecycleMethods: true }
	);
	wrapper.setState({ isValid: false });
	wrapper.find('.btn-primary').simulate('click');

	expect(mockSubmitUser.mock.calls.length).toBe(0);
});