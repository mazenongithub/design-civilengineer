import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design'

class CompanyID {


    showoption(company) {
   
        return (<option
            key={company.companyid}
            value={company.companyid}>{company.company}</option>)
    }
    loadcompanyids() {
        const design = new Design();
        const companyid = new CompanyID();
        let options = [];
        const allcompanys = design.getallcompanys.call(this);
    
        if (allcompanys) {
            // eslint-disable-next-line
            allcompanys.map(company => {
                options.push(companyid.showoption.call(this, company))


            })

        }

        return options;

    }

  

    showemployee(employee) {

        return (<option value={employee.providerid}>{employee.firstname} {employee.lastname}</option>)
    }
    showemployees(companyid) {
        const design = new Design();
        const company = design.getcompanybyid.call(this, companyid);
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        const mycompanyid = new CompanyID();
        let employees = [];
       
        if (company.hasOwnProperty("employees")) {
            // eslint-disable-next-line
            company.employees.map(employee => {
                employees.push(mycompanyid.showemployee.call(this, employee))

            })
        
    }

    if (this.state.active === 'labor' && this.state.companyid) {
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <div style={{...styles.generalContainer}}>
                    <span style={{...styles.generalFont,...regularFont}}>Employee ID </span>
                </div>
                <select style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} value={this.getemployeeid()} onChange={event=>{this.handleemployeeid(event.target.value)}}>
                    <option value="">Select An Employee </option>
                    {employees}
                </select>
            </div>)

        }

    }
  
    showmaterial(material) {

        return (<option value={material.materialid}>{material.material}</option>)
    }
    showmaterials(companyid) {
        const design = new Design();
        const company = design.getcompanybyid.call(this, companyid);
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        const mycompanyid = new CompanyID();
        let materials= [];
  
        if (company.hasOwnProperty("materials")) {
            // eslint-disable-next-line
            company.materials.map(material => {
                materials.push(mycompanyid.showmaterial.call(this, material))

            })
        
    }

    if (this.state.active === 'materials' && this.state.companyid) {
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <div style={{...styles.generalContainer}}>
                    <span style={{...styles.generalFont,...regularFont}}>Material </span>
                </div>
                <select style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                value={this.getmymaterialid()}
                onChange={event=>{this.handlemymaterialid(event.target.value)}}>
                    <option value="">Select A Material </option>
                    {materials}
                </select>
            </div>)

        }

    }

    
    showequipment(equipment) {

        return (<option value={equipment.equipmentid}>{equipment.equipment}</option>)
    }

    showequipments(companyid) {
        const design = new Design();
        const company = design.getcompanybyid.call(this, companyid);
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        const mycompanyid = new CompanyID();
        let equipments= [];
  
        if (company.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            company.equipment.map(equipment => {
                equipments.push(mycompanyid.showequipment.call(this, equipment))
    
            })
        
    }
    
    if (this.state.active === 'equipment' && this.state.companyid) {
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <div style={{...styles.generalContainer}}>
                    <span style={{...styles.generalFont,...regularFont}}>Equipment </span>
                </div>
                <select style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                onChange={event=>{this.handlemyequipmentid.call(this,event.target.value)}}
                 value={this.getequipmentid()}>
                    <option value="">Select A Equipment </option>
                    {equipments}
                </select>
            </div>)
    
        }
    
    }

    showsubmenu() {
        const companyid = new CompanyID();
        if (this.state.active && this.state.companyid) {
            switch (this.state.active) {
                case 'labor':
                    if (this.state.companyid) {
                        return (companyid.showemployees.call(this, this.state.companyid))
                    }
                    break;
                case 'materials':
                    return (companyid.showmaterials.call(this, this.state.companyid))
                case 'equipment':
                    return (companyid.showequipments.call(this, this.state.companyid))
                default:
                    break;
            }
        }
    }

    showcompanyid() {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const companyid = new CompanyID();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalContainer }}>
                        <span style={{ ...regularFont, ...styles.generalFont }}> Company ID </span>
                    </div>
                    <div style={{ ...styles.generalContainer,...styles.bottomMargin15 }}>
                        <select style={{ ...styles.generalField, ...regularFont, ...styles.generalField }}
                            onChange={(event) => { this.setState({ companyid: event.target.value }) }}
                            value={this.getcompanyid()}>
                            <option value="">Select A Company </option>
                            {companyid.loadcompanyids.call(this)}
                        </select>
                    </div>

                    {companyid.showsubmenu.call(this)}
                </div>
            </div>
        )
    }

}

export default CompanyID;