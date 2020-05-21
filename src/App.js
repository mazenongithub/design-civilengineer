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
const showlanding = () => {
  return(<div>Landing</div>)
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0 }
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

 

    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={showlanding} />
          <Route exact path="/:profile/company/:url/projects/:title/specifications" component={Specifications} />
          <Route exact path="/:profile/company/:url/projects/:title/specifications/:csiid" component={Specification} />
        </Switch>

      </div>
    </BrowserRouter>)

  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    allusers: state.allusers,
    allcompanys: state.allcompanys
  }
}

export default connect(mapStateToProps, actions)(App);