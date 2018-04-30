import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { UserContext } from './UserContext';
import FieldGroup from './Components/FieldGroup';
import { step } from './constant';

const emailAddressRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export class Parent extends Component {
  static props = {
    user: PropTypes.object
  };

  state = Object.assign({}, this.props.user);

  getValidationState = field => {
    switch (field) {
      case 'parentEmail':
        return emailAddressRegExp.test(this.state.parentEmail) ? 'success' : 'error'; 
      default:
        console.error('unknown validation field', field);
        break;
    }
  };

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = () => {
    if (this.getValidationState('parentEmail') !== 'success') return;

    this.props.submitUser(this.state, step.PARENT);
  }

  render() {
    return (
      <div>
        <FieldGroup
          id="formControlsParentEmail"
          type="email"
          label="Parent's Email address to send Consent"
          placeholder="Enter email"
          value={this.state.parentEmail}
          validationState={this.getValidationState('parentEmail')}
          onChange={this.handleChange('parentEmail')}
        />
        <Button
          className="btn-primary"
          onClick={this.handleSubmit}
        >Continue</Button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>{ ({user, submitUser}) => <Parent {...props} user={user} submitUser={submitUser}/> }</UserContext.Consumer>
);