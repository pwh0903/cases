import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

class AddPatient extends Component {
    static defaultProps = {
        genders: ['male', 'female']
    }

    constructor(){
        super();
        this.state = {
            newTreatment: {}
        }
    }

    handleSubmit(e){
        if(this.refs.name.value === ''){
            alert('name is required')
        } else {
            this.setState({newTreatment: {
                name: this.refs.name.value,
                age: this.refs.age.value,
                gender: this.refs.gender.value
            }}, function(){
                // console.log(this.state);
                this.props.addTreatment(this.state.newTreatment);
            });
        }
        e.preventDefault();
    }

    render() {
        let genderOptions = this.props.genders.map(gender => {
            return <option key={gender} value="gender">{gender}</option>
        });
        return (
            <div>
                <h3>
                    Add Patient
                </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <lable>Name</lable>
                        <input type="text" ref="name"></input>
                    </div>
                    <div>
                        <lable>Age</lable>
                        <input type="text" ref="age"></input>
                    </div>
                    <div>
                        <lable>Gender</lable>
                        <select ref="gender">
                            {genderOptions}
                        </select>
                    </div>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default AddPatient;
