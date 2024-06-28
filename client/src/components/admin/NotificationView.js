// NotificationView.js

import React, { Component } from 'react';
import axios from 'axios';
import NotificationTableRow from './NotificationTableRow'; // Corrected import statement

class NotificationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/notification/all')
            .then(response => {
                this.setState({ notifications: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderNotifications() {
        return this.state.notifications.map((notification, index) => {
            return <NotificationTableRow key={index} notification={notification} />;
        });
    }

    render() {
        return (
            <div>
                <h1 align="center">Notifications</h1>
                {this.state.notifications.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <table className='table table-striped' style={{ marginTop: 20 }}>
                        <tbody>
                            {this.renderNotifications()}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default NotificationView;
