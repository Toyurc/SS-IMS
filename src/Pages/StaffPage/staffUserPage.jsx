import React from 'react';
import './staffPage.css';
import {Link} from 'react-router-dom';
class StaffUserPage extends React.Component {
    render() {
        let staffNo =  this.props.match.params.staffId
        return (<div>
            heeeeey  {staffNo}
        </div>)
    }
}
export default StaffUserPage;