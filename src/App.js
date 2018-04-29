import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Form } from 'react-bootstrap';

import './App.css';
import { UserContext } from './UserContext';
import Home from './Home';
import Standard from './Standard';
import Premium from './Premium';
import Conclusion from './Conclusion';

const step = { HOME: 0, STANDARD: 1, PREMIUM: 2, CONCLUSION: 3 };
const stepMapper = [step.CONCLUSION, step.STANDARD, step.STANDARD];

class App extends Component {
  static props = {
    user: PropTypes.object.isRequired
  };

  state = {
    user: null,
    submitUser: null,
    step: step.HOME
  };

  submitUser = (newData) => {
    this.setState({
      user: newData,
      step: stepMapper[newData.accountType]
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
          { this.state.step === step.HOME && <Home/> }
          { this.state.step === step.STANDARD && <Standard/> }
          { this.state.step === step.PREMIUM && <Premium/> }
          { this.state.step === step.CONCLUSION && <Conclusion/> }
        </Form>
      </UserContext.Provider>
    );
  }
}

export default App;