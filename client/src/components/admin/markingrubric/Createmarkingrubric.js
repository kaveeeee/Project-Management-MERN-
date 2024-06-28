

import React, { Component } from 'react';
import axios from 'axios';

class Createmarkingrubric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
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
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('applicable_year', this.state.applicable_year);
        formData.append('applicable_semester', this.state.applicable_semester);
        formData.append('attach_file', this.state.attach_file);

        axios.post('http://localhost:5000/markingrubric/add', formData)
            .then(res => {
                console.log(res.data);
                // Reset form after successful submission
                this.setState({
                  title: '',
                  description: '',
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
                    <h1 align="center">Publish Marking Rubric</h1>
                    <br />
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' ,marginLeft:'20px'}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange}  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
                        </div>
                        <div className="form-group">
                            <label>Applicable year: </label>
                            <input type="number" className="form-control" name="applicable_year" value={this.state.applicable_year} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <div className="form-group">
                            <label>Applicable Semester: </label>
                            <input type="text" className="form-control" name="applicable_semester" value={this.state.applicable_semester} onChange={this.onChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <div className="form-group">
                            <label>Attach File: </label>
                            <input type="file" className="form-control-file" onChange={this.onFileChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </div>
                        <br />
                        <div className="form-group" style={{ textAlign: 'center' }}>
                            <input type="submit" value="Add Assignment" className="btn btn-primary" />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Createmarkingrubric;
