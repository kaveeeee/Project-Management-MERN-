import React, { Component } from 'react';
import axios from 'axios';

class AssignmentCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            assignment_name: '',
            deadline: '',
            applicable_year: '',
            applicable_semester: '',
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
        formData.append('course', this.state.course);
        formData.append('assignment_name', this.state.assignment_name);
        formData.append('deadline', this.state.deadline);
        formData.append('applicable_year', this.state.applicable_year);
        formData.append('applicable_semester', this.state.applicable_semester);
        formData.append('attach_file', this.state.attach_file);

        axios.post('http://localhost:5000/assigment/add', formData)
            .then(res => {
                console.log(res.data);
                // Reset form after successful submission
                this.setState({
                    course: '',
                    assignment_name: '',
                    deadline: '',
                    applicable_year: '',
                    applicable_semester: '',
                    attach_file: null
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div >
                <div >
                    <h1 align="center">Publish Assignment</h1>
                    <br />
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' ,marginLeft:'20px'}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text" className="form-control" name="course" value={this.state.course} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}  />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" className="form-control" name="assignment_name" value={this.state.assignment_name} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <div className="form-group">
                            <label>Applicable year: </label>
                            <input type="number" className="form-control" name="deadline" value={this.state.deadline} onChange={this.onChange}  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
                        </div>
                        <div className="form-group">
                            <label>Applicable Semester: </label>
                            <input type="number" className="form-control" name="applicable_year" value={this.state.applicable_year} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <div className="form-group">
                            <label>Deadline: </label>
                            <input type="date" className="form-control" name="applicable_semester" value={this.state.applicable_semester} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}  />
                        </div>
                        <div className="form-group">
                            <label>Attach File: </label>
                            <br />
                            <input type="file" className="form-control-file" onChange={this.onFileChange} />
                        </div>
                        <br />
                        <div className="form-group" style={{ textAlign: 'center' }}>
                            <input style={{ 
                        marginTop: '20px', 
                        backgroundColor: '#516FA5', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                        
                    }}
                    type="submit" value="Add Assignment" className="btn btn-primary" />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssignmentCreate;
