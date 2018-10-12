import React, { Component } from 'react';
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    loginSubmit(){
        let postUrl = 'http://127.0.0.1:8003/api-token-auth/';
        $.post(
            postUrl,
            { 
                username: this.state.username,
                password: this.state.password
            },
        ).done(function(data){
            localStorage.token = data.token;
            alert('登陆成功');
            window.location.href = '/';
        })
        .fail(function(){
            alert('登陆失败');
        });
    }

    handleNameChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    render(){
        return(
            <div>
                <TextField
                    id="outlined-name"
                    label="姓名"
                    value={this.state.name}
                    onChange = {this.handleNameChange.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                    id="outlined-password"
                    type="password"
                    label="密码"
                    value={this.state.name}
                    onChange = {this.handlePasswordChange.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <Button variant="contained" color="primary" onClick={this.loginSubmit.bind(this)}> 
                    登陆
                </Button>
            </div>
        )
    }
}

export default Login;