import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import Design from './design'
import { connect } from 'react-redux';
import * as actions from './actions';
import { inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay, DirectCostForMaterials, DirectCostForEquipment, DirectCostForLabor } from './functions'

class LineItem extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxProject({ title: this.props.match.params.title })
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        let employee = design.getemployeebyid.call(this, mylabor.providerid)

        let hourlyrate = mylabor.laborrate;

        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            {employee.firstname} {employee.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}

        </div>)
    }
    getlaboritems() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let items = [];
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        items.push(this.showlaborid(labor))

                    })
                }
            }
        }
        return items;

    }
    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const material = design.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }} key={mymaterial.materialid}>
            {material.material}        {formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
        </div>)
    }
    getmaterialitems() {

        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let items = [];
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        items.push(this.showmaterialid(material))
                    })
                }

            }

        }
        return items;

    }
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const myequipment = design.getmyequipmentfromid.call(this, equipment.myequipmentid);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
            {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}

        </div>)
    }

    getequipmentitems() {

        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let items = [];
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        items.push(this.showequipmentid(equipment))
                    })
                }


            }

        }
        return items;

    }

    getlabortotal() {

        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let cost = 0;
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        cost += DirectCostForLabor(labor)

                    })
                }
            }

        }
        return cost;

    }
    getmaterialtotal() {

        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let cost = 0;
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        cost += DirectCostForMaterials(material)


                    })
                }
            }

        }
        return cost;

    }

    getequipmenttotal() {
        const design = new Design();
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let cost = 0;
        if (project) {
            if (project.hasOwnProperty("costestimate")) {
                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        cost += DirectCostForEquipment(equipment)



                    })

                }
            }
        }
        return cost;

    }
    getitemtotal() {
        let labortotal = this.getlabortotal();
        let materialtotal = this.getmaterialtotal();
        let equipmenttotal = this.getequipmenttotal();
        let total = labortotal + materialtotal + equipmenttotal;
        return total;
    }
    showlinedetail() {
        const design = new Design();
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this);
        const totallabor = `$${Number(this.getlabortotal()).toFixed(2)}`
        const totalmaterials = `$${Number(this.getmaterialtotal()).toFixed(2)}`
        const totalequipment = `$${Number(this.getequipmenttotal()).toFixed(2)}`
        const totalamount = `$${Number(this.getitemtotal()).toFixed(2)}`

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Labor
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getlaboritems()}
                            </div>


                        </div>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Materials
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getmaterialitems()}
                            </div>

                        </div>
                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Equipment
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getequipmentitems()}
                            </div>


                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder }}>

                            <div style={{ ...styles.generalContainer }}>
                                Total Labor {totallabor}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Materials {totalmaterials}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Equipment {totalequipment}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total {totalamount}
                            </div>




                        </div>
                    </div>


                </div>
            </div>)

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Labor
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getlaboritems()}
                            </div>

                        </div>

                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Materials
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getmaterialitems()}
                            </div>


                        </div>
                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Equipment
                                </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getequipmentitems()}
                            </div>

                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <div style={{ ...styles.generalContainer }}>
                                Total Labor {totallabor}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Materials {totalmaterials}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Equipment {totalequipment}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total {totalamount}
                            </div>
                        </div>


                    </div>
                </div>
            )


        }


    }


    render() {
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const csi = design.getcsibyid.call(this, this.props.match.params.csiid)
        const myuser = design.getuser.call(this)

        const regularFont = design.getRegularFont.call(this)
        const csis = design.getallcsicodes.call(this);

       

        if (myuser) {

            if(myuser.hasOwnProperty("company")) {

                if (!csis) {
                    design.loadcsis.call(this, myuser.company.companyid)
                }
        
            const project = design.getproject.call(this)
            if (project) {

                
                return (
                    <div style={{ ...styles.generalFont }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{myuser.profile} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{myuser.company.url} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{project.title} </span><br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/bidschedule </span><br/>
                                    <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>{csi.csi}-{csi.title} </span>
                                </div>
                            </div>

                            {this.showlinedetail()}


                        </div>
                    </div>
                )

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
                    <span style={{ ...styles.generalFont, ...regularFont }}>Please Create A Company to View Line Item</span>
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
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(LineItem);