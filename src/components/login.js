import React, {Component} from 'react';
import { MyStylesheet } from './styles';
import Design from './design';
import ClientID from './clientid';
import Profile from './profile';
import * as actions from './actions';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
 
    render() {
        const design = new Design();
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this);
        const clientid = new ClientID();

        const myuser= design.getuser.call(this)
        if(myuser) {
     
            return(<Profile/>)
        } else {
            return(<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
    
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                            Login
                        </div>
                    </div>
    
                    {clientid.showclientid.call(this, "login")}
    
                </div>
            </div>)

        }
        

    }

}

function mapStateToProps(state) {
    return {
      myusermodel: state.myusermodel,
      navigation: state.navigation,
      project: state.project,
      allusers: state.allusers,
      allcompanys: state.allcompanys,
      csis: state.csis
    }
  }
  
  export default connect(mapStateToProps, actions)(Login);