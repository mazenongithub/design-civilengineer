import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import Design from './design'
import { connect } from 'react-redux';
import * as actions from './actions';
import { DirectCostForLabor, DirectCostForMaterials, DirectCostForEquipment, ProfitForEquipment, ProfitForMaterial, ProfitForLabor, CreateBidItem, isNumeric} from './functions'
import {Link} from 'react-router-dom'

class BidSchedule extends Component {

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

    getprofit(csiid) {
        const design = new Design()
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        let directcost = 0;
        let profit = 0;
        if (project) {
            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        if (labor.csiid === csiid) {
                            directcost += DirectCostForLabor(labor);
                            profit += ProfitForLabor(labor)
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        if (material.csiid === csiid) {
                            directcost += DirectCostForMaterials(material);
                            profit += ProfitForMaterial(material)
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        if (equipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(equipment);
                            profit += ProfitForEquipment(equipment)
                        }

                    })

                }






            }

        }

        if (profit && directcost > 0) {
            return +Number((profit / directcost) * 100).toFixed(4)
        } else {
            return 0;
        }

    }

    getdirectcost(csiid) {
        const design = new Design();
        let project = design.getprojectbytitle.call(this, this.props.match.params.title);
        let directcost = 0;
        if (project) {

            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            directcost += DirectCostForLabor(mylabor)

                        }
                    })
                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            directcost += DirectCostForMaterials(mymaterial)
                        }

                    })
                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(myequipment)
                        }

                    })
                }

            }
        }

        return directcost;

    }
    getbiditems() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const validatecsis = (csis, csiid) => {
            let validate = true;
            // eslint-disable-next-line
            csis.map(csi => {
                if (csi.csiid === csiid) {
                    validate = false;
                }
            })
            return validate;

        }
        let csis = [];
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (project) {
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        project.costestimate.labor.map(labor => {
                            if (validatecsis(csis, labor.csiid)) {
                                csis.push({ csiid: labor.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        project.costestimate.materials.map(material => {
                            if (validatecsis(csis, material.csiid)) {
                                csis.push({ csiid: material.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        project.costestimate.equipment.map(equipment => {
                            if (validatecsis(csis, equipment.csiid)) {
                                csis.push({ csiid: equipment.csiid })
                            }
                        })

                    }


                }
            }
        }
        return csis;

    }
    getbidprice(csiid) {
        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }

    handleunit(csiid, unit) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (myuser) {
            const providerid = myuser.providerid;
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("bidschedule")) {

                        const biditem = design.getbiditembycsiid.call(this, projectid, csiid);
                        if (biditem) {
                            const j = design.getbiditemkeybycsiid.call(this, projectid, csiid);
                            myuser.company.projects[i].costestimate.bidschedule[j].unit = unit;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        } else {
                            let quantity = "";
                            let newBidItem = CreateBidItem(csiid, providerid, quantity, unit);
                            myuser.company.projects[i].costestimate.bidschedule.push(newBidItem)
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })

                        }

                    } else {

                        let quantity = "";
                        let newBidItem = CreateBidItem(csiid, providerid, quantity, unit);
                        myuser.company.projects[i].costestimate.bidschedule = [newBidItem]
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })

                    }



                }

            }

        }

    }

    handleprofit(csiid, profit) {
        console.log(csiid,profit)
        const design = new Design();
        const myuser = design.getuser.call(this);
        if(isNumeric(profit)) {
        if (myuser) {
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        project.costestimate.labor.map((labor, j) => {
                            if (labor.csiid === csiid) {
                                myuser.company.projects[i].costestimate.labor[j].profit = profit;

                            }
                        })



                    }

                    if (project.costestimate.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        project.costestimate.materials.map((material, k) => {
                            if (material.csiid === csiid) {
                                myuser.company.projects[i].costestimate.materials[k].profit = profit;

                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        project.costestimate.equipment.map((equipment, l) => {
                            if (equipment.csiid === csiid) {
                                myuser.company.projects[i].costestimate.equipment[l].profit = profit;

                            }
                        })


                    }

                }


            }
            this.props.reduxUser({ myuser })
            this.setState({ render: 'render' })
        }

    } else {
        alert(`Profit ${profit} should be numeric `)
    }
    }

    handlequantity(csiid, quantity) {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if(isNumeric(quantity)) {
        if (myuser) {
            const providerid = myuser.providerid;
            const project = design.getprojectbytitle.call(this, this.props.match.params.title)
            if (project) {
                const projectid = project.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("bidschedule")) {

                        const biditem = design.getbiditembycsiid.call(this, projectid, csiid);
                        if (biditem) {
                            const j = design.getbiditemkeybycsiid.call(this, projectid, csiid);
                            myuser.company.projects[i].costestimate.bidschedule[j].quantity = quantity;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        } else {
                            let unit = "";
                            let newBidItem = CreateBidItem(csiid, providerid, quantity, unit);
                            myuser.company.projects[i].costestimate.bidschedule.push(newBidItem)
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })

                        }

                    } else {

                        let unit = "";
                        let newBidItem = CreateBidItem(csiid, providerid, quantity, unit);
                        myuser.company.projects[i].costestimate.bidschedule = [newBidItem]
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })

                    }



                }

            }

        }
    } else {
        alert(`Quantity ${quantity} should be numeric`)
    }
    }

    showbiditem(biditem) {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const csi = design.getcsibyid.call(this, biditem.csiid);
        const project = design.getprojectbytitle.call(this, this.props.match.params.title);
        const directcost = Number(this.getdirectcost(biditem.csiid)).toFixed(2)
        const profit = +Number(this.getprofit(biditem.csiid)).toFixed(4);
        const bidprice = Number(this.getbidprice(biditem.csiid)).toFixed(2);
        const quantityfield = design.getquantityfield.call(this)
        const myuser = design.getuser.call(this)
        if(myuser) {
        if (project) {
            const projectid = project.projectid;
            const bidschedule = design.getbiditembycsiid.call(this, projectid, biditem.csiid);
            const quantity = bidschedule.quantity;
            const unit = bidschedule.unit;
            const unitprice = () => {
                if(biditem.csiid && quantity) {
                    return( Number(this.getbidprice(biditem.csiid) / quantity).toFixed(2))
                } else {
                    return(0)
                }

            }

            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}><Link style={{...styles.generalFont,...regularFont,...styles.generalLink}} to={`/${myuser.profile}/projects/${project.title}/bidschedule/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                value={quantity}
                                onChange={event => { this.handlequantity(biditem.csiid, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                value={unit}
                                onChange={event => { this.handleunit(biditem.csiid, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${directcost}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                value={profit}
                                onChange={event => { this.handleprofit(biditem.csiid, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${bidprice}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${unitprice()}</span>
                        </div>
                    </div>)

            } else {

                return (
                    <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}><Link style={{...styles.generalFont,...regularFont,...styles.generalLink}} to={`/${myuser.profile}/projects/${project.title}/bidschedule/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                        value={quantity}
                                        onChange={event => { this.handlequantity(biditem.csiid, event.target.value) }} /> 

                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                        value={unit}
                                        onChange={event => { this.handleunit(biditem.csiid, event.target.value) }} /> 
                                </div>

                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${directcost}</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}
                                        value={profit}
                                        onChange={event => { this.handleprofit(biditem.csiid, event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${bidprice}</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${unitprice()}</span>
                                </div>

                            </div>


                        </div>

                    </div>
                )

            }

        }
    }
    }

    showbiditems() {

        const biditems = this.getbiditems();
        let items = [];
        if (biditems) {
            // eslint-disable-next-line
            biditems.map(biditem => {
                items.push(this.showbiditem(biditem))

            })
        }
        return items;

    }

    render() {
        const design = new Design();
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)

        const titlerow = () => {
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                        </div>
                    </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                                </div>

                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                                </div>

                            </div>

                


                        </div>

                    </div>
                )

            }
        }

        return (
            <div style={{ ...styles.generalFont }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>Bid Schedule </span>
                        </div>
                    </div>

                    {titlerow()}

                    {this.showbiditems()}

                    {design.showsaveestimate.call(this)}


                </div>
            </div>)
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

export default connect(mapStateToProps, actions)(BidSchedule);