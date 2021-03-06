import React from 'react';
import './staffPage.css';
import AxiosInstance from '../../requestClient';
import {BASE_URL} from '../../config';
import NavBar from '../../Components/Nav'
import Redirect from 'react-router-dom/Redirect';
import LoadingOverlay from 'react-loading-overlay';

class StaffUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetails: {},
            formInProgress: true
        }
    }
    componentDidMount() {
        this.getStaffDetails();
    }
    getStaffDetails() {
        let staffId = this.props.match.params.staffId
        AxiosInstance
            .get(BASE_URL + `/staffs/${staffId}`)
            .then(response => {
                this.setState({formInProgress: false, staffDetails: response.data[0]})
            })
            .catch(error => {})
    }

    render() {
        let accessToken = sessionStorage.getItem('access-token');
        return (accessToken
            ? <LoadingOverlay active={this.state.formInProgress} spinner text="Loading...">
                    <React.Fragment>
                        <NavBar/>
                        <div>
                            <p>Staff ID: {this.state.staffDetails.staff_id}</p>
                            <p>First Name: {this.state.staffDetails.first_name}</p>
                            <p>Last Name: {this.state.staffDetails.last_name}</p>
                            <p>Phone Number: {this.state.staffDetails.phone_number}</p>
                            <p>Email: {this.state.staffDetails.email_address}</p>
                            <p>Department: {this.state.staffDetails.department}</p>
                            <p>Date Of Employment: {this.state.staffDetails.date_of_employment}</p>
                        </div>
                    </React.Fragment>
                </LoadingOverlay>
            : <Redirect to="/staffs"/>)
    }
}
export default StaffUserPage;