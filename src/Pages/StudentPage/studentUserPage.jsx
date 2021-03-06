import React from 'react';
import './studentPage.css';
import AxiosInstance from '../../requestClient';
import { BASE_URL } from '../../config';
import NavBar from '../../Components/Nav';
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay'


class StudentUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: [],
            formInProgress: true
        }
    }
    componentDidMount() {
        this.getStudentDetails();
    }

    getStudentDetails() {
        let matricNo = this.props.match.params.matricNo
        AxiosInstance.get(BASE_URL + `/students/${matricNo}`)
            .then(response => {
                this.setState({
                    formInProgress: false,
                    studentDetails: response.data[0],
                })
            })
            .catch(error => {
            })
    }

    render() {
        let accessToken = sessionStorage.getItem('access-token');
        return (
            accessToken ?
                <LoadingOverlay
                    active={this.state.formInProgress}
                    spinner
                    text="Loading..."
                >
                    <React.Fragment>
                        <NavBar />
                        <div>
                            <p>Matric No: {this.state.studentDetails.matric_number}</p>
                            <p>First Name: {this.state.studentDetails.first_name}</p>
                            <p>Middle Name: {this.state.studentDetails.middle_name}</p>
                            <p>Last Name: {this.state.studentDetails.last_name}</p>
                            <p>Phone Number: {this.state.studentDetails.phone_number}</p>
                            <p>Email: {this.state.studentDetails.email_address}</p>
                            <p>Admission Year: {this.state.studentDetails.admission_year}</p>
                            <p>Graduation Year: {this.state.studentDetails.graduation_year}</p>
                        </div>
                    </React.Fragment>
                </LoadingOverlay>
                : <Redirect to="/students" />
        )
    }
}
export default StudentUserPage;