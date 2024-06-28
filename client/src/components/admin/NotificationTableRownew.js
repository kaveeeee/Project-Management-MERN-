// NotificationTableRow.js

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotificationTableRow = ({ notification }) => {

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/notification/${notification._id}`)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting notification:', error);
            });
    }

    return (
        <tr>
            <td>{notification.topic}</td>
            <td>{notification.subject}</td>
            <td>{notification.description}</td>
            <td>
                <button onClick={handleDelete}>Delete</button>
                <Link to={`/notification/${notification._id}`}><button>Update</button></Link>
            </td>
        </tr>
    );
};

export default NotificationTableRow;
