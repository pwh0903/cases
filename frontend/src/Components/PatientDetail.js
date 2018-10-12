import React, { Component } from 'react';
import $ from 'jquery';
import Button from '@material-ui/core/Button'

import PatientBasic from './PatientBasic';
import TreatmentForm from './TreatmentForm';


class PatientDetail extends Component {
    constructor() {
        super();
        this.state = {
            patient: {},
            treatments: []
        }
    }

    getPatient(id){
        $.ajax({
          url: 'http://127.0.0.1:8003/patients/api/patients/' + id,
          headers:{
            'Authorization':'JWT ' + localStorage.token
            },
          dataType: 'json',
          cache: false,
          success: function(data){
            this.setState({patient: data.patient, treatments: data.treatments});
          }.bind(this),
          error: function(xhr, status, err){
            console.log(err);
          }
        });
      }
    
    componentDidMount(){
        this.getPatient(this.props.match.params.id);
    }

    backToList(){
        window.location.href = '/';
    }

    render() {
        if(typeof localStorage.token === 'undefined'){
            window.location.href = '/login';
        }
        return (
            <div>
                <PatientBasic patient={this.state.patient}/>
                <br/>
                {this.state.treatments.map((treatment) => 
                    <TreatmentForm
                        key={treatment.id}
                        treatment={treatment}
                    />
                )}
                <hr />
                <br />
                <Button variant="contained" color="secondary" onClick={this.backToList.bind(this)}> 
                    返回
                </Button>
            </div>
        );
    }
}

export default PatientDetail;
