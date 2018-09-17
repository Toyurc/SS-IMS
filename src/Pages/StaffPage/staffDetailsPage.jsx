import React from 'react';
import './staffPage.css';
import NavBar from '../../Components/Nav';
import Axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom'

class StaffDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: [],
        }
    }
    columns() {
        return [
            {
                Header: 'Staff No.',
                accessor: 'staff_id' // String-based value accessors!

            },
            {
                Header: 'Staff Name',
                accessor: 'staff_name' // String-based value accessors!

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
                            Axios.get('https://cors-anywhere.herokuapp.com/https://csc-group-1a.herokuapp.com/staffs')
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        staffs: res.data.staffs,
                                    })
                                })
                        }}
                    />
                </div>
                : <Redirect to="/staffs" />
        )
    }
}
export default StaffDetailsPage;
