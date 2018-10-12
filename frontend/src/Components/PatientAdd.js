import React, { Component } from 'react';
import $ from 'jquery';
import uuid from 'uuid';
import Button from '@material-ui/core/Button';

import PatientBasic from './PatientBasic';
import TreatmentForm from './TreatmentForm';


class PatientAdd extends Component {
    constructor() {
        super();
        this.treatmentForm = <form>
            <input type="text" name="name"></input> <br></br>
            <textarea></textarea> <br></br>
            <select></select> <br></br>
        </form>
        this.state = {
            patient: {
                name: '',
                age: '',
                gender: '',
                phone: '',
            },
            treatments: [
                {
                    id: uuid.v4(),
                    name: '',
                    detail: '',
                    pictures: [],
                },
            ],
        }
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

    deleteTreatment = treatmentID => {
        let tmp = this.state.treatments;
        let removeIndex = -1;
        tmp.map(treatment =>{
            if(treatment.id === treatmentID){
                removeIndex = tmp.indexOf(treatment);
            }
            return true;
        })
        tmp.splice(removeIndex, 1);
        this.setState({treatments: tmp});
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

    updateBasic(name, basicData){
        let tmp = this.state.patient;
        tmp[name] = basicData;
        this.setState({patient: tmp});
    }

    submitPatient(){
        let r = window.confirm("确认提交吗?");
        if(r === true){
            let postUrl = 'http://127.0.0.1:8003/patients/api/patients/';
            $.ajax({

                url: postUrl,
                type: 'POST',
                data: {
                    data: JSON.stringify(this.state),
                },
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                },  
            }).done(function(){
                alert('提交成功');
                window.location.href = '/';
            }).fail(function(){
                alert('提交失败 请联系管理员');
            });
        }
    }

    cancelAddPatient(){
        let r = window.confirm("确认取消吗?");
        if(r === true){
            window.location.href = '/';
        }
    }

    render() {
        if(typeof localStorage.token === 'undefined'){
            window.location.href = '/login';
        }
        return (
            <div>
                <PatientBasic patient={this.state.patient} updateBasic={this.updateBasic.bind(this)}/>
                <br/>
                {this.state.treatments.map((treatment) => 
                    <TreatmentForm 
                        key={treatment.id} 
                        treatment={treatment}
                        updateTreatment={this.updateTreatment.bind(this)}
                        deleteTreatment={this.deleteTreatment.bind(this)}
                    />
                )}
                <Button variant="contained" color="primary" onClick={this.addTreatment.bind(this)}> 
                    添加治疗信息
                </Button>
                <hr />
                <br />
                <Button variant="contained" color="primary" onClick={this.submitPatient.bind(this)}> 
                    提交
                </Button>
                &nbsp;
                <Button variant="contained" color="secondary" onClick={this.cancelAddPatient.bind(this)}> 
                    取消
                </Button>
            </div>
        );
    }
}

export default PatientAdd;