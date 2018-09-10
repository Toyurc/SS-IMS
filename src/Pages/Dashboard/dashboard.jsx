import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Staff</h2>
                    <Link to="/staffRegisteration">
                        <button name="registerStaff">Register</button>
                    </Link>
                    <Link to="/staff/table">
                        <button name="viewStaff">View Staffs</button>
                    </Link>
                </div>
            </div>
            )
    }
}
export default Dashboard;