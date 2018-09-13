import React from 'react';
import './landingPage.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminNo: '',
            adminPassword: '',
            formInProgress: false,
            PersonalDataFormError: false,
            buttonName: 'Login'
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
        console.log(this.state)
        this.setState({formInProgress: true, buttonName: "In Progress..."});

        document
            .getElementById('admin')
            .setAttribute('disabled', 'disabled')

        const validationState = this.validatePersonalDataForm();

        if (!validationState) {
            this.setState({formInProgress: false, buttonName: "Login"});
            document
                .getElementById('admin')
                .removeAttribute('disabled', 'disabled')
            return false;
        }
        const userDetails = this.state;

        Axios.get('https://csc-group-1a.herokuapp.com/login/students', {
            params: {
                username: userDetails.adminNo,
                password: userDetails.password
            }
        })
            .then(response => {
                console.log('response', response)

            })
            .catch(error => {
                console.log('error', error)
            });
    }

    validatePersonalDataForm() {
        const {adminNo, adminPassword} = this.state;

        if (!adminNo || !adminPassword) {
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
            <main>
                <section id="landing_page">
                    <header className="header">
                        <div className="header__text-box">
                            <h1 className="heading-primary">
                                <span className="heading-primary--main">Welcome</span>
                                <span className="heading-primary--sub">Administrator</span>
                            </h1>
                            <h3 className="heading-primary--sub">Login With your details below</h3>
                        </div>
                    </header>
                </section>
                <section id="login_form" className="section__login">
                    <div className="form__div card">
                        <h3>Admin</h3>
                        <form
                            onSubmit={event => this.personalDataFormHandler(event)}
                            id="admin_form"
                            method="POST">
                            <div>
                                <label
                                    htmlFor="adminNo"
                                    className={(this.state.PersonalDataFormError && this.state.adminNo === '')
                                    ? 'error'
                                    : 'registration__label'}>Staff No.
                                    <input
                                        type="text"
                                        name="adminNo"
                                        onChange={event => this.handleInputChange(event)}
                                        value={this.state.adminNo}/>
                                </label>
                            </div>
                            <div>
                                <label
                                    htmlFor="adminPassword"
                                    className={(this.state.PersonalDataFormError && this.state.adminPassword === '')
                                    ? 'error'
                                    : 'registration__label'}>Password
                                    <input
                                        type="password"
                                        name="adminPassword"
                                        onChange={event => this.handleInputChange(event)}
                                        value={this.state.adminPassword}/>
                                </label>
                            </div>
                            {this.state.errText && <div className="error-box">
                                {this.state.errText}
                            </div>
}
                            <button type="submit" id="admin" className="button">{this.state.buttonName}</button>
                        </form>
                    </div>
                    <div className="form__div">
                        <p>
                            <Link to="/staffs">Click here Staff Portal</Link>
                        </p>
                        <p>
                            <Link to="/students">Click here Student Portal</Link>
                        </p>
                    </div>
                </section>
            </main>
        )
    }
}
export default LandingPage;
