import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import Signup from './Signup';
import Home from './Home';
import EmployeeDetails from './EmployeeDetails';
import Login from './Login';
import PrivateRoute from './PrivateRoute';


import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
this.handleLogin = this.handleLogin.bind(this);


    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });   
    
    this.handleLogin = this.handleLogin.bind(this);

  }


  componentDidMount() {
    
  }

  
  handleLogin() {
    notification.success({
      message: 'HR System',
      description: "You're successfully logged in.",
    });
    //this.loadCurrentUser();

    this.setState({
      isAuthenticated: true,
      isLoading: false
    });

    this.props.history.push("/Home");
  }

  render() {
   
    return (
        <Layout className="app-container">
      

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <PrivateRoute path="/Home" authenticated={this.state.isAuthenticated}  exact component={Home} ></PrivateRoute>
                <PrivateRoute path="/Signup" authenticated={this.state.isAuthenticated}  component={Signup}></PrivateRoute>
                <PrivateRoute path="/EmployeeDetails" authenticated={this.state.isAuthenticated} component={EmployeeDetails}></PrivateRoute>
                <Route path="/" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
             
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);