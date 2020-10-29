import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import { AllCompanys } from './actions/api'
import { Link } from 'react-router-dom'
import {
    inputUTCStringForLaborID,
    calculatetotalhours,
    formatDateStringDisplay,
    getMonthfromTimein,
    getDayfromTimein,
    getYearfromTimein,
    getHoursfromTimein,
    getMinutesfromTimein,
    getAMPMfromTimeIn,
    makeTimeString,
    UTCTimeStringfromTime,
    CreateLabor,
    CreateEquipment,
    CreateMaterial,
    isNumeric
} from './functions'
import Design from './design'
import CompanyID from './companyid'
import TimeIn from './timein';
import TimeOut from './timeout'
import MaterialDate from './materialdate'
import { removeIconSmall } from './svg'
import MilestoneID from './milestoneid';
import CSI from './csi'
import MakeID from './makeid'

class CostEstimate extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, active: '', companyid: '', activelaborid: false, activeequipmentid: false, activematerialid: false, providerid: '', timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', csi_1: '', csi_2: '', csi_3: '', csi_4: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', milestoneid: '', csiid: '', laborrate: 0, equipmentrate: 0, mymaterialid: '', myequipmentid: '', materialdateday: '', materialdatemonth: '', materialdateyear: '', quantity: '', unit: '', unitcost: '', calendertimein: true, calendertimeout: true, materialcalender: true }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ title: this.props.match.params.title })
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    materialdatedefault() {
        const materialdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const materialdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const materialdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ materialdateyear: materialdateyear(), materialdatemonth: materialdatemonth(), materialdateday: materialdateday() })
    }

    getcompanyid() {
        const design = new Design();
        let companyid = this.state.companyid;
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        if (project) {
            const projectid = project.projectid;
            if (this.state.active === 'labor') {
                if (this.state.activelaborid) {
                    companyid = design.getcompanyidfromlaborid.call(this, projectid, this.state.activelaborid)
                }

            } else if (this.state.active === 'equipment') {
                if (this.state.activeequipmentid) {
                    const myequipment = design.getequipmentbyid.call(this,project.projectid,this.state.activeequipmentid)
                    if(myequipment) {
                    companyid = design.getcompanyidfromequipmentid.call(this, myequipment.myequipmentid);
                    }
                }


            } else if (this.state.active === 'materials') {
                if (this.state.activematerialid) {
                    companyid = design.getcompanyidfrommaterialid.call(this, projectid, this.state.activematerialid)

                }

            }

        }

        return companyid;
    }
    timeoutdefault() {
        const timeoutmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeoutday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeoutyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeouthours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeoutminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeoutampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeoutmonth: timeoutmonth(), timeoutday: timeoutday(), timeoutyear: timeoutyear(), timeouthours: timeouthours(), timeoutminutes: timeoutminutes(), timeoutampm: timeoutampm() })
    }
    timeindefault() {
        const timeinmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeinday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeinyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeinhours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeinminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeinampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeinmonth: timeinmonth(), timeinday: timeinday(), timeinyear: timeinyear(), timeinhours: timeinhours(), timeinminutes: timeinminutes(), timeinampm: timeinampm() })
    }

    getmilestoneid() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let milestoneid = this.state.milestoneid;
        if (project) {
            const projectid = project.projectid;
            if (this.state.active === 'labor') {
                if (this.state.activelaborid) {
                    const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                    milestoneid = mylabor.milestoneid;
                }

            } else if (this.state.active === 'equipment') {
                if (this.state.activeequipmentid) {
                    const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                    milestoneid = myequipment.milestoneid;
                }

            } else if (this.state.active === 'materials') {

                if (this.state.activematerialid) {
                    const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                    milestoneid = mymaterial.milestoneid;
                }

            }

        }
        return milestoneid;

    }

    handlecsiid(csiid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const csi = design.getcsibyid.call(this, csiid);
            if (csi) {

                const csi_1 = csi.csi.substring(0, 2)
                const csi_2 = csi.csi.substring(2, 4);
                const csi_3 = csi.csi.substring(4, 6);
                let csi_4 = "";
                if (csi.csi.length > 6) {
                    csi_4 = csi.csi.substring(7, 9);
                }
                this.setState({ csi_4, csi_3, csi_2, csi_1 })
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    const projectid = project.projectid;
                    const i = design.getprojectbykeyid.call(this, projectid)
                    if (this.state.active === 'labor') {

                        if (this.state.activelaborid) {
                            const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                            if (mylabor) {
                                const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                myuser.company.projects[i].costestimate.labor[j].csiid = csiid;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }

                        }

                    } else if (this.state.active === 'materials') {

                        if (this.state.activematerialid) {
                            const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {
                                const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid);
                                myuser.company.projects[i].costestimate.materials[j].csiid = csiid;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }
                        }

                    } else if (this.state.active === 'equipment') {

                        if (this.state.activeequipmentid) {
                            const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                            if (myequipment) {
                                const j = design.getequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                                myuser.company.projects[i].costestimate.equipment[j].csiid = csiid;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }
                        }

                    }

                }

            }

        }

    }

    handlemilestoneid(milestoneid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (this.state.active === 'labor') {

                    if (this.state.activelaborid) {
                        const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                        if (mylabor) {
                            const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                            myuser.company.projects[i].costestimate.labor[j].milestoneid = milestoneid;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }

                    }

                } else if (this.state.active === 'materials') {

                    if (this.state.activematerialid) {
                        const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                        if (mymaterial) {
                            const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects[i].costestimate.materials[j].milestoneid = milestoneid;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                        if (myequipment) {
                            const j = design.getequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                            myuser.company.projects[i].costestimate.equipment[j].milestoneid = milestoneid;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }

                }

            }

        }

    }
    async loadcompanys() {
        const design = new Design();
        const myuser =design.getuser.call(this)
        if(myuser) {
            
        try {

            let allcompanys = await AllCompanys(myuser.providerid);
            console.log(allcompanys)
            this.props.reduxAllCompanys(allcompanys)

        } catch (err) {
            alert(err)
        }

    }
    }




    getequipmentid() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let equipmentid = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activeequipmentid) {
                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                if (myequipment) {
                    equipmentid = myequipment.myequipmentid;
                }
            } else {
                equipmentid = this.state.myequipmentid;
            }

        }
        return equipmentid;
    }


    removelaborid(labor) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const mylabor = design.getlaborbyid.call(this, projectid, labor.laborid);
                if (mylabor) {
                    const j = design.getlaborkeybyid.call(this, projectid, mylabor.laborid);
                    myuser.company.projects[i].costestimate.labor.splice(j, 1);
                    this.props.reduxUser({ myuser })
                    this.setState({ render: 'render' })
                }
            }
        }

    }
    getemployeeid() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid) {
                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {

                    return mylabor.providerid;
                }
            } else {
                return this.state.providerid;
            }

        }
    }

    makematerialactive(materialid) {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (project) {

            if (this.state.activematerialid === materialid) {
                this.materialdatedefault();
                this.setState({ activematerialid: false, csi_1: '', csi_2: '', csi_3: '', csi_4: '',companyid:false  })

            } else {
                const projectid = project.projectid;
                const mymaterial = design.getmaterialbyid.call(this, projectid, materialid)
                if (mymaterial) {
                    const materialdateyear = mymaterial.timein.substring(0, 4)
                    const materialdatemonth = mymaterial.timein.substring(5, 7);
                    const materialdateday = mymaterial.timein.substring(8, 10);
                    const companyid = design.getcompanyidfrommaterialid.call(this, projectid, materialid)
                    const csi = design.getcsibyid.call(this, mymaterial.csiid);
                    const csi_1 = csi.csi.substring(0, 2)
                    const csi_2 = csi.csi.substring(2, 4);
                    const csi_3 = csi.csi.substring(4, 6);
                    let csi_4 = "";
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }

                    this.setState({ materialdatemonth, materialdateday, materialdateyear, activematerialid: materialid, companyid, csi_1, csi_2, csi_3, csi_4 })

                }

            }

        }

    }

    makeequipmentactive(equipmentid) {
      

        const design = new Design();
        const project = design.getproject.call(this)
        if (project) {

            if (this.state.activeequipmentid === equipmentid) {
                this.timeindefault()
                this.timeoutdefault();
                this.setState({ activeequipmentid: false, csi_1: '', csi_2: '', csi_3: '', csi_4: '' })
            } else {
                const projectid = project.projectid;
                const myequipment = design.getequipmentbyid.call(this, projectid, equipmentid)
                
                if (myequipment) {

                    const timeinmonth = getMonthfromTimein(myequipment.timein);
                    const timeinday = getDayfromTimein(myequipment.timein);
                    const timeinyear = getYearfromTimein(myequipment.timein)
                    const timeinhours = getHoursfromTimein(myequipment.timein)
                    const timeinminutes = getMinutesfromTimein(myequipment.timein)
                    const timeinampm = getAMPMfromTimeIn(myequipment.timein)

                    const timeoutmonth = getMonthfromTimein(myequipment.timeout);
                    const timeoutday = getDayfromTimein(myequipment.timeout);
                    const timeoutyear = getYearfromTimein(myequipment.timeout)
                    const timeouthours = getHoursfromTimein(myequipment.timeout)
                    const timeoutminutes = getMinutesfromTimein(myequipment.timeout)
                    const timeoutampm = getAMPMfromTimeIn(myequipment.timeout);
                    const companyid = design.getcompanyidfromequipmentid.call(this, myequipment.myequipmentid)
                    console.log(companyid);
                    const csi = design.getcsibyid.call(this, myequipment.csiid);
                    const csi_1 = csi.csi.substring(0, 2)
                    const csi_2 = csi.csi.substring(2, 4);
                    const csi_3 = csi.csi.substring(4, 6);
                    let csi_4 = "";
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }
                    this.setState({ activeequipmentid: equipmentid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, companyid, csi_1, csi_2, csi_3, csi_4 })

                }
            }

        }
    }

    makelaboractive(laborid) {

        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (project) {

            if (this.state.activelaborid === laborid) {
                this.timeindefault()
                this.timeoutdefault();
                this.setState({ activelaborid: false, csi_1: '', csi_2: '', csi_3: '', csi_4: '',companyid:false })
            } else {
                const projectid = project.projectid;
                const mylabor = design.getlaborbyid.call(this, projectid, laborid)

                if (mylabor) {

                    const timeinmonth = getMonthfromTimein(mylabor.timein);
                    const timeinday = getDayfromTimein(mylabor.timein);
                    const timeinyear = getYearfromTimein(mylabor.timein)
                    const timeinhours = getHoursfromTimein(mylabor.timein)
                    const timeinminutes = getMinutesfromTimein(mylabor.timein)
                    const timeinampm = getAMPMfromTimeIn(mylabor.timein)

                    const timeoutmonth = getMonthfromTimein(mylabor.timeout);
                    const timeoutday = getDayfromTimein(mylabor.timeout);
                    const timeoutyear = getYearfromTimein(mylabor.timeout)
                    const timeouthours = getHoursfromTimein(mylabor.timeout)
                    const timeoutminutes = getMinutesfromTimein(mylabor.timeout)
                    const timeoutampm = getAMPMfromTimeIn(mylabor.timeout);
                    const companyid = design.getcompanyidfromlaborid.call(this, projectid, laborid)
                    const csi = design.getcsibyid.call(this, mylabor.csiid);
                    const csi_1 = csi.csi.substring(0, 2)
                    const csi_2 = csi.csi.substring(2, 4);
                    const csi_3 = csi.csi.substring(4, 6);
                    let csi_4 = "";
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }


                    this.setState({ activelaborid: laborid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, companyid, csi_1, csi_2, csi_3, csi_4 })

                }
            }

        }
    }

    showlaborid(labor) {
        const design = new Design();
        const styles = MyStylesheet();
        const removeIcon = design.getremoveicon.call(this)
        const regularFont = design.getRegularFont.call(this);
        const csi = design.getcsibyid.call(this, labor.csiid);
        let employee = design.getemployeebyid.call(this, labor.providerid)
        let hourlyrate = labor.laborrate;
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (project) {
            const projectid = project.projectid;
            const milestone = design.getmilestonebyid.call(this, projectid, labor.milestoneid)


            const getbutton = () => {
                if (this.state.activelaborid === labor.laborid) {
                    return (styles.activeButton);
                } else {
                    return (styles.generalButton);
                }
            }
            
            const getactivelaborbackground = (laborid) => {
                if (this.state.activelaborid === laborid) {
                    return styles.activeBackground;
                }

            }

            if (this.state.active === 'labor') {

                return (
                    <div key={labor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                        <span style={{ ...getactivelaborbackground(labor.laborid) }} onClick={() => { this.makelaboractive(labor.laborid) }}>
                            {employee.firstname} {employee.lastname}: {labor.description} Milestone {milestone.milestone} CSI:{csi.csi}-{csi.title}<br />
                From {inputUTCStringForLaborID(labor.timein)} to {inputUTCStringForLaborID(labor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(labor.timeout, labor.timein)} Hrs = ${(Number(calculatetotalhours(labor.timeout, labor.timein)) * hourlyrate).toFixed(2)}
                        </span>
                        <button style={{ ...getbutton(), ...removeIcon }} onClick={() => { this.removelaborid(labor) }}>{removeIconSmall()} </button>
                    </div>)

            }

        }

    }
    showlaborids() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let laborids = [];
        if (project) {
            const projectid = project.projectid;
            const labors = design.getlaborbyprojectid.call(this, projectid)
            if (labors) {
                // eslint-disable-next-line
                labors.map(labor => {
                    laborids.push(this.showlaborid(labor))


                })
            }

        }
        return laborids;

    }

    removematerial(mymaterial) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const material = design.getmaterialbyid.call(this, projectid, mymaterial.materialid)
                if (material) {
                    const j = design.getmaterialkeybyid.call(this, projectid, material.materialid)
                    myuser.company.projects[i].costestimate.materials.splice(j, 1)
                    this.props.reduxUser({ myuser })
                    this.setState({ render: 'render' })
                }

            }

        }
    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const removeIcon = design.getremoveicon.call(this)
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        const csi = design.getcsibyid.call(this, mymaterial.csiid);
        const material = design.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        const getbutton = () => {
            if (this.state.activematerialid === mymaterial.materialid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }


        }
        const activebackground = (materialid) => {
            if (this.state.activematerialid === materialid) {
                return (styles.activeBackground)
            }

        }
        if (this.state.active === 'materials') {
            if (project) {
                const projectid = project.projectid;
                const milestone = design.getmilestonebyid.call(this, projectid, mymaterial.milestoneid)

                return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground(mymaterial.materialid) }} key={mymaterial.materialid}>
                    <span onClick={() => { this.makematerialactive(mymaterial.materialid) }} key={mymaterial.materialid}>{formatDateStringDisplay(mymaterial.timein)} <br />
                        {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
                        {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
                    </span>
                    <button style={{ ...getbutton(), ...removeIcon }} onClick={() => { this.removematerial(mymaterial) }}>{removeIconSmall()} </button>
                </div>)

            }
        }

    }

    showmaterialids() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let materialids = [];
        if (project) {
            const projectid = project.projectid;
            const materials = design.getmaterialsbyprojectid.call(this, projectid)
            if (materials) {
                // eslint-disable-next-line
                materials.map(material => {
                    materialids.push(this.showmaterialid(material))
                })
            }

        }
        return materialids;

    }
    removeequipment(equipment) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const myequipment = design.getequipmentkeybyid.call(this, projectid, equipment.equipmentid);
                if (myequipment) {
                    const j = design.getequipmentkeybyid.call(this, projectid, equipment.equipmentid);
                    myuser.company.projects[i].costestimate.equipment.splice(j, 1)
                    this.props.reduxUser({ myuser })
                    this.setState({ render: 'render' })
                }


            }

        }


    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        const csi = design.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const removeIcon = design.getremoveicon.call(this)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        const getbutton = () => {
            if (this.state.activeequipmentid === equipment.equipmentid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }
        }
        
        const activeequipment = (equipmentid) => {
            if (this.state.activeequipmentid === equipmentid) {
                return (styles.activeBackground)
            }

        }
        if (project) {
            const projectid = project.projectid;
            const milestone = design.getmilestonebyid.call(this, projectid, equipment.milestoneid)
            const myequipment = design.getmyequipmentfromid.call(this, equipment.myequipmentid);

            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
                <span style={{ ...activeequipment(equipment.equipmentid) }} onClick={() => { this.makeequipmentactive(equipment.equipmentid) }}>{myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} <br />
                Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}
                </span>
                <button style={{ ...getbutton(), ...removeIcon }}
                    onClick={() => { this.removeequipment(equipment) }}>{removeIconSmall()} </button>
            </div>
            )

        }
    }

    showequipmentids() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let equipmentids = [];
        if (this.state.active === 'equipment') {
            if (project) {
                const projectid = project.projectid;
                const equipments = design.getequipmentbyprojectid.call(this, projectid)

                if (equipments) {
                    // eslint-disable-next-line
                    equipments.map(equipment => {
                        equipmentids.push(this.showequipmentid(equipment))
                    })
                }

            }


        }
        return equipmentids;

    }

    handlemyequipmentid(companyid, myequipmentid) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const makeid = new MakeID();
                
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (this.state.activeequipmentid) {
                    const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = design.getequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                        const equipmentrate = +Number(design.getequipmentratebyid.call(this,companyid,myequipmentid)).toFixed(4)
                       if(equipmentrate) {
                        myuser.company.projects[i].costestimate.equipment[j].equipmentrate = equipmentrate;

                       }
                        myuser.company.projects[i].costestimate.equipment[j].myequipmentid = myequipmentid;
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }

                } else {
                    const equipmentid = makeid.equipmentid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const equipmentrate = +Number(design.getequipmentratebyid.call(this,companyid,myequipmentid)).toFixed(4)
                    const engineerid = myuser.providerid;
                    const profit = 0;

                    const newEquipment = CreateEquipment(equipmentid, engineerid, myequipmentid, milestoneid, csiid, timein, timeout, equipmentrate, profit)

                    const equipments = design.getequipmentbyprojectid.call(this, projectid)
                    if (equipments) {
                        myuser.company.projects[i].costestimate.equipment.push(newEquipment)
                    } else {
                        myuser.company.projects[i].costestimate.equipment = [newEquipment]
                    }
                    this.props.reduxUser({ myuser })
                    this.setState({ activeequipmentid: equipmentid })


                }
            }
        }
    }

    handleemployeeid(providerid) {
        const design = new Design();
        const makeid = new MakeID();
        const myuser = design.getuser.call(this);
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (this.state.activelaborid) {
                    const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                        const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                        const laborrate = +Number(design.gethourlyrate.call(this, providerid)).toFixed(4)
                        if(laborrate) {
                        myuser.company.projects[i].costestimate.labor[j].laborrate = laborrate;
                        }
                        myuser.company.projects[i].costestimate.labor[j].providerid = providerid;
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }
                } else {
                    const laborid = makeid.laborid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const laborrate = +Number(design.gethourlyrate.call(this, providerid)).toFixed(4)
                    const profit = 0;
                    const engineerid = myuser.providerid;

                    const newLabor = CreateLabor(laborid, engineerid, providerid, milestoneid, csiid, timein, timeout, laborrate, profit)

                    const labors = design.getlaborbyprojectid.call(this, projectid)
                    if (labors) {
                        myuser.company.projects[i].costestimate.labor.push(newLabor)
                    } else {
                        myuser.company.projects[i].costestimate.labor = [newLabor]
                    }
                    this.props.reduxUser({ myuser })
                    this.setState({ activelaborid: laborid })
                }
            }
        }
    }

    getequipmentrate() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let equipmentrate = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activeequipmentid) {
                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                if (myequipment) {
                    equipmentrate = myequipment.equipmentrate;
                }
            } else {
                equipmentrate = this.state.equipmentrate;
            }

        }


        return equipmentrate;
    }




    getlaborrate() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let laborrate = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid) {
                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                if (mylabor) {
                    laborrate = mylabor.laborrate;
                }
            } else {
                laborrate = this.state.laborrate;
            }
        }
        return laborrate;
    }

    handleequipmentrate(equipmentrate) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (isNumeric(equipmentrate)) {
            if (myuser) {
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    const projectid = project.projectid;
                    const i = design.getprojectbykeyid.call(this, projectid)
                    if (this.state.activeequipmentid) {
                        const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                        if (myequipment) {
                            const j = design.getequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                            myuser.company.projects[i].costestimate.equipment[j].equipmentrate = equipmentrate;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }

                    }
                }
            }
        } else {
            alert(`Equipment rate ${equipmentrate} must be numeric `)
        }
    }

    handlelaborrate(laborrate) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (isNumeric(laborrate)) {
            if (myuser) {
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    const projectid = project.projectid;
                    const i = design.getprojectbykeyid.call(this, projectid)
                    if (this.state.activelaborid) {
                        const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid)
                        if (mylabor) {
                            const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                            myuser.company.projects[i].costestimate.labor[j].laborrate = laborrate;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }

                    }
                }
            }

        } else {
            alert(`Labor Rate ${laborrate} must be numeric`)
        }
    }
    getquantity() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let quantity = this.state.quantity;
        if (project) {
            const projectid = project.projectid;
            if (this.state.activematerialid) {
                const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                quantity = mymaterial.quantity;

            }

        }
        return quantity;

    }
    getunit() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let unit = this.state.unit;
        if (project) {
            const projectid = project.projectid;
            if (this.state.activematerialid) {
                const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                unit = mymaterial.unit;

            }

        }
        return unit;

    }
    getunitcost() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let unitcost = this.state.unitcost;
        if (project) {
            const projectid = project.projectid;
            if (this.state.activematerialid) {
                const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                unitcost = mymaterial.unitcost;

            }

        }
        return unitcost;

    }
    handlequantity(quantity) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (isNumeric(quantity)) {
            if (myuser) {
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    const projectid = project.projectid;
                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid)
                        if (mymaterial) {
                            const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects[i].costestimate.materials[j].quantity = quantity;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }
                }
            }

        } else {
            alert(`Quantity ${quantity} must be numeric`)
        }

    }
    handleunit(unit) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid);
                if (this.state.activematerialid) {
                    const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid)
                    if (mymaterial) {
                        const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid);
                        myuser.company.projects[i].costestimate.materials[j].unit = unit;
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }
                }
            }
        }

    }
    handleunitcost(unitcost) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (isNumeric(unitcost)) {
            if (myuser) {
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    const projectid = project.projectid;
                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid)
                        if (mymaterial) {
                            const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects[i].costestimate.materials[j].unitcost = unitcost;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }
                }
            }

        } else {
            alert(`Unit cost ${unitcost} must be numeric`)
        }

    }

    handlemymaterialid(mymaterialid) {

        const design = new Design();
        const myuser = design.getuser.call(this);
        const makeid = new MakeID();
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (this.state.activematerialid) {
                    const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                    if (mymaterial) {
                        const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid)
                        myuser.company.projects[i].costestimate.materials[j].mymaterialid = mymaterialid;
                        const mymaterial = design.getmymaterialfromid.call(this, mymaterialid)
                        if(mymaterial) {
                            myuser.company.projects[i].costestimate.materials[j].unit = mymaterial.unit;
                            myuser.company.projects[i].costestimate.materials[j].unitcost = mymaterial.unitcost;

                        }
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }

                } else {
                    const materialid = makeid.materialid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const mymaterial = design.getmymaterialfromid.call(this, mymaterialid)
                    const csiid = this.state.csiid;
                    const year = this.state.materialdateyear;
                    const day = this.state.materialdateday;
                    const month = this.state.materialdatemonth;
                    const timein = `${year}-${month}-${day}`;
                    const quantity = this.state.quantity;
                    const unitcost = mymaterial.unitcost;
                    const unit = mymaterial.unit;
                    const profit = 0;
                    const engineerid = myuser.providerid;
                    const newMaterial = CreateMaterial(materialid, engineerid, mymaterialid, milestoneid, csiid, timein, quantity, unit, unitcost, profit);
                    const materials = design.getmaterialsbyprojectid.call(this, projectid);
                    if (materials) {
                        myuser.company.projects[i].costestimate.materials.push(newMaterial)

                    } else {
                        myuser.company.projects[i].materials = [newMaterial]
                    }

                    this.props.reduxUser({ myuser })
                    this.setState({ activematerialid: materialid })

                }
            }
        }

    }

    getmymaterialid() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let materialid = this.state.mymaterialid;
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;

                if (this.state.activematerialid) {
                    const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid)
                    if (mymaterial) {
                        materialid = mymaterial.mymaterialid;
                    }
                }

            }

        }
        return materialid;

    }


    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this);
        const buttonheight = design.getbuttonheight.call(this)
        const companyid = new CompanyID();
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const milestoneid = new MilestoneID();
        const regularFont = design.getRegularFont.call(this)
        const csi = new CSI();
        const materialdate = new MaterialDate();

        const equipmentrate = () => {
            if (this.state.active === 'equipment') {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Equipment Rate</span>
                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                value={this.getequipmentrate()}
                                onChange={event => { this.handleequipmentrate(event.target.value) }}

                            />
                        </div>

                    </div>
                )
            }
        }
        const laborrate = () => {
            if (this.state.active === 'labor') {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Labor Rate</span>
                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                value={this.getlaborrate()}
                                onChange={event => { this.handlelaborrate(event.target.value) }}

                            />
                        </div>

                    </div>
                )
            }
        }
        const laborbackground = () => {
            if (this.state.active === 'labor') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }
        const equipmentbackground = () => {
            if (this.state.active === 'equipment') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const materialbackground = () => {
            if (this.state.active === 'materials') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const showmaterialquantity = () => {
            if (this.state.active === 'materials') {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getquantity()}
                                    onChange={event => { this.handlequantity(event.target.value) }}
                                />
                            </div>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getunit()}
                                    onChange={event => { this.handleunit(event.target.value) }}
                                />
                            </div>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Unit Cost</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getunitcost()}
                                    onChange={event => { this.handleunitcost(event.target.value) }}
                                />
                            </div>

                        </div>

                    </div>
                )

            }
        }

        const showtimein = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timein.showtimein.call(this))
            }
        }
        const showtimeout = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timeout.showtimeout.call(this))
            }
        }
        const showmaterialdate = () => {
            if (this.state.active === 'materials') {
                return (materialdate.showmaterialdate.call(this))
            }
        }
        const showtimes = () => {
            if (this.state.width > 1200) {


                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {showtimein()}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {showtimeout()}
                    </div>
                </div>)



            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {showtimein()}
                        {showtimeout()}
                    </div>
                </div>)

            }
        }

        const milestonescsi = () => {

            if (this.state.width > 800) {


                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this)}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {csi.showCSI.call(this)}
                    </div>
                </div>)



            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this)}
                        {csi.showCSI.call(this)}
                    </div>
                </div>)

            }



        }
        const companys = design.getallcompanys.call(this)
        if(!companys) {
            this.loadcompanys();
        }

       
       
      

        const myuser = design.getuser.call(this)
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                const csis = design.getallcsicodes.call(this);

                if(!csis) {
                    design.loadcsis.call(this,myuser.company.companyid)
                }


                const project = design.getproject.call(this)
                if(project) {
        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                           
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{myuser.profile} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{myuser.company.url} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{project.title} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/costestimate </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.width75, ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...laborbackground() }} onClick={() => { this.setState({ active: 'labor' }) }}><span style={{ ...styles.specialButton }}>LABOR</span></button>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.width75, ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...equipmentbackground() }} onClick={() => { this.setState({ active: 'equipment' }) }}><span style={{ ...styles.specialButton }}>Equipment</span></button>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.width75, ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...materialbackground() }} onClick={() => { this.setState({ active: 'materials' }) }}><span style={{ ...styles.specialButton }}>Materials</span></button>
                        </div>
                    </div>

                    {companyid.showcompanyid.call(this)}



                    {milestonescsi()}
                    {showmaterialdate()}

                    {showtimes()}

                    {laborrate()}
                    {equipmentrate()}
                    {showmaterialquantity()}

                    {design.showsaveestimate.call(this)}

                    {this.showlaborids()}
                    {this.showmaterialids()}
                    {this.showequipmentids()}


                    <div style={{...styles.generalContainer, ...styles.alignCenter}}>
                       
                        <Link style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.generalLink }} to={`/${myuser.profile}/projects/${project.title}/bidschedule`}>/bidschedule</Link>
                     
                    </div>






                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Could not be found</span>
                </div>

            </div>)
        }

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Create or Join a Company to View Cost Estimate</span>
                </div>

            </div>)

        }

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Cost Estimate</span>
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
        project: state.project,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(CostEstimate);
