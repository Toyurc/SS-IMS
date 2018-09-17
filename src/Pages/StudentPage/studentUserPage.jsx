import React from 'react';
import './studentPage.css';
import {Link} from 'react-router-dom';
class StudentUserPage extends React.Component {
    render() {
        let matricNo =  this.props.match.params.matricNo
        return (<div>
            niqqqqa {matricNo}
        </div>)
    }
}
export default StudentUserPage;