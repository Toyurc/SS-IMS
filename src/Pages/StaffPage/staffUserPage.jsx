import React from 'react';
import './staffPage.css';
import AxiosInstance from '../../requestClient';
import { BASE_URL } from '../../config';
import NavBar from '../../Components/Nav'


class StaffUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetails: {},
        }
    }
    componentDidMount () {
        this.getStaffDetails();
    }
    getStaffDetails() {
        console.log(this.props)
        let staffId =  this.props.match.params.staffId
        AxiosInstance.get(BASE_URL + `/staffs/${staffId}`)
            .then(response => {
                console.log(response);
                this.setState({
                    staffDetails: response.data,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
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
        
        )
    }
}
export default StaffUserPage;