import React from 'react';
import './registration.css';
import { Link } from 'react-router-dom';

const RegistrationForm = [
    {
        label: 'Matric No',
        min: null,
        name: 'matric_no',
        type: 'number',
    },
    {
        label: 'First Name',
        min: null,
        name: 'first_name',
        type: 'text',
    },
    {
        label: 'Middle Name',
        min: null,
        name: 'middle_name',
        type: 'text',
    },
    {
        label: 'Last Name',
        min: null,
        name: 'last_name',
        type: 'text',
    },
    {
        label: 'Phone Number',
        min: null,
        name: 'phone_number',
        type: 'number',
    },
    {
        label: 'Email ',
        min: null,
        name: 'email',
        type: 'email',
    },
    {
        label: 'Year of Admission',
        min: null,
        name: 'year_of_adm',
        type: 'date',
    },
    {
        label: 'Year of Graduation',
        min: null,
        name: 'year_of_grad',
        type: 'date',
    }
]
class StudentRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matric_no: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            year_of_adm: '',
            year_of_grad: '',
            errText: '',
            formInProgress: false,
            PersonalDataFormError: false,
            button_name: 'Register'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange(event) {
        const name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    personalDataFormHandler(event) {
        event.preventDefault();
        console.log(this.state)
        this.setState({
            formInProgress: true,
            button_name: "In Progress..."
        });

        document.getElementById('registerButton').setAttribute('disabled', 'disabled')

        const validationState = this.validatePersonalDataForm();

        if (!validationState) {
            this.setState({
                formInProgress: false,
                button_name: "Register"
            });
            document.getElementById('registerButton').removeAttribute('disabled', 'disabled')
            return false;
        }
        const userDetails = this.state;
    }


    validatePersonalDataForm() {
        const {
            first_name,
            last_name,
            date_of_emp,
            phone_number,
            email,
            dept
        } = this.state;

        if (!first_name ||
            !last_name ||
            !date_of_emp ||
            !phone_number ||
            !email ||
            !dept
        ) {
            this.setState({
                PersonalDataFormError: true,
                errText: "You can't leave this field(s) empty",
            });
            setTimeout(() => {
                this.setState({
                    errText: '',
                });
            }, 3000);
            return false;
        }

        return true;
    }

    render() {
        return (
            <div>
                <h2>Student Registration</h2>
                <form onSubmit={event => this.personalDataFormHandler(event)} method="POST">
                    {
                        RegistrationForm.map((form, index) => (
                            <div
                                key={index}
                                className="registration__div"
                            >
                                <label
                                    htmlFor={form.name}
                                    className={(this.state.PersonalDataFormError && this.state[form.name] === '') ? 'error' : 'registration__label'}
                                >{form.label}</label>
                                <input
                                    name={form.name}
                                    type={form.type}
                                    min={form.min}
                                    onChange={event => this.handleInputChange(event)}
                                    value={this.state[form.name]}
                                />
                            </div>
                        ))
                    }
                    {
                        this.state.errText &&
                        <div className="error-box">
                            {this.state.errText}
                        </div>
                    }
                    <button id="registerButton" type="submit" >{this.state.button_name}</button>
                </form>
            </div>
        )
    }
}
export default StudentRegistration;