import React, { Component } from 'react';
import $ from 'jquery'
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import PatientDetail from './PatientDetail';
import PatientEdit from "./PatientEdit";
import PatientAdd from "./PatientAdd";
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class PatientsList extends Component {
    constructor(){
        super();
        this.state = {
            patients: [],
            genderList: {
                "male": "男",
                "female": "女"
            }
        }
  }
  
    getPatients(){
        $.ajax({
            url: 'http://127.0.0.1:8003/patients/api/patients/',
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
        const { location } = this.props;
        console.log(location);
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );
        return (
            <div>
                <Button variant="contained" color="primary" component={Link} to={"/add"}> 
                    添加患者
                </Button>
                <Table >
                    <TableHead>
                        <TableRow>
                        <TableCell>姓名</TableCell>
                        <TableCell>电话</TableCell>
                        <TableCell>性别</TableCell>
                        <TableCell numeric>年龄</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.patients.map(patient => {
                            return (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.name}
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
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{this.state.genderList[patient.gender]}</TableCell>
                                    <TableCell numeric>{patient.age}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}


export default PatientsList;
