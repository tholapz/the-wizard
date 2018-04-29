import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox, Button, ControlLabel } from 'react-bootstrap';

import { UserContext } from './UserContext';
import FieldGroup from './Components/FieldGroup';
import { accountType } from './constant';

const emailAddressRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

class Home extends Component {
  static props = {
    user: PropTypes.object
  };

  state = this.props.user;

  getValidationState = () => {
    return emailAddressRegExp.test(this.state.email) ? 'success' : 'error';
  };

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleAccountTypeChange = type => e => {
    const accountType = e.target.checked ? type : type - 1;
    this.setState({ accountType });
  }

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
          id="formControlsUsername"
          type="text"
          label="Username"
          placeholder="Enter Username"
          value={this.state.username}
          onChange={this.handleChange('username')}
        />
        <FieldGroup
          id="formControlsFirst"
          type="text"
          label="First Name"
          placeholder="Enter first name"
          value={this.state.first}
          onChange={this.handleChange('first')}
        />
        <FieldGroup
          id="formControlsLast"
          type="text"
          label="Last Name"
          placeholder="Enter last name"
          value={this.state.last}
          onChange={this.handleChange('last')}
        />
        <FieldGroup
          id="formControlsEmail"
          type="email"
          label="Email address"
          placeholder="Enter email"
          value={this.state.email}
          validationState={this.getValidationState()}
          onChange={this.handleChange('email')}
        />
        <ControlLabel>Account Type</ControlLabel>
        <Checkbox
          name="formControlsStandard"
          type="checkbox"
          disabled={this.state.accountType === accountType.PREMIUM}
          checked={this.state.accountType !== accountType.LITE}
          onChange={this.handleAccountTypeChange(accountType.STANDARD)}
        >Standard</Checkbox>
        <Checkbox
          name="formControlsPremium"
          type="checkbox"
          checked={this.state.accountType === accountType.PREMIUM}
          onChange={this.handleAccountTypeChange(accountType.PREMIUM)}
        >Premium</Checkbox>
        <Button
          className="btn-primary"
          onClick={this.handleSubmit}
        >{this.continueSubmit()}</Button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>{ ({user, submitUser}) => <Home {...props} user={user} submitUser={submitUser}/> }</UserContext.Consumer>
);