import React from 'react';
import './registration.css';
import AxiosInstance from '../../requestClient'
import {BASE_URL} from '../../config';
import LoadingOverlay from 'react-loading-overlay'

const RegistrationForm = [
    {
        label: 'Staff No',
        min: null,
        name: 'staff_no',
        type: 'text'
    }, {
        label: 'First Name',
        min: null,
        name: 'first_name',
        type: 'text'
    }, {
        label: 'Last Name',
        min: null,
        name: 'last_name',
        type: 'text'
    }, {
        label: 'Phone Number',
        min: null,
        name: 'phone_number',
        type: 'number'
    }, {
        label: 'Email ',
        min: null,
        name: 'email',
        type: 'email'
    }, {
        label: 'Department',
        min: null,
        name: 'dept',
        type: 'text'
    }, {
        label: 'Date of Employment',
        min: null,
        name: 'date_of_emp',
        type: 'date'
    }
]
class StaffRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staff_no: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            dept: '',
            date_of_emp: '',
            errText: '',
            formInProgress: false,
            PersonalDataFormError: false,
            buttonName: 'Register',
            success: ''
        }
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        let value = event.target.value;

        this.setState({[name]: value});
    }

    personalDataFormHandler(event) {
        event.preventDefault();
        this.setState({formInProgress: true, buttonName: "In Progress..."});

        document
            .getElementById('registerButton')
            .setAttribute('disabled', 'disabled')

        const validationState = this.validatePersonalDataForm();

        if (!validationState) {
            this.setState({formInProgress: false, buttonName: "Register"});
            document
                .getElementById('registerButton')
                .removeAttribute('disabled', 'disabled')
            return false;
        }
        const userDetails = this.state;

        AxiosInstance
            .post(BASE_URL + 'staffs', {
            staff_id: userDetails.staff_no,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            doe: userDetails.date_of_emp,
            phone_number: userDetails.phone_number,
            email_address: userDetails.email,
            dept: userDetails.dept,
            is_admin: false
        })
            .then(response => {
                if (response.status === 200 && response.statusText === 'OK') {
                    document
                        .getElementById('registerButton')
                        .removeAttribute('disabled', 'disabled');
                    this.setState({formInProgress: false, buttonName: "Register", success: 'Registration Successful'});
                    setTimeout(() => {
                        this.setState({success: ''});
                        this
                            .props
                            .history
                            .push('/dashboard');
                    }, 2500);
                }
            })
            .catch(error => {
                this.setState({errText: 'An error occured, pls try again later', buttonName: "Register", formInProgress: false})
                setTimeout(() => {
                    this.setState({errText: ''});
                }, 3000);
                document
                    .getElementById('registerButton')
                    .removeAttribute('disabled', 'disabled')
            })
    }

    validatePersonalDataForm() {
        const {
            staff_no,
            first_name,
            last_name,
            date_of_emp,
            phone_number,
            email,
            dept
        } = this.state;

        if (!staff_no || !first_name || !last_name || !date_of_emp || !phone_number || !email || !dept) {
            this.setState({PersonalDataFormError: true, errText: "You can't leave this field(s) empty"});
            setTimeout(() => {
                this.setState({errText: ''});
            }, 3000);
            return false;
        }

        return true;
    }

    render() {
        return (
            <LoadingOverlay active={this.state.formInProgress} spinner text="Loggin In...">
                <div>
                    <h2>Staff Registration</h2>
                    <form onSubmit={event => this.personalDataFormHandler(event)} method="POST">
                        {this.state.success && <div className="success-box">
                            {this.state.success}
                        </div>
}
                        {RegistrationForm.map((form, index) => (
                            <div key={index} className="registration__div">
                                <label
                                    htmlFor={form.name}
                                    className={(this.state.PersonalDataFormError && this.state[form.name] === '')
                                    ? 'error'
                                    : 'registration__label'}>{form.label}</label>
                                <input
                                    name={form.name}
                                    type={form.type}
                                    min={form.min}
                                    onChange={event => this.handleInputChange(event)}
                                    value={this.state[form.name]}/>
                            </div>
                        ))
}
                        {this.state.errText && <div className="error-box">
                            {this.state.errText}
                        </div>
}
                        <button id="registerButton" type="submit">{this.state.buttonName}</button>
                    </form>
                </div>
            </LoadingOverlay>
        )
    }
}
export default StaffRegistration;