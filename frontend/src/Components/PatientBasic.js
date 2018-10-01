import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


class PatientBasic extends Component {
    constructor(){
        super();
        this.state = {
            genderList: [
                {
                    key:'male', 
                    value:'男'
                }, 
                {
                    key:'female', 
                    value:'女'
                },
            ],
        }
    }

    handleChange = name => event => {
        this.props.updateBasic(name, event.target.value);
    }

    render() {
        return (
            <div>
                <TextField
                    id="outlined-name"
                    label="姓名"
                    value={this.props.patient.name}
                    onChange={this.handleChange('name')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="年龄"
                    value={this.props.patient.age}
                    onChange={this.handleChange('age')}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="性别"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.patient.gender}
                    onChange={this.handleChange('gender')}
                    SelectProps={{
                        MenuProps: {
                        },
                    }}
                    margin="normal"
                    variant="outlined"
                >
                    {this.state.genderList.map(option => (
                        <MenuItem key={option.key} value={option.key}>
                        {option.value}
                        </MenuItem>
                    ))}
                </TextField>
                <hr></hr>
            </div>
        );
    }
}

export default PatientBasic;
