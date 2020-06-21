
import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeOut from './calendertimeout';
class TimeOut {
    handleminutes(minutes) {
        this.setState({ timeoutminutes: minutes })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (minutes.length === 2) {

                    if (validateMinutes(minutes)) {


                        if (this.state.active === 'labor') {


                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }



                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {

                                    if (myequipment) {
                                        const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                        let day = this.state.timeoutday;
                                        let year = this.state.timeoutyear;
                                        let month = this.state.timeoutmonth;
                                        let hours = this.state.timeouthours;
                                        let time = this.state.timeoutampm;
                                        let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                        timeout = UTCTimeStringfromTime(timeout);
                                        myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                                        this.props.reduxUser({ myuser })
                                        this.setState({ render: 'render' })
                                    }

                                }
                            }

                        }

                    } else {
                        alert(`Invalid minute format ${minutes}`)
                    }
                }
            }
        }

    }

    handlehours(hours) {
        this.setState({ timeouthours: hours })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (hours.length === 2) {
                    if (validateMonth(hours)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if (this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {

                                    const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })

                                }
                            }
                        }

                    } else {
                        alert(`Invalid hours ${hours}`)

                    }

                }

            }
        }
    }

    handleyear(year) {
        this.setState({ timeoutyear: year })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (year.length === 4) {

                    if (validateYear(year)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let minutes = this.state.timeoutminutes;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Year Format ${year}`)
                    }
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ timeoutday: day })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (day.length === 2) {

                    if (validateDate(day)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)

                                if (myequipment) {
                                    const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let minutes = this.state.timeoutminutes;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Date Format ${day}`)
                    }
                }

            }
        }
    }

    handlemonth(month) {
        this.setState({ timeoutmonth: month })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let minutes = this.state.timeoutminutes;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }

                            }

                        }

                    } else {
                        alert(`invalid month format ${month}`)
                    }

                }

            }
        }
    }

    toggleampm(ampm) {
        if (this.state.timeoutampm === 'am' && ampm === 'pm') {
            this.setState({ timeoutampm: 'pm' })
        } else if (this.state.timeoutampm === 'pm' && ampm === 'am') {
            this.setState({ timeoutampm: 'am' })
        }

        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);

                if (this.state.active === 'labor') {



                    if (this.state.activelaborid) {
                        const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                        if (mylabor) {

                            const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let time = ampm;
                            let minutes = this.state.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            console.log(timeout)
                            timeout = UTCTimeStringfromTime(timeout);
                            console.log(timeout)
                            myuser.company.projects[i].costestimate.labor[j].timeout = timeout;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = design.getequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                        if (myequipment) {
                            const j = design.getequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let minutes = this.state.timeoutminutes;
                            let time = ampm
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myuser.company.projects[i].costestimate.equipment[j].timeout = timeout;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }

                }

            }
        }

    }

    showampm() {
        const design = new Design();
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        const timeout = new TimeOut();
        const showam = () => {
            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...design.getampmicon.call(this) }} onClick={() => { timeout.toggleampm.call(this, 'pm') }}>AM</button>
            </div>)

        }
        const showpm = () => {

            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...design.getampmicon.call(this) }} onClick={() => { timeout.toggleampm.call(this, 'am') }}>PM</button>
            </div>)

        }




        if (this.state.timeoutampm === 'am') {
            return showam()
        } else if (this.state.timeoutampm === 'pm') {
            return showpm()
        }


    }

    showtimeout() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        const timeout = new TimeOut();
        const calender = new CalenderTimeOut();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Time In (MM-DD-YYYY HH mm) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.timeoutmonth}
                                onChange={event => { timeout.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutday}
                                onChange={event => { timeout.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutyear}
                                onChange={event => { timeout.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeouthours}
                                onChange={event => { timeout.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutminutes}
                                onChange={event => { timeout.handleminutes.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            {timeout.showampm.call(this)}
                        </div>
                    </div>

                    {calender.showCalenderTimeOut.call(this)}

                </div>
            </div>)
    }

}

export default TimeOut;