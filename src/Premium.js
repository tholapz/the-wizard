import React, { Component } from 'react';
import Payment from 'payment';
import ReactCreditCard from 'react-credit-cards';
import { Button } from 'react-bootstrap';

import { UserContext } from './UserContext';
import { step } from './constant';
import FieldGroup from './Components/FieldGroup';
import 'react-credit-cards/es/styles-compiled.css';

class Premium extends Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
    isValid: false
  };

  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback = (type, isValid) => {
  	this.setState({ isValid });
  };

  handleSubmit = (e) => {
  	if (!this.state.isValid) return;
    this.props.submitUser({ ...this.props.user, card: this.state }, step.PREMIUM);
  };

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div>
        <ReactCreditCard
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={this.handleCallback}
        />
        <FieldGroup
          id="formControlsCardNumber"
          type="tel"
          name="number"
          label="Card Number"
          placeholder="Card Number"
          validationState={this.state.isValid ? 'success' : 'error'}
          onKeyUp={this.handleInputChange}
          onFocus={this.handleInputFocus}
        />
        <FieldGroup
          id="formControlsName"
          type="text"
          label="Card Holder's Name"
          name="name"
          placeholder="Name"
          onKeyUp={this.handleInputChange}
          onFocus={this.handleInputFocus}
        />
        <div>
          <FieldGroup
          	id="formControlsExpiry"
            type="tel"
            name="expiry"
            label="Valid Thru"
            placeholder="Valid Thru"
            onKeyUp={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <FieldGroup
          	id="formControlsCvc"
            type="tel"
            name="cvc"
            label="CVC"
            placeholder="CVC"
            onKeyUp={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </div>
        <Button
          className="btn-primary"
          onClick={this.handleSubmit}
        >Submit</Button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>{ ({user, submitUser}) => <Premium {...props} user={user} submitUser={submitUser}/> }</UserContext.Consumer>
);