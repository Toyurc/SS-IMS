import React from 'react';
import './nav.css';
import { withRouter} from 'react-router-dom';

const Nav = ({context,}) => (
    <div className="nav">
        <a className="log-out" onClick={event => context.LogOutHandler(event)}>LogOut</a>
    </div>
);

class NavBar extends React.Component {
    LogOutHandler(event) {
        event.preventDefault();
        sessionStorage.removeItem('access-token');
        sessionStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <Nav context={this}/>
        )
    }
}

export default withRouter(NavBar);