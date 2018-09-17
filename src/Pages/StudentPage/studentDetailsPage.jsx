import React from 'react';
import './studentPage.css';
import Axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import NavBar from '../../Components/Nav';
import { Redirect } from 'react-router-dom';

class studentDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            studentDetails: [],
        }
    }

    columns() {
        return [
            {
                Header: 'Matric No.',
                accessor: 'matric' // String-based value accessors!

            },
            {
                Header: 'Student Name',
                accessor: 'name' // String-based value accessors!

            },
        ]
    }

    detailsColumn() {
        return [
            {
                Header: 'Admitted',
                accessor: 'admission_year'
            },
            {
                Header: 'Email',
                accessor: 'email_address'
            },
            {
                Header: 'Graduated',
                accessor: ' graduation_year'
            },
            {
                Header: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Middle Name',
                accessor: 'middle_name'
            },
            {
                Header: 'Last Name',
                accessor: 'last_name'
            },
            {
                Header: 'Matric No.',
                accessor: 'matric_number'
            },
            {
                Header: 'Phone No.',
                accessor: 'phone_number'
            },
        ]
    }

    render() {
        let accessToken = sessionStorage.getItem('access-token');
        return (
            accessToken ?
                <div>
                    <NavBar />
                    <h2>Student List</h2>
                    <ReactTable
                        className={'-striped text-align '}
                        columns={this.columns()}
                        defaultPageSize={10}
                        getTheadProps={(state, rowInfo, column) => {
                            return {
                                style: {
                                    background: "#FFF",
                                    color: "#000",
                                    border: "30px",
                                }
                            };
                        }}
                        data={this.state.students} // should default to []
                        onFetchData={(state, instance) => {
                            // show the loading overlay
                            this.setState({ loading: true })
                            // fetch your data
                            Axios.get('https://cors-anywhere.herokuapp.com/https://csc-group-1a.herokuapp.com/students')
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        students: res.data.students,
                                    })
                                })
                            console.log('state', state)
                        }}
                        SubComponent={
                            row => {
                                return (
                                    <ReactTable
                                        className={'-striped text-align '}
                                        columns={this.detailsColumn()}
                                        defaultPageSize={1}
                                        getTheadProps={(state, rowInfo, column) => {
                                            return {
                                                style: {
                                                    background: "#FFF",
                                                    color: "#000",
                                                    border: "30px",
                                                }
                                            };
                                        }}
                                        data={this.state.studentDetails} // should default to []
                                        onFetchData={(state, instance) => {
                                            // show the loading overlay
                                            this.setState({ loading: true })
                                            // fetch your data
                                            Axios.get('https://cors-anywhere.herokuapp.com/https://csc-group-1a.herokuapp.com/students/')
                                                .then((res) => {
                                                    // Update react-table
                                                    this.setState({
                                                        studentDetails: res.data.students,
                                                    })
                                                })
                                        }}
                                    />
                                );
                            }
                        }
                    />

                </div>
                : <Redirect to="/students" />
        )
    }
}
export default studentDetailsPage;
