import React from 'react';
import './studentPage.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import NavBar from '../../Components/Nav';
import { Redirect } from 'react-router-dom';
import AxiosInstance from '../../requestClient'
import { BASE_URL } from '../../config';


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
                accessor: 'matric' 

            },
            {
                Header: 'Student Name',
                accessor: 'name' 

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
                        data={this.state.students}
                        onFetchData={(state, instance) => {
                            // fetch your data
                            AxiosInstance.get(BASE_URL +'students')
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        students: res.data.students,
                                    })
                                })
                        }}
                        SubComponent={
                            row => {
                                return (
                                    <div>
                                        <h1>Holla Amigos</h1>
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
                                        data={this.state.studentDetails} 
                                        onFetchData={(state, instance) => {
                                            // fetch your data
                                            AxiosInstance.get(BASE_URL + `students/${row.original.matric}`)
                                                .then((res) => {
                                                    console.log(res)
                                                    // Update react-table
                                                    this.setState({
                                                        studentDetails: res.data,
                                                    })
                                                })
                                        }}
                                    />
                                    </div>
                                );
                            }
                        }
                    />

                </div>
                : <Redirect to="/" />
        )
    }
}
export default studentDetailsPage;
