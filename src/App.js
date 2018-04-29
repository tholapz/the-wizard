import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import 'react-dates/initialize';
import moment from 'moment';

import './App.css';
import { UserContext } from './UserContext';
import Home from './Home';
import Standard from './Standard';
import Premium from './Premium';
import Conclusion from './Conclusion';
import Parent from './Parent';
import { accountType, step } from './constant';

const isUnder14 = dob => {
  if (!dob) return false;
  const age = moment().diff(dob, 'years');
  return age < 14;
};

class App extends Component {
  static props = {
    user: PropTypes.object.isRequired
  };

  state = {
    user: null,
    submitUser: null,
    step: step.HOME
  };

  submitUser = (newData, fromStep) => {
    let newStep = step.CONCLUSION;
    if (fromStep === step.HOME && newData.accountType !== accountType.LITE) {
      newStep = step.STANDARD;
    } else if (fromStep === step.STANDARD && isUnder14(newData.dob)) {
      newStep = step.PARENT;
    } else if (fromStep === step.STANDARD && newData.accountType === accountType.PREMIUM) {
      newStep = step.PREMIUM;
    } else if (fromStep === step.PARENT && newData.accountType === accountType.PREMIUM) {
      newStep = step.PREMIUM;
    }
    this.setState({
      user: newData,
      step: newStep
    });
  };

  componentWillMount() {
    this.setState({
      user: this.props.user,
      submitUser: this.submitUser
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Form className="container app-container">
          <h1>The Wizard</h1>
          <Conclusion/>
          { this.state.step === step.HOME && <Home/> }
          { this.state.step === step.STANDARD && <Standard/> }
          { this.state.step === step.PREMIUM && <Premium/> }
          { this.state.step === step.PARENT && <Parent/> }
        </Form>
      </UserContext.Provider>
    );
  }
}

export default App;