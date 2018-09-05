import React from 'react';
import './studentPage.css';
import { Link } from 'react-router-dom';
class StudentPage extends React.Component {
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
                        <form id="student_form" method="POST">
                            <div >
                                <label htmlFor="matricNo">Matric No.
                                    <input type="number" name="matricNo" />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="stuPassword">Password
                                    <input type="password" name="stuPassword" />
                                </label>
                            </div>
                            <Link to="/students">
                                <button type="submit" name="stu" className="button">Login</button>
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
export default StudentPage;
