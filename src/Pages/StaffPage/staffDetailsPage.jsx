import React from 'react';
import './staffPage.css';
import NavBar from '../../Components/Nav';
import Axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom'
import { BASE_URL } from '../../config';
import AxiosInstance from '../../requestClient'

class StaffDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: [],
            staffDetails: []
        }
    }
    columns() {
        return [
            {
                Header: 'Staff No.',
                accessor: 'staff_id'

            },
            {
                Header: 'Staff Name',
                accessor: 'staff_name'

            },
        ]
    }

    detailsColumn() {
        return [
            {
                Header: 'Staff ID',
                accessor: 'staff_id'
            },
            {
                Header: 'Date of Employemnt',
                accessor: 'date_of_employment'
            },
            {
                Header: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                accessor: 'last_name'
            },
            {
                Header: 'Phone No.',
                accessor: 'phone_number'
            },
            {
                Header: 'Email',
                accessor: 'email_address'
            }, {
                Header: 'Department',
                accessor: 'department'
            },
        ]
    }

    render() {
        let accessToken = sessionStorage.getItem('access-token');
        return (
            accessToken ?
                <div>
                    <NavBar />
                    <h2>Staff List</h2>
                    <ReactTable
                        className={'-striped text-align'}
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
                        data={this.state.staffs} // should default to []
                        onFetchData={(state, instance) => {
                            // show the loading overlay
                            this.setState({ loading: true })
                            // fetch your data
                            Axios.get(BASE_URL + 'staffs')
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        staffs: res.data.staffs,
                                    })
                                })
                        }}
                        SubComponent={
                            row => {
                                return (
                                    <div>
                                        <ReactTable
                                            className={'-striped text-align '}
                                            columns={this.detailsColumn()}
                                            defaultPageSize={1}
                                            manual
                                            freezeWhenExpanded={true}
                                            showPagination={false}
                                            getTheadProps={(state, rowInfo, column) => {
                                                return {
                                                    style: {
                                                        background: "#FFF",
                                                        color: "#000",
                                                        border: "30px",
                                                    }
                                                };
                                            }}
                                            data={this.state.staffDetails}
                                            onFetchData={(state, instance) => {
                                                // fetch your data
                                                AxiosInstance.get(BASE_URL + `staffs/${row.original.staff_id}`)
                                                    .then((res) => {
                                                        // Update react-table
                                                        this.setState({
                                                            staffDetails: res.data,
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
export default StaffDetailsPage;
