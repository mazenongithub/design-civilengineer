import React, { Component } from 'react';
import Design from './design'
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import CSI from './csi'
import { CreateCSI } from './functions';

class CSIS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, natigation: false, activeslideid: 'design', csi_1: '', csi_2: '', csi_3: '', csi_4: '', title: ''
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

    handletitle(title) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        const getCSI = (csi_1, csi_2, csi_3, csi_4) => {
            let csi = "";
            if (csi_1) {
                csi += csi_1;
            } else {
                csi += `00`
            }
            if (csi_2) {
                csi += csi_2;
            } else {
                csi += `00`
            }
            if (csi_3) {
                csi += csi_3;
            } else {
                csi += `00`
            }

            if (csi_4) {
                csi += `.${csi_4}`;
            } else {
                csi += `00`
            }
            return csi;

        }
        if (myuser) {

            if (this.state.activecsiid) {
                const mycsi = design.getcsibyid.call(this, this.state.activecsiid);
                if (mycsi) {
                    const i = design.getcsikeybyid.call(this, this.state.activecsiid);
                    myuser.csicodes[i].title = title;
                    myuser.csicodes[i].providerid = myuser.providerid;
                    this.props.reduxUser({ myuser })
                    this.setState({ render: 'render' })
                }

            } else {

                let csi_1 = this.state.csi_1.substring(0, 2);
                let csi_2 = this.state.csi_2.substring(0, 2);
                let csi_3 = this.state.csi_3.substring(0, 2);
                let csi_4 = this.state.csi_4.substring(0, 2);
                let providerid = myuser.providerid;
                let csiid = getCSI(csi_1, csi_2, csi_3, csi_4);
                let csi = getCSI(csi_1, csi_2, csi_3, csi_4);
                let newCSI = CreateCSI(csiid, providerid, csi, title)
                myuser.csicodes.push(newCSI)
                this.props.reduxUser({ myuser })
                this.setState({ activecsiid: csiid })



            } // crete new csi

        }

    }
    handlecsiid(csiid) {
        const design = new Design();
        if (this.state.activecsiid === csiid) {
            this.setState({ activecsiid: false })
        } else {
            const csi = design.getcsibyid.call(this, csiid);
            const csi_1 = csi.csi.substring(0, 2)
            const csi_2 = csi.csi.substring(2, 4);
            const csi_3 = csi.csi.substring(4, 6);
            let csi_4 = "";
            if (csi.csi.length > 6) {
                csi_4 = csi.csi.substring(7, 9);
            }
            this.setState({ activecsiid: csiid, csi_1, csi_2, csi_3, csi_4 })
        }
    }
    getcsiid() {
        const design = new Design();
        if (this.state.activecsiid) {
            const csi = design.getcsibyid.call(this, this.state.activecsiid)
            return `${csi.csi}-${csi.title}`
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

    getcsi_1() {


        return this.state.csi_1;


    }


    getcsi_2() {



        return this.state.csi_2;


    }
    getcsi_3() {


        return this.state.csi_3;


    }
    getcsi_4() {


        return this.state.csi_4;

    }

    handlecsi_1(csi_1) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        this.setState({ csi_1 })
        const getCSI_1 = (csi) => {
            const csi_1b = csi.substring(2, 9);
            return `${csi_1}${csi_1b}`
        }

        if (myuser) {

            if (this.state.activecsiid) {
                if (csi_1.length > 1) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi) {
                        const csicode = getCSI_1(csi.csi);

                        const i = design.getcsikeybyid.call(this, this.state.activecsiid)
                        console.log(csicode)
                        myuser.csicodes[i].csi = csicode;

                        this.props.reduxUser({ myuser })
                        this.setState({ csi_1: csicode.substring(0, 2) })

                    } else {

                    }


                }


            } else {
                this.setState({ csi_1 })
            }

        }

    }

    handlecsi_2(csi_2) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        this.setState({ csi_2 })

        const getCSI_2 = (csi) => {

            const csi_2a = csi.substring(0, 2);
            const csi_2b = csi.substring(4, 9)
            return `${csi_2a}${csi_2}${csi_2b}`

        }

        if (myuser) {

            if (this.state.activecsiid) {
                if (csi_2.length > 1) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi) {
                        const csicode = getCSI_2(csi.csi);

                        const i = design.getcsikeybyid.call(this, this.state.activecsiid)
                        console.log(csicode)
                        myuser.csicodes[i].csi = csicode;

                        this.props.reduxUser({ myuser })
                        this.setState({ csi_2: csicode.substring(2, 4) })

                    } else {

                    }


                }


            } else {
                this.setState({ csi_2 })
            }

        }

    }
    handlecsi_3(csi_3) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        this.setState({ csi_3 })

        const getCSI_3 = (csi) => {

            const csi_3a = csi.substring(0, 4);
            const csi_3b = csi.substring(6, 9)
            return `${csi_3a}${csi_3}${csi_3b}`

        }

        if (myuser) {

            if (this.state.activecsiid) {
                if (csi_3.length > 1) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi) {
                        const csicode = getCSI_3(csi.csi);

                        const i = design.getcsikeybyid.call(this, this.state.activecsiid)

                        myuser.csicodes[i].csi = csicode;

                        this.props.reduxUser({ myuser })
                        this.setState({ csi_3: csicode.substring(4, 6) })

                    } else {

                    }


                }


            } else {
                this.setState({ csi_3 })
            }

        }

    }

    handlecsi_4(csi_4) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        this.setState({ csi_4 })

        const getCSI_4 = (csi) => {

            let csi_4a = "";
            if (csi.length === 6) {
                csi_4a += csi.substring(0, 6);
                csi_4a += '.'

            } else {
                csi_4a += csi.substring(0, 7);
            }

            return `${csi_4a}${csi_4}`

        }

        if (myuser) {

            if (this.state.activecsiid) {
                if (csi_4.length > 1) {
                    const csi = design.getcsibyid.call(this, this.state.activecsiid);
                    if (csi) {
                        const csicode = getCSI_4(csi.csi);

                        const i = design.getcsikeybyid.call(this, this.state.activecsiid)

                        myuser.csicodes[i].csi = csicode;

                        this.props.reduxUser({ myuser })
                        this.setState({ csi_4: csicode.substring(7, 9) })

                    } else {

                    }


                }


            } else {
                this.setState({ csi_4 })
            }

        }

    }
    removecsi(csi) {
        console.log(csi)
    }

    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        const csi = new CSI();
        const showcodes = () => {
            if (this.state.width > 800) {

                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>CSI</span>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.getcsi_1()}
                                onChange={event => { this.handlecsi_1(event.target.value) }}
                            />

                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.getcsi_2()}
                                onChange={event => { this.handlecsi_2(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_3}
                                onChange={event => { this.handlecsi_3(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_4}
                                onChange={event => { this.handlecsi_4(event.target.value) }}
                            />
                        </div>
                    </div>
                )


            } else {

                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>
                                CSI
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.getcsi_1()}
                                        onChange={event => { this.handlecsi_1(event.target.value) }}
                                    />

                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.getcsi_2()}
                                        onChange={event => { this.handlecsi_2(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.getcsi_3()}
                                        onChange={event => { this.handlecsi_3(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1 }}>

                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.getcsi_4()}
                                        onChange={event => { this.handlecsi_4(event.target.value) }}
                                    />
                                </div>
                            </div>

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
                            <span style={{ ...headerFont }}>CSIS - Create A CSI</span>

                        </div>
                    </div>

                    {showcodes()}

                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Title</span>
                            </div>

                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.addMargin, ...styles.showBorder, ...styles.bottomMargin15 }}
                                onChange={event => { this.handletitle(event.target.value) }}
                                value={this.gettitle()}
                            />

                        </div>
                    </div>

                    {csi.showCSI.call(this)}


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <span style={{ ...regularFont }}>{this.state.message}</span>

                        </div>
                    </div>

                

                </div>
            </div>
        )
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

export default connect(mapStateToProps, actions)(CSIS);

