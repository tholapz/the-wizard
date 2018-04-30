import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { Button, ControlLabel } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';
import { CountryDropdown } from 'react-country-region-selector';
import cx from 'classnames';

import 'react-dates/lib/css/_datepicker.css';
import './Standard.css';

import { UserContext } from './UserContext';
import { accountType, step } from './constant';

export class Standard extends Component {
  static props = {
    user: PropTypes.object
  };

  state = Object.assign(
    {
      country: ''
    },
    this.props.user
  );

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = () => {
    if (!this.getValidationState('country')) return;
    if (!this.getValidationState('dob')) return;
    this.props.submitUser(this.state, step.STANDARD);
  };

  getValidationState = field => {
    switch (field) {
      case 'country':
        return this.state.country.length > 0;
      case 'dob':
        return this.state.dob && moment().diff(this.state.dob) > 0
      default:
        console.error('unknown validation field', field);
        break;
    }
  }

  render() {
    return (
      <div>
        <div className={cx('form-group', { 'has-error': !this.getValidationState('country')})}>
          <ControlLabel>Country</ControlLabel>
          <CountryDropdown
            classes="form-control"
            value={this.state.country}
            onChange={country => this.setState({ country })} />
        </div>
        <div className={cx('form-group', { 'has-error': !this.getValidationState('dob')})}>
        <ControlLabel>Date of Birth</ControlLabel>
        <SingleDatePicker
          date={this.state.dob}
          onDateChange={dob => this.setState({ dob })}
          focused={this.state.focused}
          isOutsideRange={() => false}
          numberOfMonths={1}
          block={true}
          onFocusChange={({ focused }) => this.setState({ focused })} />
        </div>
        <Button
          className="btn-primary"
          onClick={this.handleSubmit}
        >{this.state.accountType === accountType.STANDARD ? 'Submit' : 'Continue'}</Button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>{ ({user, submitUser}) => <Standard {...props} user={user} submitUser={submitUser}/> }</UserContext.Consumer>
);