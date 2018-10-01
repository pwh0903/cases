import React, { Component } from 'react';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router } from 'react-router-dom';

class PatientEdit extends Component {
    constructor() {
        super();
        this.treatmentForm = <form>
            <input type="text" name="name"></input> <br></br>
            <textarea></textarea> <br></br>
            <select></select> <br></br>
        </form>
        this.state = {
            patient: {},
            treatmentList: [this.treatmentForm,],
            treatmentData: [
                {
                    treamtmentName: '',
                    treamtmentDetail: '',
                    pictures: [],
                },
            ]
        }
    }

    getPatient(id){
        $.ajax({
          url: 'http://127.0.0.1:8000/patients/api/patients/' + id,
          dataType: 'json',
          cache: false,
          success: function(data){
            console.log(data);
            this.setState({patient: data});
          }.bind(this),
          error: function(xhr, status, err){
            console.log(err);
          }
        });
    }

    addTreatment(){
        let tmp = this.state.treatmentList;
        tmp.push(this.treatmentForm);
        this.setState({treatmentList: tmp});
        console.log(this.state.treatmentData);
    }

    handleChange = name => event => {
        let tmp = this.state.patient
        tmp.name = event.target.value;
        this.setState({
            patient: tmp,
        });
    };

    componentDidMount(){
        this.getPatient(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <TextField
                    id="outlined-name"
                    label="Name"
                    // className={classes.textField}
                    value={this.state.patient.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <ul>
                    {this.state.treatmentList.map((i) => <li key={this.state.treatmentList.indexOf(i)}>{i}</li>)}
                </ul>
                <Button variant="contained" color="secondary" onClick={this.addTreatment.bind(this)}> 
                    add
                </Button>
            </div>
        );
    }
}

export default PatientEdit;
