import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from "react-redux";

import './App.css';

import  Register from './components/auth/Register';
import  Login from './components/auth/Login';
import  Forgot from './components/auth/Forgot';
import  Profile from './components/profile/Profile';
import setAuthToken from "./utils/setAuthToken";

import store from './store';




setAuthToken();

class App extends Component {


  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">


                  <div className="main">
                      <Route exact path="/register" component={Register}/>
                      <Route exact path="/forgot" component={Forgot}/>
                      <Route exact path="/" component={Login}/>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/profile" component={Profile}/>

                  </div>

              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
