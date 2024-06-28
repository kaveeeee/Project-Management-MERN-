import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

class AssignmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignment: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/assigment/')
            .then(response => {
                this.setState({ assignment: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    tabRow() {
        return this.state.assignment.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
                <h1 align="center">Assignment - Exam List</h1>
                {this.state.assignment.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <table className='table table-striped' style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th><b>Course Name</b></th>
                                <th><b>Assignment Description</b></th>
                                <th><b>Deadline</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default AssignmentList;
