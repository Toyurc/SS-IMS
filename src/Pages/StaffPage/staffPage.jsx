import React from 'react';
import './staffPage.css';
import { Link } from 'react-router-dom';
class StaffPage extends React.Component {
    render() {
        return (
            <main>
                <section id="landing_page">
                    <header className="header">
                        <div className="header__text-box">
                            <h1 className="heading-primary">
                                <span className="heading-primary--main">Welcome</span>
                                <span className="heading-primary--sub">Staff and Students</span>
                            </h1>
                            <h3 className="heading-primary--sub">Login With your details below</h3>
                        </div>
                    </header>
                </section>
                <section id="login_form" className="section__login">
                    <div className="form__div card">
                    <h3>Staffs</h3>
                        <form id="staff_form" method="POST">
                            <div>
                                <label htmlFor="staffNo">Staff No.
                                    <input type="text" name="staffNo" />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="stfPassword">Password
                                    <input type="password" name="stfPassword" />
                                </label>
                            </div>
                            <Link to="/staffs">
                                <button type="submit" name="stfSubmit" className="button">Login</button>
                            </Link>
                        </form>
                    </div>
                    <div>
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
export default StaffPage;
