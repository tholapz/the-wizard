import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { Checkbox, Button, ControlLabel } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Standard.css';

import { UserContext } from './UserContext';
import FieldGroup from './Components/FieldGroup';
import { accountType } from './constant';

const emailAddressRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

class Standard extends Component {
  static props = {
    user: PropTypes.object
  };

  state = Object.assign({}, this.props.user, { dob: moment().subtract(10, 'years') });

  getValidationState = () => {
    return emailAddressRegExp.test(this.state.email) ? 'success' : 'error';
  };

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  continueSubmit = () => {
    if (this.state.accountType === accountType.LITE) return 'Submit';
    return 'Continue';
  }

  handleSubmit = () => {
    if (this.getValidationState() === 'success') {
      this.props.submitUser(this.state);
    }
  }

  render() {
    return (
      <div>
        <FieldGroup
          id="formControlsCountry"
          type="text"
          label="Country"
          placeholder="Enter Country"
          value={this.state.country}
          onChange={this.handleChange('country')}
        />
        <div className="form-group">
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
        >{this.continueSubmit()}</Button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>{ ({user, submitUser}) => <Standard {...props} user={user} submitUser={submitUser}/> }</UserContext.Consumer>
);