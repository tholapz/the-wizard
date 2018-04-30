import React from 'react';
import { shallow } from 'enzyme';

import { Parent } from './Parent';
import mockUser from './mockUser'; 

it('should call submitUser() if all fields are good', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(<Parent user={mockUser} submitUser={mockSubmitUser} />);
	wrapper.find('.btn-primary').simulate('click');
	expect(mockSubmitUser.mock.calls.length).toBe(1);
});

it('should not call submitUser() if getValidationState does not pass', () => {
	const mockSubmitUser = jest.fn();
	const wrapper = shallow(<Parent user={mockUser} submitUser={mockSubmitUser} />);
	wrapper.setState({parentEmail: 'invalidemail'});
	wrapper.find('.btn-primary').simulate('click');
	expect(mockSubmitUser.mock.calls.length).toBe(0);
});
