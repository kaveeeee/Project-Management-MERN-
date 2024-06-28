import React, { Component } from 'react';
import axios from 'axios';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { borderRadius } from '@mui/system';

class AssignmentCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            reg_number: '',
            semester: '',
            year: '',
            specialization: '',
            intake: '',
            calender_year: '',
            group_number: '',
            report_type: '',
            title: '',
            attach_file: null
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFileChange = (e) => {
        this.setState({ attach_file: e.target.files[0] });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('reg_number', this.state.reg_number);
        formData.append('semester', this.state.semester);
        formData.append('year', this.state.year);
        formData.append('specialization', this.state.specialization);
        formData.append('intake', this.state.intake);
        formData.append('calender_year', this.state.calender_year);
        formData.append('group_number', this.state.group_number);
        formData.append('report_type', this.state.report_type);
        formData.append('title', this.state.title);
        formData.append('attach_file', this.state.attach_file);

        axios.post('http://localhost:5000/submissions/add', formData)
            .then(res => {
                console.log(res.data);
                // Reset form after successful submission
                this.setState({
                    name: '',
                    reg_number: '',
                    semester: '',
                    year: '',
                    specialization: '',
                    intake: '',
                    calender_year: '',
                    group_number: '',
                    report_type: '',
                    title: '',
                    attach_file: null
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', maxWidth: '500px' }}>
                    <h1 align="center">Submit Assignment</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Registration Number: </label>
                            <input type="text" className="form-control" name="reg_number" value={this.state.reg_number} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Semester: </label>
                            <input type="text" className="form-control" name="semester" value={this.state.semester} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Year: </label>
                            <input type="text" className="form-control" name="year" value={this.state.year} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Specialization: </label>
                            <input type="text" className="form-control" name="specialization" value={this.state.specialization} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Intake: </label>
                            <input type="text" className="form-control" name="intake" value={this.state.intake} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Calender Year: </label>
                            <input type="text" className="form-control" name="calender_year" value={this.state.calender_year} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Group Number: </label>
                            <input type="text" className="form-control" name="group_number" value={this.state.group_number} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Report Type: </label>
                            <input type="text" className="form-control" name="report_type" value={this.state.report_type} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label>Attach File: </label><br />
                            <input type="file" className="form-control-file" onChange={this.onFileChange} />
                        </div>
                        <br />
                        <div className="form-group" style={{ textAlign: 'center' }}>
                            <input type="submit" value="Add Assignment" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>

            </>

        )
    }
}

export default AssignmentCreate;



