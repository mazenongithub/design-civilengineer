
import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design';
import MaterialCalender from './materialcalender'


class MaterialDate {


    handleyear(year) {
        this.setState({ materialdateyear: year })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (year.length === 4) {


                        if (this.state.activematerialid) {
                            const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {

                                const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.projects[i].costestimate.materials[j].timein = timein;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })


                            }

                        }

                  
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ materialdateday: day })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (day.length === 2) {

            


                        if (this.state.activematerialid) {
                            const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {

                                const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid)
                                let year = this.state.materialdateyear;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.projects[i].costestimate.materials[j].timein = timein;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })


                            }

                        }

                

                }

            }
        }
    }

    handlemonth(month) {
        this.setState({ materialdatemonth: month })
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {

                const projectid = project.projectid

                const i = design.getprojectbykeyid.call(this, projectid);
                if (month.length === 2) {

                    if (this.state.active === 'materials') {



                        if (this.state.activematerialid) {
                            const mymaterial = design.getmaterialbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {

                                const j = design.getmaterialkeybyid.call(this, projectid, this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let year = this.state.materialdateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.projects[i].costestimate.materials[j].timein = timein;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })


                            }

                        }

                    } else if (this.state.active === 'equipment') {

                    } else if (this.state.active === 'materials') {

                    }

                }

            }
        }
    }





    showmaterialdate() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        const materialdate = new MaterialDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Material Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.materialdatemonth}
                                onChange={event => { materialdate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.materialdateday}
                                onChange={event => { materialdate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.materialdateyear}
                                onChange={event => { materialdate.handleyear.call(this, event.target.value) }} />
                        </div>
                        
                       
                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default MaterialDate;