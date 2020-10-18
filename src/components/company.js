import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import { addIcon, goCheckIcon } from './svg';
import { validateProviderID } from './functions';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message:''}
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ title: this.props.match.params.title })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getcompanyurl() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let url = "";
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                url = myuser.company.url;
            }


        }
        return url;

    }

    handlecompanyurl(url) {

        const design = new Design();
        const myuser = design.getuser.call(this);

        const invalid = validateProviderID(url)
        

        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.url = url;
                

                this.props.reduxUser({ myuser })
                this.setState({ render: 'render' })


                if(invalid) {
          
                myuser.company.invalid = invalid;
                this.props.reduxUser({ myuser })
                this.setState({ message:invalid })
                
            }
        }

    }

    }

    getcompanyname() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let name = "";
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                name = myuser.company.company;
            }


        }
        return name;

    }

    handlecompanyname(name) {

        const design = new Design();
        const myuser = design.getuser.call(this)

        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.company = name;
                this.props.reduxUser({ myuser })
                this.setState({ render: 'render' })


            }
        }

    }

    getcompanyaddress() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let address = "";
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                address = myuser.company.address;
            }


        }
        return address;

    }

    handlecompanyaddress(address) {

        const design = new Design();
        const myuser = design.getuser.call(this)

        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.address = address;
                this.props.reduxUser({ myuser })
                this.setState({ render: 'render' })


            }
        }

    }

    getcompanycity() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let city = "";
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                city = myuser.company.city;
            }
    
    
        }
        return city;
    
    }
    
    handlecompanycity(city) {
    
        const design = new Design();
        const myuser = design.getuser.call(this)
     
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                myuser.company.city = city;
                this.props.reduxUser({myuser})
                this.setState({render:'render'})
    
    
            }
        }
    
    }

    getcompanyzipcode() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let zipcode = "";
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                zipcode = myuser.company.zipcode;
            }
    
    
        }
        return zipcode;
    
    }
    
    handlecompanyzipcode(zipcode) {
    
        const design = new Design();
        const myuser = design.getuser.call(this)
     
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                myuser.company.zipcode = zipcode;
                this.props.reduxUser({myuser})
                this.setState({render:'render'})
    
    
            }
        }
    
    }

    getcompanycontactstate() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let contactstate = "";
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                contactstate = myuser.company.contactstate;
            }
    
    
        }
        return contactstate;
    
    }
    
    handlecompanycontactstate(contactstate) {
    
        const design = new Design();
        const myuser = design.getuser.call(this)
     
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                myuser.company.contactstate = contactstate;
                this.props.reduxUser({myuser})
                this.setState({render:'render'})
    
    
            }
        }
    
    }

    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const myuser = design.getuser.call(this)
        const regularFont = design.getRegularFont.call(this)
        const headerFont = design.getHeaderFont.call(this)
        const gocheckicon = design.getgocheckheight.call(this)
        const fieldWidth = () => {

            if (this.state.width > 1200) {
                return ({ width: '550px' })
            } else if (this.state.width > 600) {
                return ({ width: '275px' })
            } else {
                return ({ width: '200px' })
            }

        }

        if (myuser) {

            const mycompany = () => {
                if (myuser.hasOwnProperty("company")) {
                    return (`/${myuser.company.url}`)
                } else {
                    return (`/company`)
                }
            }

            const valid = () => {
                if(myuser.hasOwnProperty("company")) {
                    if(!myuser.company.hasOwnProperty("invalid")) {
                      return(<button style={{ ...styles.generalButton, ...gocheckicon }}>{goCheckIcon()}</button>)
                    }
                }
            }

            const companypage = () => {

                if (myuser.hasOwnProperty("company")) {




                    return (
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>Company URL</span>
                                    <input type="text" style={{ ...regularFont, ...styles.generalFont }}
                                        value={this.getcompanyurl()}
                                        onChange={event => { this.handlecompanyurl(event.target.value) }} 
                                        onBlur={()=>{design.checkcompanyurl.call(this,myuser,myuser.company.url)}}
                                        />
                                        {valid()}

                                </div>



                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>Company Name</span>
                                    <input type="text" style={{ ...regularFont, ...styles.generalFont }}
                                        value={this.getcompanyname()}
                                        onChange={event => { this.handlecompanyname(event.target.value) }}
                                    />
                                </div>


                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1 }}>
                                        <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>Address</span>
                                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...fieldWidth(), ...styles.generalPadding }}
                                            value={this.getcompanyaddress()}
                                            onChange={event => { this.handlecompanyaddress(event.target.value) }}
                                        />
                                    </div>
                                    <div style={{ ...styles.flex1 }}>
                                        <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>City</span>
                                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...fieldWidth(), ...styles.generalPadding }} 
                                             value={this.getcompanycity()}
                                            onChange={event => { this.handlecompanycity(event.target.value) }}
                                        />
                                    </div>

                                </div>


                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1 }}>
                                        <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>State</span>
                                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...fieldWidth(), ...styles.generalPadding }}
                                         value={this.getcompanycontactstate()}
                                            onChange={event => { this.handlecompanycontactstate(event.target.value) }} />
                                    </div>
                                    <div style={{ ...styles.flex1 }}>
                                        <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>Zipcode</span>
                                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...fieldWidth(), ...styles.generalPadding }} 
                                             value={this.getcompanyzipcode()}
                                            onChange={event => { this.handlecompanyzipcode(event.target.value) }}
                                        />
                                    </div>

                                </div>


                                {design.showsaveprofile.call(this)}






                            </div>



                        </div>
                    )


                }

            }

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...styles.headerFamily, ...styles.boldFont, ...headerFont }}>/{myuser.profile}</span> <br />
                                <span style={{ ...styles.headerFamily, ...styles.boldFont, ...headerFont }}>{mycompany()}</span>



                            </div>

                        </div>
                        


                        {companypage()}

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1,...styles.alignCenter }}>
                                <span style={{...regularFont,...styles.generalFont}}>{this.state.message}</span>
                            </div>

                        </div>

                    </div>

                </div>

            )

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You must be logged in to view company</span>
                </div>

            </div>)
        }
    }




}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        project: state.project
    }
}

export default connect(mapStateToProps, actions)(Company);