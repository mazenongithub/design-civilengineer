import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import { folderIcon, goCheckIcon } from './svg'
import {validateProviderID,validateEmail} from './functions'
import {CheckProviderID, CheckEmailAddress} from './actions/api'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message:''}
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

    

    showprofileimage() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const profileImage = design.getprofiledimensions.call(this)

        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profileImage }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
        } else {
            return;


        }

    }

    async checkemailaddress() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);
       
        if (!errmsg) {
            const response = await CheckEmailAddress(myuser.emailaddress)
            if (response.hasOwnProperty("invalid")) {
                myuser.invalidemail = `${response.invalid}`
                this.props.reduxUser({myuser})
                this.setState({ message: response.invalid })
            } else {
                delete myuser.invalidemail;
                this.props.reduxUser({myuser})
                this.setState({ render: 'render' })
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser({myuser})
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.emailaddress;
        }

    }
    handleemailaddress(emailaddress) {
        const design = new Design();
        let myuser = design.getuser.call(this);
        const errmsg = validateEmail(emailaddress)
        
        if (myuser) {
            
            myuser.emailaddress = emailaddress;
            if(errmsg) {
                myuser.invalidemail = emailaddress;
                this.props.reduxUser({myuser});
                this.setState({message:errmsg})
            } else {
                if(myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail;
                    this.props.reduxUser({myuser})
                    this.setState({message:''})
                }
            }
          
            this.setState({ render: 'render' })
        }

    }
    getphonenumber() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.phonenumber;
        }

    }
    handlephonenumber(phonenumber) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser({ myuser })
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.lastname;
        }

    }
    handlelastname(lastname) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser({ myuser })
            this.setState({ render: 'render' })
        }

    }
    getfirstname() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.firstname;
        }

    }
    handlefirstname(firstname) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser({ myuser })
            this.setState({ render: 'render' })
        }

    }
    getprofile() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.profile;
        }

    }
    handleprofile(profile) {
        const design = new Design();
        const validate = validateProviderID(profile);
        let myuser = design.getuser.call(this);
        if (!validate) {

            if (myuser.hasOwnProperty("invalid")) {
                delete myuser.invalid;
            }
            if (myuser) {
                myuser.profile = profile;
                this.props.reduxUser({myuser});
                this.setState({ message: '' })
            }

        } else {
            myuser.profile = profile;
            myuser.invalid = validate;
            this.props.reduxUser({myuser});
            this.setState({ message: validate })

        }

    }

    async checkprofile(profile) {
        const design = new Design();
        const myuser = design.getuser.call(this);

        if (myuser) {
            let validate = validateProviderID(profile)
            if (profile && !validate) {
                try {
                    let response = await CheckProviderID(profile);
                    console.log(response)
                    if (response.hasOwnProperty("invalid")) {
                        myuser.invalid = response.invalid;
                        this.props.reduxUser({myuser});
                        this.setState({ message: response.invalid })
                    } else if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {
                            delete myuser.invalid;
                            this.setState({ message: '' })
                        }
                    }
                } catch (err) {
                    alert(err)
                }
            }

        }
    }

    render() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        const profileDimensions = design.getprofiledimensions.call(this);;
        const folderSize = design.getFolderSize.call(this);
        const regularFont = design.getRegularFont.call(this)
        const goIcon = design.getgocheckheight.call(this)

        const showButton = () => {

            if (!myuser.hasOwnProperty("invalid") && myuser.profile) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return;
            }
        }


        const emailicon = () => {
            if (!myuser.hasOwnProperty("invalidemail") && myuser.emailaddress) {
            return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            }
        }

        if (myuser) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <input type="text" value={this.getprofile()}
                                onChange={event => { this.handleprofile(event.target.value) }}
                                style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                                onBlur={event => { this.checkprofile(event.target.value) }}
                            />
                            {showButton()}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex2 }}>
                                <div style={{ ...styles.generalContainer, ...profileDimensions, ...styles.showBorder, ...styles.margin10, ...styles.alignRight }}>
                                    {this.showprofileimage()}
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                                <input type="file" id="profile-image" />
                                <button style={{ ...styles.generalButton, ...folderSize }} onClick={() => { this.uploadprofileimage() }}>
                                    {folderIcon()}
                                </button>
                            </div>
                        </div>




                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>First Name</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getfirstname()}
                                    onChange={event => { this.handlefirstname(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>Last Name</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getlastname()}
                                    onChange={event => { this.handlelastname(event.target.value) }} />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>EmailAddress</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getemailaddress()}
                                    onChange={event => { this.handleemailaddress(event.target.value) }}
                                    onBlur={()=>{this.checkemailaddress()}} />
                                    {emailicon()}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>Phone Number</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getphonenumber()}
                                    onChange={event => { this.handlephonenumber(event.target.value) }}
                                />
                            </div>
                        </div>

                        <div style={{...styles.generalContainer, ...styles.alignCenter}}>
                            <span style={{...regularFont,...styles.generalFont}}>{this.state.message}</span>
                        </div>

                        {design.showsaveprofile.call(this)}

            

                    </div>
                </div>




            )
        } else {
            return (<div>Login to view Profile</div>)
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

export default connect(mapStateToProps, actions)(Profile);