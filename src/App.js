import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import 'react-dates/initialize';

import './App.css';
import { UserContext } from './UserContext';
import Home from './Home';
import Standard from './Standard';
import Premium from './Premium';
import Conclusion from './Conclusion';
import { accountType, step } from './constant';

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
    } else if (fromStep === step.STANDARD && newData.accountType === accountType.PREMIUM) {
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
        </Form>
      </UserContext.Provider>
    );
  }
}

export default App;