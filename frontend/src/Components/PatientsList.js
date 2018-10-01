import React, { Component } from 'react';
import $ from 'jquery'
import { BrowserRouter as Router , Link, Route, Switch } from 'react-router-dom';
import PatientDetail from './PatientDetail'
import PatientEdit from "./PatientEdit"
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class PatientsList extends Component {
  constructor(){
    super();
    this.state = {
      patients: []
    }
  }
  
  getPatients(){
    $.ajax({
      url: 'http://127.0.0.1:8000/patients/api/patients/',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({patients: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  deletePatient(id){

  }

  componentDidMount(){
    this.getPatients();
  }

  deletePatient(id){
    console.log(id);
  }

  editPatient(id){

  };

  detailPatient(id){
    const w = window.open('about:blank');
    w.location.href='/';
  };

  render() {
    return (
      <Router>
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell numeric>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.patients.map(patient => {
            return (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}
                  <Button variant="contained" component={Link} to={"/test/" + patient.id}>
                    test
                  </Button>
                  <Button variant="contained" component={Link} to={"/detail/" + patient.id} >
                    详情
                  </Button>
                  <Button variant="contained" color="primary" component={Link} to={"/edit/" + patient.id}>
                    修改
                  </Button>
                  <Button variant="contained" color="secondary" onClick={this.deletePatient.bind(this, patient.id)}> 
                    删除
                  </Button>
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell numeric>{patient.age}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Switch>
          <Route path="/detail/:id" component={PatientDetail}></Route>
          <Route path="/edit/:id" component={PatientEdit}></Route>
      </Switch>
      {/* <PatientEdit /> */}
    </Paper>
    </Router>
    );
  }
}


export default PatientsList;
