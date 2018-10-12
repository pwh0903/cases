import React, { Component } from 'react';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import PatientsList from './Components/PatientsList';
import PatientAdd from './Components/PatientAdd';
import PatientDetail from './Components/PatientDetail';
import PatientEdit from './Components/PatientEdit';
import Login from './Components/Login';

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
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={PatientsList} exact></Route>
                    <Route path="/login" component={Login} exact></Route>
                    <Route path="/detail/:id" component={PatientDetail}></Route>
                    <Route path="/edit/:id" component={PatientEdit}></Route>
                    <Route path="/add" component={PatientAdd}></Route>
                    <Redirect to="/"></Redirect>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
