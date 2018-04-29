import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import moment from 'moment';

import App from './App';
import Home from './Home';
import Standard from './Standard';
import Premium from './Premium';
import Conclusion from './Conclusion';
import Parent from './Parent';
import { accountType, step } from './constant';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders based on state.step', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({ step: step.STANDARD });
	expect(wrapper).toContainReact(<Standard/>);
	wrapper.setState({ step: step.PREMIUM });
	expect(wrapper).toContainReact(<Premium/>);
	wrapper.setState({ step: step.PARENT });
	expect(wrapper).toContainReact(<Parent/>);
});

it('should always display collected information so far', () => {
	const wrapper = shallow(<App />);
	expect(wrapper).toContainReact(<Conclusion/>);
	wrapper.setState({step: 'SOME_INVALID_STEP'});
	expect(wrapper).toContainReact(<Conclusion/>);
});

it('should go from Home to Conclusion if account type is Lite', () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();
	instance.submitUser({ accountType: accountType.LITE });
	expect(wrapper.state('step')).toEqual(step.CONCLUSION);
});

it('should go from Home to Standard if account type is not Lite', () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();

	instance.submitUser({ accountType: accountType.STANDARD }, step.HOME);
	expect(wrapper.state('step')).toEqual(step.STANDARD);
});

it('should go from Standard to Parent if not older than 14 years', () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();

	instance.submitUser({
		accountType: accountType.PREMIUM,
		dob: moment('12/14/2017', 'MM/DD/YYYY')
	}, step.STANDARD);
	expect(wrapper.state('step')).toEqual(step.PARENT);
});

it('should go from Standard to Premium if account type is PREMIUM', () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();

	instance.submitUser({
		accountType: accountType.PREMIUM
	}, step.STANDARD);
	expect(wrapper.state('step')).toEqual(step.PREMIUM);
});

it('should go from Parent to Premium if account type is PREMIUM', () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();

	instance.submitUser({
		accountType: accountType.PREMIUM
	}, step.PARENT);
	expect(wrapper.state('step')).toEqual(step.PREMIUM);
});
