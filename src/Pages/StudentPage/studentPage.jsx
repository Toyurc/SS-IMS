import React from 'react';
import './studentPage.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config';
import Axios from 'axios';
class StudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matricNo: '',
            stuPassword: '',
            formInProgress: false,
            PersonalDataFormError: false,
            buttonName: 'Login',
            success: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        sessionStorage.clear();
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
        this.setState({
            formInProgress: true,
            buttonName: "In Progress..."
        });

        document.getElementById('stuSubmit').setAttribute('disabled', 'disabled')

        const validationState = this.validatePersonalDataForm();

        if (!validationState) {
            this.setState({
                formInProgress: false,
                buttonName: "Login"
            });
            document.getElementById('stuSubmit').removeAttribute('disabled', 'disabled')
            return false;
        }
        const userDetails = this.state;
        Axios.post(BASE_URL + 'login/students', {}, {
            auth: {
                username: userDetails.matricNo,
                password: userDetails.stuPassword
            }
        })
            .then(response => {
                if (response.status === 200 && response.statusText === 'OK') {
                    document
                        .getElementById('stuSubmit')
                        .removeAttribute('disabled', 'disabled');
                    sessionStorage.setItem('access-token', response.data.token);
                    this.setState({ formInProgress: false, buttonName: "Login", success: 'Login Successful' });
                    setTimeout(() => {
                        this.setState({ success: '' });
                        this.props.history.push(`/students/${userDetails.matricNo}`, { matricNo: userDetails.matricNo });
                    }, 2500);
                }
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    errText: 'An error occured, pls make usre your matric no. and password are valid',
                    buttonName: "Login"
                })
                setTimeout(() => {
                    this.setState({ errText: '' });
                }, 3000);
                document
                    .getElementById('stuSubmit')
                    .removeAttribute('disabled', 'disabled')
            })
    }

    validatePersonalDataForm() {
        const {
            matricNo,
            stuPassword
        } = this.state;

        if (
            !matricNo || !stuPassword
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
            <main>
                <section id="landing_page">
                    <header className="header">
                        <div className="header__text-box">
                            <h1 className="heading-primary">
                                <span className="heading-primary--main">Welcome</span>
                                <span className="heading-primary--sub">Students</span>
                            </h1>
                            <h3 className="heading-primary--sub">Login With your details below</h3>
                        </div>
                    </header>
                </section>
                <section id="login_form" className="section__login">
                    <div className="form__div card">
                        <h3>Students</h3>
                        <form
                            onSubmit={event => this.personalDataFormHandler(event)}
                            id="student_form"
                            method="POST"
                        >
                            <div>
                                {
                                    this.state.success && <div className="success-box">
                                        {this.state.success}
                                    </div>
                                }
                                <label
                                    htmlFor="matricNo"
                                    className={(this.state.PersonalDataFormError && this.state.matricNo === '') ? 'error' : 'registration__label'}
                                >Matric No.
                                    <input
                                        type="number"
                                        name="matricNo"
                                        onChange={event => this.handleInputChange(event)}
                                        value={this.state.matricNo}
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    htmlFor="stuPassword"
                                    className={(this.state.PersonalDataFormError && this.state.stuPassword === '') ? 'error' : 'registration__label'}
                                >Password
                                    <input
                                        type="password"
                                        name="stuPassword"
                                        onChange={event => this.handleInputChange(event)}
                                        value={this.state.stuPassword}
                                    />
                                </label>
                            </div>
                            {
                                this.state.errText &&
                                <div className="error-box">
                                    {this.state.errText}
                                </div>
                            }
                            <button type="submit" id="stuSubmit" className="button">{this.state.buttonName}</button>
                        </form>
                    </div>
                    <div className="form__div">
                        <p>
                            <Link to="/staffs">Click here Staff Portal</Link>
                        </p>
                        <p>
                            <Link to="/">Click here Admin Portal</Link>
                        </p>
                    </div>
                </section>
            </main>
        )
    }
}
export default StudentPage;
