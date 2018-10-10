import React, { Component } from 'react';
import $ from 'jquery';
import uuid from 'uuid';
import Button from '@material-ui/core/Button';

import PatientBasic from './PatientBasic';
import TreatmentForm from './TreatmentForm';


class PatientDetail extends Component {
    constructor() {
        super();
        this.treatmentForm = <form>
            <input type="text" name="name"></input> <br></br>
            <textarea></textarea> <br></br>
            <select></select> <br></br>
        </form>
        this.genderList = ['男', '女'];
        this.state = {
            patient: {},
            treatments: []
        }
    }

    getPatient(id){
        $.ajax({
          url: 'http://127.0.0.1:8003/patients/api/patients/' + id,
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

    updateBasic(name, basicData){
        let tmp = this.state.patient;
        tmp[name] = basicData;
        this.setState({patient: tmp});
    }

    updateTreatment(name, treatmentData, treatmentID){
        let tmp = this.state.treatments;
        tmp.map(treatment => {
            if(treatment.id === treatmentID){
                treatment[name] = treatmentData;
            }
            return true;
        });
        this.setState({treatments: tmp});
    }

    submitPatient(id){
        let putUrl = 'http://127.0.0.1:8003/patients/api/patients/' + id + '/';
        $.ajax({
            url: putUrl,
            type: 'PUT',
            data: JSON.stringify(this.state),
        }).done(function(){
            alert('提交成功');
            window.location.href = '/';
        })
        .fail(function(){
            alert('提交失败 请联系管理员');
            window.location.href = '/';
        });
    }

    addTreatment(){
        let tmp = this.state.treatments;
        tmp.push(
            {
                id: uuid.v4(),
                name: '',
                detail: '',
                pictures: [],
            },
        );
        this.setState({treatments: tmp});
    }
    
    componentDidMount(){
        this.getPatient(this.props.match.params.id);
    }

    cancelEditPatient(){
        let r = window.confirm("确认取消吗?");
        if(r === true){
            window.location.href = '/';
        }
    }

    render() {
        return (
            <div>
                <PatientBasic patient={this.state.patient} updateBasic={this.updateBasic.bind(this)}/>
                <br/>
                {this.state.treatments.map((treatment) => 
                    <TreatmentForm
                        key={treatment.id}
                        treatment={treatment}
                        updateTreatment={this.updateTreatment.bind(this)}
                    />
                )}
                <Button variant="contained" color="primary" onClick={this.addTreatment.bind(this)}> 
                    添加治疗信息
                </Button>
                <hr />
                <br />
                <Button variant="contained" color="primary" onClick={this.submitPatient.bind(this, this.state.patient.id)}> 
                    提交
                </Button>
                &nbsp;
                <Button variant="contained" color="secondary" onClick={this.cancelEditPatient.bind(this)}> 
                    取消
                </Button>
            </div>
        );
    }
}

export default PatientDetail;
