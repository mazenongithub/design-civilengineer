import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import { folderIcon } from './svg'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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
    getemailaddress() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            return myuser.emailaddress;
        }

    }
    handleemailaddress(emailaddress) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            myuser.emailaddress = emailaddress;
            this.props.reduxUser({ myuser })
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
        const myuser = design.getuser.call(this)
        if (myuser) {
            myuser.profile = profile;
            this.props.reduxUser({ myuser })
            this.setState({ render: 'render' })
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
        if (myuser) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont }}>{myuser.profile}/profile</span>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>Profile</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getprofile()}
                                    onChange={event => { this.handleprofile(event.target.value) }}
                                />
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
                                    onChange={event => { this.handleemailaddress(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>Phonenumber</div>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getphonenumber()}
                                    onChange={event => { this.handlephonenumber(event.target.value) }}
                                />
                            </div>
                        </div>

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