// NotificationTableRow.js

import React from 'react';

const NotificationTableRow = ({ notification }) => {
    return (
        <>
            <tr>
                <td><strong>{notification.topic} - {notification.subject}</strong>
                <br/>
                <td>{notification.description}</td>
                </td>
            </tr>
        </>
    );
};

export default NotificationTableRow;
