import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import ClientID from './clientid'
import Design from './design';
import EmailAddress from './emailaddress'
import { loginnow } from './svg';
import Profile from './profile'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            width: '',
            height: '',
            login: true,
            register: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const styles = MyStylesheet();
        const clientid = new ClientID();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const emailaddress = new EmailAddress();
        const getloginnow = design.getloginnow.call(this)
        const myuser = design.getuser.call(this)
        const login = () => {
            if (this.state.emailaddress && this.state.clientid) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1,...styles.alignCenter}}>
                            <button style={{ ...styles.generalButton, ...getloginnow }} onClick={()=>{design.clientlogin.call(this)}}>{loginnow()}</button>
                        </div>
                    </div>)
            }
        }
        if(!myuser) {
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...headerFont }}>Login</span>
                    </div>
                </div>

                {clientid.showclientid.call(this)}
                {emailaddress.showemailaddress.call(this)}

                {login()}

            </div>
        </div>)

        } else {
            return(<Profile/>)
        }
    }
}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Login);
