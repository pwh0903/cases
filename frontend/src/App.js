import React, { Component } from 'react';
import PatientsList from './Components/PatientsList';
import PatientAdd from './Components/PatientAdd';

class App extends Component {
  constructor(){
    super();
    this.state = {
      patients: []
    };
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        {/* <PatientsList /> */}
        <PatientAdd />
      </div>
    );
  }
}

export default App;
