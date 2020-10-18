import React, { Component } from 'react';
import Design from './design'
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import CSI from './csi'
import { saveProjectSpecs, addIcon } from './svg'
import { trailingZeros,inputUTCStringForLaborID } from './functions';
import {DeleteCSI} from './actions/api'
import MakeID from './makeid';

class CSIS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, csi_1: '', csi_2: '', csi_3: '', csi_4: '', title: ''
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
    async deletecsi(csi) {
        if(window.confirm(`Are you sure you want to delete ${csi.csi}-${csi.title}?`)) {
        const design = new Design();
        const csicodes = design.getallcsicodes.call(this)
        if (csicodes) {
            
                const values = { csi }
                console.log(values)
                try {
                    const response = await DeleteCSI(values);
                    console.log(response)

                    if (response.hasOwnProperty("csiid")) {
                        const csis = design.getcsibyid.call(this, response.csiid)
                        if (csis) {
                            const i = design.getcsikeybyid.call(this, response.csiid)
                            console.log(i)
                            csicodes.splice(i,1)
                            this.props.reduxCSIs(csicodes)
                            this.setState({activecsiid:false, csi_1:"", csi_2:"", csi_3:"", csi_4:"", title:""})
                        }
                    }
                   
                    let message = "";
                    if (response.hasOwnProperty('message')) {

                        message += response.message

                    }
                    if (response.hasOwnProperty("lastupdated")) {
                        message += `Last Updated ${inputUTCStringForLaborID(response.lastupdated)}`
                    }

                    this.setState({ message })


                } catch (err) {
                    alert(err)
                }

            

        }


    }

    }

    handletitle(title) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (this.state.activecsiid) {
                const csicodes = design.getallcsicodes.call(this)
                if (csicodes) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid)
                    if (csi) {
                        const i = design.getcsikeybyid.call(this, this.state.activecsiid)
                        csicodes[i].title = title;
                        csicodes[i].providerid = myuser.providerid;
                        csicodes[i].updatedby = myuser.providerid;
                        this.props.reduxCSIs(csicodes)
                        this.setState({ render: 'render' })
                    }
                }
            } else {
                this.setState({ title })
            }

        }



    }

    handlecsiid(csiid) {
  
        if (this.state.activecsiid === csiid) {
            this.setState({ activecsiid: false, csi_1: '', csi_2: '', csi_3: '', csi_4: '', title:'' })
        } else {
          
            this.setState({ activecsiid: csiid})
        }
    }


    gettitle() {
        const design = new Design();
        if (this.state.activecsiid) {
            const csi = design.getcsibyid.call(this, this.state.activecsiid)
            return csi.title;

        } else {
            return this.state.title;
        }

    }


    removecsi(csi) {
        if(window.confirm(`Are you sure you want to delete ${csi.csi} ${csi.title}?`)) {
            console.log(csi)
        }
       
    }

    getcsi_1() {
        const design = new Design();
        let csi_1 = "";
        if (this.state.activecsiid) {
            const csi = design.getcsibyid.call(this, this.state.activecsiid);
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
            }


        } else {
            csi_1 = this.state.csi_1;
        }

        return csi_1;

    }
    handlecsi_1(csi_1) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            if (this.state.activecsiid) {
                if (csi_1.length === 1) {
                    csi_1 = trailingZeros(csi_1)
                }
                const csicodes = design.getallcsicodes.call(this)

                if (csicodes) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi && csi_1.length === 2) {
                        const csi_2 = csi.csi.substr(2, 9)
                        const i = design.getcsikeybyid.call(this, this.state.activecsiid);
                        csicodes[i].csi = `${csi_1}${csi_2}`
                        csicodes[i].providerid = myuser.providerid
                        csicodes[i].updatedby = myuser.providerid;
                        this.props.reduxCSIs(csicodes);
                        this.setState({ render: 'render' })

                    }

                }

            } else {
                this.setState({ csi_1 })
            }

        }

    }

    getcsi_2() {
        const design = new Design();
        let csi_2 = "";
        if (this.state.activecsiid) {

            const csi = design.getcsibyid.call(this, this.state.activecsiid);
            if (csi) {
                csi_2 = csi.csi.substr(2, 2)
            }

        } else {
            csi_2 = this.state.csi_2;
        }

        return csi_2;

    }
    handlecsi_2(csi_2) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {


            if (this.state.activecsiid) {

                if (csi_2.length === 1) {
                    csi_2 = trailingZeros(csi_2)
                }

                const csicodes = design.getallcsicodes.call(this)

                if (csicodes) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi && csi_2.length === 2) {
                        const csi_1 = csi.csi.substr(0, 2)
                        const csi_3 = csi.csi.substr(4, 9)
                        const i = design.getcsikeybyid.call(this, this.state.activecsiid);
                        csicodes[i].csi = `${csi_1}${csi_2}${csi_3}`
                        csicodes[i].providerid = myuser.providerid
                        csicodes[i].updatedby = myuser.providerid;
                        this.props.reduxCSIs(csicodes);
                        this.setState({ render: 'render' })

                    }

                }

            } else {
                this.setState({ csi_2 })
            }

        }

    }


    getcsi_3() {
        const design = new Design();

        let csi_3 = "";
        const myuser = design.getuser.call(this)
        if (myuser) {

            if (this.state.activecsiid) {

                const csi = design.getcsibyid.call(this, this.state.activecsiid);
                if (csi) {
                    csi_3 = csi.csi.substr(4, 2)
                }

            } else {
                csi_3 = this.state.csi_3;
            }

        }

        return csi_3;

    }
    handlecsi_3(csi_3) {

        const design = new Design();

        const myuser = design.getuser.call(this)
        if (myuser) {
            if (this.state.activecsiid) {

                if (csi_3.length === 1) {
                    csi_3 = trailingZeros(csi_3)
                }

                const csicodes = design.getallcsicodes.call(this)

                if (csicodes) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi && csi_3.length === 2) {
                        const csi_1 = csi.csi.substr(0, 4)
                        const csi_4 = csi.csi.substr(6, 3)
                        const i = design.getcsikeybyid.call(this, this.state.activecsiid);
                        csicodes[i].csi = `${csi_1}${csi_3}${csi_4}`
                        csicodes[i].providerid = myuser.providerid
                        csicodes[i].updatedby = myuser.providerid;
                        this.props.reduxCSIs(csicodes);
                        this.setState({ render: 'render' })

                    }

                }

            } else {
                this.setState({ csi_3 })
            }

        }

    }


    getcsi_4() {
        const design = new Design();
        let csi_4 = "";
        if (this.state.activecsiid) {

            const csi = design.getcsibyid.call(this, this.state.activecsiid);
            if (csi) {
                csi_4 = csi.csi.substr(7, 2)
            }

        } else {
            csi_4 = this.state.csi_4;
        }

        return csi_4;

    }
    handlecsi_4(csi_4) {
        const design = new Design();

        const myuser = design.getuser.call(this)
        if (myuser) {

            if (this.state.activecsiid) {

                if (csi_4.length === 1) {
                    csi_4 = trailingZeros(csi_4)
                }

                const csicodes = design.getallcsicodes.call(this)

                if (csicodes) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi && csi_4.length === 2) {
                        const csi_1 = csi.csi.substr(0, 6)
                        const i = design.getcsikeybyid.call(this, this.state.activecsiid);
                        csicodes[i].csi = `${csi_1}.${csi_4}`
                        csicodes[i].providerid = myuser.providerid;
                        csicodes[i].updatedby = myuser.providerid;
                        this.props.reduxCSIs(csicodes);
                        this.setState({ render: 'render' })

                    }

                }

            } else {
                this.setState({ csi_4 })
            }

        }

    }

    addnewspec(code) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        const makeid = new MakeID();
        if(myuser) {
            const csicodes = design.getallcsicodes.call(this)
            if(csicodes) {

        const newCSI = (csiid,code,title,providerid, updatedby) => {
            return({csiid,csi:code,title,providerid,updatedby})

        }

        
        const csiid = makeid.csiid.call(this,code)
        const title = this.state.title;
        const providerid = myuser.providerid;
        const updatedby = myuser.providerid
        const csi  = newCSI(csiid,code,title,providerid, updatedby)

        csicodes.push(csi)
        this.props.reduxCSIs(csicodes)

        this.setState({activecsiid:csiid})




    }

}

    }




    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        const csi = new CSI();
        const companyid = design.getcompanyid.call(this)
        const saveprojecticon = design.getsaveprojecticon.call(this)
        const csis = design.getallcsicodes.call(this);
        const addicon = design.getaddicon.call(this)
        if (!csis) {
            design.loadcsis.call(this, companyid)
        }
        const myuser = design.getuser.call(this);


        const csiwidth = () => {

            if (this.state.width > 1200) {
                return ({ maxWidth: '700px' })
            } else if (this.state.width > 600) {
                return ({ maxWidth: '600px' })
            } else {
                return ({ maxWidth: '400px' })
            }
        }

        const csifieldwidth = () => {

            if (this.state.width > 1200) {
                return ({ maxWidth: '80px' })
            } else if (this.state.width > 600) {
                return ({ maxWidth: '60px' })
            } else {
                return ({ maxWidth: '40px' })
            }

        }

        const titlewidth = () => {
            if (this.state.width > 1200) {
                return ({ width: '80%' })
            } else if (this.state.width > 600) {
                return ({ width: '75%' })
            } else {
                return ({ width: '70%' })
            }

        }

        const statesearch = () => {
            if (this.state.activecsiid) {
                const activecsi = design.getcsibyid.call(this, this.state.activecsiid)
                return (csi.showcsiid.call(this, activecsi))

            } else {
                return (csi.showsearchresults.call(this))
            }
        }

        const showsavespecs = () => {
            const savespec = design.getupdatedcsis.call(this)

            if (savespec) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.marginTop20 }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { design.saveupdatedcsis.call(this) }}>{saveProjectSpecs()}</button>
                    </div>)
            }
        }

        const showaddspec = () => {
            if (!this.state.activecsiid) {
                if (this.state.csi_1.length === 2 && this.state.csi_2.length === 2 && this.state.csi_3.length === 2) {
                    let code = `${this.state.csi_1}${this.state.csi_2}${this.state.csi_3}`
                    if(this.state.csi_4.length === 2) {
                        code+=`.${this.state.csi_4}`
                    }
                    if (this.state.title) {
                        return (
                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex4 }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>{code}-{this.state.title}</span>
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <button style={{ ...styles.generalButton, ...addicon }} onClick={() => { this.addnewspec(code) }}>{addIcon()}</button>
                                </div>
                            </div>
                        )
                    }

                }


            }
        }




        if (myuser) {

            if (myuser.hasOwnProperty("company")) {


                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <span style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont }}>/{myuser.profile}</span> <br />
                                    <span style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont }}>/{myuser.company.url}</span> <br />
                                    <span style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont }}>/specificatons</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...csiwidth(), ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}> Spec </span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalPadding, ...csifieldwidth() }}
                                        value={this.getcsi_1()}
                                        onChange={event => { this.handlecsi_1(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalPadding, ...csifieldwidth() }}
                                        value={this.getcsi_2()}
                                        onChange={event => { this.handlecsi_2(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalPadding, ...csifieldwidth() }}
                                        value={this.getcsi_3()}
                                        onChange={event => { this.handlecsi_3(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalPadding, ...csifieldwidth() }}
                                        value={this.getcsi_4()}
                                        onChange={event => { this.handlecsi_4(event.target.value) }} />
                                </div>
                            </div>


                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>

                                    <span style={{ ...regularFont, ...styles.generalFont, ...styles.rightMargin15 }}>Title</span>

                                    <input style={{ ...regularFont, ...styles.generalFont, ...styles.addMargin, ...styles.showBorder, ...styles.bottomMargin15, ...titlewidth() }}
                                        onChange={event => { this.handletitle(event.target.value) }}
                                        value={this.gettitle()}
                                    />

                                    {showaddspec()}

                                </div>
                            </div>




                            {statesearch()}


                            {showsavespecs()}






                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.marginTop20 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>{this.state.message}</span>
                                </div>
                            </div>



                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>
                        Create or Join a Company to Create Specs
                    </span>

                </div>)
            }

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>
                        Please Login to Create Specs
                </span>

                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        project: state.project,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(CSIS);

