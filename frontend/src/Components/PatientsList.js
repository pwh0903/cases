import React, { Component } from 'react';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TextField from '@material-ui/core/TextField';


class PatientsList extends Component {
    constructor(){
        super();
        this.state = {
            firstUrl: '',
            nextUrl: '',
            previousUrl: '',
            length: '',
            rowsPerPage: 25,
            totalCount: 0,
            page: 0,
            patients: [],
            genderList: {
                "male": "男",
                "female": "女"
            },
            searchValue: {
                name: '',
                phone: ''
            }
        }
    }
  
    getPatients(url){
        $.ajax({
            url: url,
            headers:{
                'Authorization':'JWT ' + localStorage.token
            },
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({
                    patients: data.results,
                    nextUrl: data.next,
                    previousUrl: data.previous,
                    totalCount: data.count
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    componentDidMount(){
        let url = 'http://127.0.0.1:8003/patients/api/patients/?limit=' + this.state.rowsPerPage;
        this.setState({firstUrl: url})
        this.getPatients(url);
    };

    deletePatient(id){
        let r = window.confirm("确认删除吗?");
        if(r === true){
            let deleteUrl = 'http://127.0.0.1:8003/patients/api/patients/' + id + '/';
            $.ajax({
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                },
                url: deleteUrl,
                type: 'DELETE',
            }).done(function(){
                alert('删除成功');
                window.location.href = '/';
            })
            .fail(function(){
                alert('删除失败 请联系管理员');
            });
        };
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value }, function (){
            let url = 'http://127.0.0.1:8003/patients/api/patients/?limit=' + this.state.rowsPerPage;
            this.getPatients(url);
        });
    };

    handlePreviousPage(){
        if(this.state.previousUrl){
            this.getPatients(this.state.previousUrl);
        }else{
            alert('没有上一页');
        }
    };

    handleNextPage(){
        if(this.state.nextUrl){
            this.getPatients(this.state.nextUrl);
        }else{
            alert('没有下一页');
        }
    };

    handleFirstPage(){
        if(this.state.firstUrl){
            this.getPatients(this.state.firstUrl);
        }else{
            alert('没有第一页');

        }
    };

    handleSearch(){
        let url = 'http://127.0.0.1:8003/patients/api/patients/?limit=' + this.state.rowsPerPage + '&name=' + this.state.searchValue.name + '&phone=' + this.state.searchValue.phone  
        this.getPatients(url);
    };

    handleChange = prop => event => {
        let tmp = this.state.searchValue;
        tmp[prop] = event.target.value;
        this.setState({searchValue: tmp});
    };
    
    logout(){
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    render() {
        if(typeof localStorage.token === 'undefined'){
            window.location.href = '/login';
        }
        return (
            <div>
                <TextField
                    id="filled-adornment-weight"
                    variant="filled"
                    label="姓名"
                    value={this.state.searchValue.name}
                    onChange={this.handleChange('name')}
                />
                &nbsp;
                <TextField
                    id="filled-adornment-weight"
                    variant="filled"
                    label="电话"
                    value={this.state.searchValue.phone}
                    onChange={this.handleChange('phone')}
                />
                &nbsp;
                <Button variant="contained" color="primary" onClick={this.handleSearch.bind(this)}> 
                    搜索
                </Button>
                &nbsp;
                <Button variant="contained" color="primary" component={Link} to={"/add"}> 
                    添加患者
                </Button>
                &nbsp;
                <Button variant="contained" color="primary" onClick={this.logout}> 
                    退出登录
                </Button>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>姓名</TableCell>
                            <TableCell>电话</TableCell>
                            <TableCell>性别</TableCell>
                            <TableCell numeric>年龄</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.patients.map(patient => {
                            return (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{this.state.genderList[patient.gender]}</TableCell>
                                    <TableCell numeric>{patient.age}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" component={Link} to={"/detail/" + patient.id} size="small">
                                            详情
                                        </Button>
                                        <Button variant="contained" color="primary" component={Link} to={"/edit/" + patient.id} size="small">
                                            修改
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={this.deletePatient.bind(this, patient.id)} size="small"> 
                                            删除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" onClick={this.handleFirstPage.bind(this)} >
                                    第一页
                                </Button>
                                <Button variant="contained" onClick={this.handlePreviousPage.bind(this)} >
                                    上一页
                                </Button>
                                <Button variant="contained" onClick={this.handleNextPage.bind(this)} >
                                    下一页
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}


export default PatientsList;
