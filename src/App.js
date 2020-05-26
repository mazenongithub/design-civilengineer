import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './components/actions';
import {CheckUser} from './components/actions/api'
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';
import Specifications from './components/specifications'
import Specification from './components/specification'
import Header from './components/header'
import Profile from './components/profile';
import Projects from './components/projects'
import Project from './components/project'
import Login from './components/login'
import Landing from './components/landing'
import Design from './components/design';
import CSIS from './components/csis'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0,natigation:false, activeslideid:'design' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    firebase.initializeApp(firebaseConfig());
    this.updateWindowDimensions();
    this.checkuser()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  

  async checkuser() {
    let response = await CheckUser();
    console.log(response)
    this.props.reduxUser(response)
  }
 

  render() {

const header = new Header();
const landing = new Landing();
const design = new Design();
const myuser = design.getuser.call(this)
const showlanding = () => {
  if(myuser) {
    return(<Profile/>)

  } else {
  return(landing.showlanding.call(this))
  }
}

const showlogin = () => {
  if(myuser) {
    return(<Profile/>)

  } else {
  return(<Login/>)
  }
}




    return (
      <BrowserRouter>
      <div>
        {header.showheader.call(this)}
        <Switch>
          <Route exact path="/" component={showlanding} />
          <Route exact path="/profile/login" component={showlogin} />
          <Route exact path="/:profile/csis" component={CSIS} />
          <Route exact path="/:profile/profile" component={Profile} />
          <Route exact path="/:profile/projects" component={Projects} />
          <Route exact path="/:profile/projects/:title" component={Project} />
          <Route exact path="/:profile/projects/:title/specifications" component={Specifications} />
          <Route exact path="/:profile/projects/:title/specifications/:csiid" component={Specification} />
        </Switch>

      </div>
    </BrowserRouter>)

  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    allusers: state.allusers,
    allcompanys: state.allcompanys,
    project:state.project
  }
}

export default connect(mapStateToProps, actions)(App);