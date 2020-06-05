
import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design'
import { UTCTimeStringfromTime, makeTimeString } from './functions';

class TimeIn {
    handleminutes(minutes) {
        this.setState({ timeinminutes: minutes })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (minutes.length === 2) {


                    if (this.state.active === 'labor') {


                        if (this.state.activelaborid) {
                            const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                            if (mylabor) {

                                const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                let day = this.state.timeinday;
                                let year = this.state.timeinyear;
                                let month = this.state.timeinmonth;
                                let hours = this.state.timeinhours;
                                let time = this.state.timeinampm;
                                let timein = makeTimeString(year, month, day, hours, minutes, time);
                                timein = UTCTimeStringfromTime(timein);
                                myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })


                            }

                        }



                    } else if (this.state.active === 'equipment') {

                        if(this.state.activeequipmentid) {
                            const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                            if(myequipment) {

                                if(myequipment) {
                                    const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.equipment[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }

                            }
                        }

                    } 

                }
            }
        }

    }

        handlehours(hours) {
            this.setState({ timeinhours: hours })
            const design = new Design();
            const myuser = design.getuser.call(this)
            if (myuser) {

                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {

                    const projectid = project.projectid

                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (hours.length === 2) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if(this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                                if(myequipment) {
                                
                                    const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.equipment[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })

                                }
                            }
                        }
                    }

                }
            }
        }

        handleyear(year) {
            this.setState({ timeinyear: year })
            const design = new Design();
            const myuser = design.getuser.call(this)
            if (myuser) {

                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {

                    const projectid = project.projectid

                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (year.length === 4) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if(this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                                if(myequipment) {
                                    const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let minutes = this.state.timeinminutes;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.equipment[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }
                            }

                        } 

                    }

                }
            }
        }

        handleday(day) {
            this.setState({ timeinday: day })
            const design = new Design();
            const myuser = design.getuser.call(this)
            if (myuser) {

                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {

                    const projectid = project.projectid

                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (day.length === 2) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if(this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                           
                                if(myequipment) {
                                    const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                    let minutes = this.state.timeinminutes;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.equipment[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }
                            }

                        } 

                    }

                }
            }
        }

        handlemonth(month) {
            this.setState({ timeinmonth: month })
            const design = new Design();
            const myuser = design.getuser.call(this)
            if (myuser) {

                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {

                    const projectid = project.projectid

                    const i = design.getprojectbykeyid.call(this, projectid);
                    if (month.length === 2) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = design.getlaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = design.getlaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if(this.state.activeequipmentid) {
                                const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                                if(myequipment) {
                                    const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let minutes = this.state.timeinminutes;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects[i].costestimate.equipment[j].timein = timein;
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })
                                }
                            
                            }

                        }

                    }

                }
            }
        }

        toggleampm(ampm) {
            if (this.state.timeinampm === 'am' && ampm === 'pm') {
                this.setState({ timeinampm: 'pm' })
            } else if (this.state.timeinampm === 'pm' && ampm === 'am') {
                this.setState({ timeinampm: 'am' })
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
                                let day = this.state.timeinday;
                                let year = this.state.timeinyear;
                                let month = this.state.timeinmonth;
                                let hours = this.state.timeinhours;
                                let time = ampm;
                                let minutes = this.state.timeinminutes;
                                let timein = makeTimeString(year, month, day, hours, minutes, time);
                                console.log(timein)
                                timein = UTCTimeStringfromTime(timein);
                                console.log(timein)
                                myuser.company.projects[i].costestimate.labor[j].timein = timein;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })


                            }

                        }

                    } else if (this.state.active === 'equipment') {

                        if(this.state.activeequipmentid) {
                            const myequipment = design.getequipmentbyid.call(this,projectid,this.state.activeequipmentid)
                            if(myequipment) {
                                const j = design.getequipmentkeybyid.call(this,projectid,myequipment.equipmentid)
                                let day = this.state.timeinday;
                                let year = this.state.timeinyear;
                                let month = this.state.timeinmonth;
                                let hours = this.state.timeinhours;
                                let minutes = this.state.timeinminutes;
                                let time = ampm
                                let timein= makeTimeString(year, month, day, hours, minutes, time);
                                timein = UTCTimeStringfromTime(timein);
                                myuser.company.projects[i].costestimate.equipment[j].timein = timein;
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
            const timein = new TimeIn();
            const showam = () => {
                return (<div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...design.getampmicon.call(this) }} onClick={() => { timein.toggleampm.call(this, 'pm') }}>AM</button>
                </div>)

            }
            const showpm = () => {

                return (<div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...design.getampmicon.call(this) }} onClick={() => { timein.toggleampm.call(this, 'am') }}>PM</button>
                </div>)

            }




            if (this.state.timeinampm === 'am') {
                return showam()
            } else if (this.state.timeinampm === 'pm') {
                return showpm()
            }


        }

        showtimein() {
            const styles = MyStylesheet();
            const design = new Design();
            const headerFont = design.getHeaderFont.call(this)
            const regularFont = design.getRegularFont.call(this)
            const timein = new TimeIn();
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Time In (MM-DD-YYYY HH mm) </span>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>

                                <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.timeinmonth}
                                    onChange={event => { timein.handlemonth.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>

                                <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.timeinday}
                                    onChange={event => { timein.handleday.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex2, ...styles.addMargin }}>

                                <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.timeinyear}
                                    onChange={event => { timein.handleyear.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>

                                <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.timeinhours}
                                    onChange={event => { timein.handlehours.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>

                                <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.timeinminutes}
                                    onChange={event => { timein.handleminutes.call(this, event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                {timein.showampm.call(this)}
                            </div>
                        </div>

                    </div>
                </div>)
        }

    }

    export default TimeIn;