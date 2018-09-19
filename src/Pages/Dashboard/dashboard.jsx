import React from 'react';
import './dashboard.css';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../../Components/Nav';

const Board = () => (
    <div className="dashboard__flex">
        <div className="dashboard__div">
            <h2>Staff</h2>
            <Link to="/register/staff">
                <button name="registerStaff">Register</button>
            </Link>
            <Link to="/staffs/table">
                <button name="viewStaff">View Staffs</button>
            </Link>
        </div>
        <div className="dashboard__div">
            <h2>Student</h2>
            <Link to="/register/student">
                <button name="registerStudent">Register</button>
            </Link>
            <Link to="/students/table">
                <button name="viewStudent">View Student</button>
            </Link>
        </div>
    </div>
)
class Dashboard extends React.Component {
    render() {
        let accessToken = sessionStorage.getItem('access-token');
        return (
            accessToken ?
                <React.Fragment>
                    <NavBar />
                    <Board />
                </React.Fragment>
                : <Redirect to='/' />
        )
    }
}
export default Dashboard;