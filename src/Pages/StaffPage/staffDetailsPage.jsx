import React from 'react';
import './staffPage.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class StaffDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: [],
        }
    }
    // componentWillMount() {
    //     this.getStaff();
    // }

    // getStaff() {
    //     Axios
    //         .get('https://cors-anywhere.herokuapp.com/https://csc-group-1a.herokuapp.com/staffs')
    //         .then(resp => {
    //             console.log('resp', resp.data.staffs);
    //             this.setState = ({
    //                 staff: resp.data.staffs,
    //             })
    //         })
    //         .catch(err => {
    //             console.log('error', err)
    //         })
    //     }
        
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
        return (
            <div>
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
                         this.setState({loading: true})
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
        )
    }
}
export default StaffDetailsPage;
