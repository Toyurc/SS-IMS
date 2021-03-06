import React from 'react';
import './staffPage.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BASE_URL } from '../../config'
import LoadingOverlay from 'react-loading-overlay';
class StaffPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffNo: '',
            stfPassword: '',
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

        document.getElementById('stfSubmit').setAttribute('disabled', 'disabled')

        const validationState = this.validatePersonalDataForm();

        if (!validationState) {
            this.setState({
                formInProgress: false,
                buttonName: "Login"
            });
            document.getElementById('stfSubmit').removeAttribute('disabled', 'disabled')
            return false;
        }
        const userDetails = this.state;
        Axios.post(BASE_URL + 'login/staffs', {}, {
            auth: {
                username: userDetails.staffNo,
                password: userDetails.stfPassword
            }
        })
            .then(response => {
                if (response.status === 200 && response.statusText === 'OK' && response.data.is_admin === false) {
                    document
                        .getElementById('stfSubmit')
                        .removeAttribute('disabled', 'disabled');
                    sessionStorage.setItem('access-token', response.data.token);
                    this.setState({ formInProgress: false, buttonName: "Login", success: 'Login Successful' });
                    setTimeout(() => {
                        this.setState({ success: '' });
                        this.props.history.push(`/staffs/${userDetails.staffNo}`, { staffNo: userDetails.staffNo });
                    }, 2500);
                }
                else if (response.status === 200 && response.statusText === 'OK' && response.data.is_admin === true) {
                    document
                        .getElementById('stfSubmit')
                        .removeAttribute('disabled', 'disabled');
                    this.setState({ formInProgress: false, buttonName: "Login", errText: 'You are an admin, pls login on the admin portal' });
                    setTimeout(() => {
                        this.setState({ errText: '' });
                    }, 3000);
                }
            })
            .catch(error => {
                this.setState({
                    errText: 'An error occured, pls make usre your staff id and password are valid',
                    buttonName: "Login",
                    formInProgress: false
                })
                setTimeout(() => {
                    this.setState({ errText: '' });
                }, 3000);
                document
                    .getElementById('stfSubmit')
                    .removeAttribute('disabled', 'disabled')
            })
    }


    validatePersonalDataForm() {
        const {
            staffNo,
            stfPassword
        } = this.state;

        if (
            !staffNo || !stfPassword
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
            <LoadingOverlay
                active={this.state.formInProgress}
                spinner
                text="Loggin In..."
            >
                <main>
                    <section id="landing_page">
                        <header className="header">
                            <div className="header__text-box">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--main">Welcome</span>
                                    <span className="heading-primary--sub">Staff</span>
                                </h1>
                                <h3 className="heading-primary--sub">Login With your details below</h3>
                            </div>
                        </header>
                    </section>
                    <section id="login_form" className="section__login">
                        <div className="form__div card">
                            <h3>Staffs</h3>
                            <form
                                onSubmit={event => this.personalDataFormHandler(event)}
                                id="staff_form"
                                method="POST"
                            >
                                <div>
                                    {
                                        this.state.success && <div className="success-box">
                                            {this.state.success}
                                        </div>
                                    }
                                    <label
                                        htmlFor="staffNo"
                                        className={(this.state.PersonalDataFormError && this.state.staffNo === '') ? 'error' : 'registration__label'}
                                    >Staff No.
                                    <input
                                            type="text"
                                            name="staffNo"
                                            onChange={event => this.handleInputChange(event)}
                                            value={this.state.staffNo}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label
                                        htmlFor="stfPassword"
                                        className={(this.state.PersonalDataFormError && this.state.stfPassword === '') ? 'error' : 'registration__label'}
                                    >Password
                                    <input
                                            type="password"
                                            name="stfPassword"
                                            onChange={event => this.handleInputChange(event)}
                                            value={this.state.stfPassword}
                                        />
                                    </label>
                                </div>
                                {
                                    this.state.errText &&
                                    <div className="error-box">
                                        {this.state.errText}
                                    </div>
                                }
                                <button type="submit" id="stfSubmit" className="button">{this.state.buttonName}</button>
                            </form>
                        </div>
                        <div className="form__div">
                            <p>
                                <Link to="/students">Click here Student Portal</Link>
                            </p>
                            <p>
                                <Link to="/">Click here Admin Portal</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </LoadingOverlay>
        )
    }
}
export default StaffPage;
