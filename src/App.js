import React, { Component } from 'react';
import './App.css';
import LandingPage from '../src/Pages/LandingPage/landingPage';
import StaffPage from '../src/Pages/StaffPage/staffPage';
import StaffDetailsPage from '../src/Pages/StaffPage/staffDetailsPage';
import StudentPage from '../src/Pages/StudentPage/studentPage';
import StudentDetailsPage from '../src/Pages/StudentPage/studentDetailsPage';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="body">
          <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/staffs' exact component={StaffPage}/>
            <Route path='/staffs/:staffid' exact component={StaffDetailsPage}/>
            <Route path='/students' exact component={StudentPage}/>            
            <Route path='/students/:studentid' exact component={StudentDetailsPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
