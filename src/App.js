import React, { Component } from 'react';
import './App.css';
import LandingPage from '../src/Pages/LandingPage/landingPage';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from './Pages/Dashboard/dashboard';
import { StaffRegistration,StudentRegistration } from './Pages/Registration';
import { StaffDetailsPage,StaffPage,StaffUserPage } from './Pages/StaffPage';
import { StudentDetailsPage,StudentPage,StudentUserPage } from './Pages/StudentPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="body">
          <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/staffs' exact component={StaffPage}/>
            <Route path='/register/staff' exact component={StaffRegistration}/> 
            <Route path='/staffs/table' exact component={StaffDetailsPage}/>
            <Route path='/staffs/:staffId' exact component={StaffUserPage}/>
            <Route path='/students' exact component={StudentPage}/>          
            <Route path='/register/student' exact component={StudentRegistration}/> 
            <Route path='/students/table' exact component={StudentDetailsPage}/>
            <Route path='/students/:matricNo' exact component={StudentUserPage}/>
            <Route path='/dashboard' exact component={Dashboard}/> 

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
