import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/submissions/')
            .then(res => {
                setAssignments(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
            <h1 align="center">View Submissions</h1>
            <table className='table table-striped' style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        
                        <th><b>Name</b></th>
                        <th><b>Intake</b></th>
                        <th><b>Attach file</b></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment._id}>
                            <td>{assignment.name}</td>
                            <td>{assignment.intake}</td>
                            <td>{assignment.attach_file}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAssignments;
