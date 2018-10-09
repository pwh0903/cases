import React, { Component } from 'react';
import uuid from 'uuid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


class TreatmentForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            detail: '',
            pictures: [],
        }
    }
    
    onFileChange(e){
        if(typeof this.props.updateTreatment !== 'undefined'){
            let tmp = e.target.files;
            Object.keys(tmp).forEach(key => {
                let newPic = tmp[key];
                let reader = new FileReader();
                reader.onload = e => {
                    let tmpPictures = this.state.pictures;
                    let src = e.target.result;
                    let image = new Image();
                    image.src = src;
                    tmpPictures.push({
                        id: uuid.v4(),
                        name: newPic.name,
                        data: reader.result
                    });
                    this.props.updateTreatment('pictures', tmpPictures, this.props.treatment.id);
                };
                reader.readAsDataURL(newPic);
            });
        }
    }

    deletePicture(picName) {
        if(typeof this.props.updateTreatment !== 'undefined'){
            let tmp = this.state.pictures;
            tmp.map(pic => {
                if (pic.name === picName){
                    tmp.splice(tmp.indexOf(pic), 1);
                }
            });
            this.setState({pictures: tmp});
            this.props.updateTreatment('pictures',tmp, this.props.treatment.id);
        }
    }

    handleTreatmentChange = name => event => {
        if(typeof this.props.updateTreatment !== 'undefined'){
            this.props.updateTreatment(name, event.target.value, this.props.treatment.id);
        }
    }

    render() {
        return (
            <div>
                <TextField
                    id="outlined-name"
                    label="治疗名称"
                    value={this.props.treatment.name}
                    onChange={this.handleTreatmentChange('name')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <br/>
                <TextField
                    id="filled-multiline-flexible"
                    label="详细信息"
                    multiline
                    rowsMax="4"
                    value={this.props.treatment.detail}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleTreatmentChange('detail')}
                    margin="normal"
                    variant="filled"
                    rows="15"
                    fullWidth
                />
                {this.props.treatment.pictures.map((pic) =>
                    <div key={pic.id}>
                        <Tooltip title="删除">
                            <IconButton aria-label="Delete">
                            <DeleteIcon onClick={this.deletePicture.bind(this, pic.name)}/>
                            </IconButton>
                        </Tooltip>
                        <br />
                        <img src={pic.data} height="500" width="700" alt={pic.name}/>
                    </div>
                )}
                <input
                    accept="image/*"
                    id={this.props.treatment.id + "contained-button-file"}
                    multiple
                    type="file"
                    style={{"display":"none"}}
                    onChange={this.onFileChange.bind(this)}
                />
                <label htmlFor={this.props.treatment.id + "contained-button-file"}>
                    <Button variant="contained" component="span">
                        上传照片
                    </Button>
                </label>
                <br/> <br/>
                <hr></hr>
            </div>
        );
    }
}

export default TreatmentForm;
