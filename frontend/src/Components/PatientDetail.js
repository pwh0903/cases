import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from '@material-ui/core';


class PatientDetail extends Component {
    constructor() {
        super();
        this.state = {
            patient: [],
        }
    }

    getPatient(id){
        $.ajax({
          url: 'http://127.0.0.1:8000/patients/api/patients/' + id,
          dataType: 'json',
          cache: false,
          success: function(data){
            this.setState({patient: data});
          }.bind(this),
          error: function(xhr, status, err){
            console.log(err);
          }
        });
      }
    
    componentDidMount(){
        this.getPatient(this.props.match.params.id);
    }

    deletePatient(id){
        this.props.onDelete(id);
    }

    render() {
        return (
            <div>
            <li className="Patient">
                {this.state.patient.name} - {this.state.patient.age}
            </li>
            </div>
        );
    }
}

export default PatientDetail;
