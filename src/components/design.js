import React from 'react';
import { sortpart, inputUTCStringForLaborID, getEquipmentRentalObj, calculatetotalhours, calculateTotalMonths, FutureCostPresent, AmmortizeFactor } from "./functions";
import { SaveSpecs, LogoutUser, SaveCSI, SaveCostEstimate, AppleLogin, SaveProfile, LoadCSIs, LoadSpecifications, CheckCompanyID } from './actions/api'
import firebase from 'firebase/app';
import 'firebase/auth';
import { MyStylesheet } from "./styles";
import { saveCostEstimateIcon, saveProfileIcon } from './svg'

class Design {

    async checkcompanyurl(myuser, url) {
        try {
            let response = await CheckCompanyID(url);
            console.log(response)
            if (response.hasOwnProperty("invalid")) {
                myuser.company.invalid = response.invalid;
                this.props.reduxUser({ myuser })
                this.setState({ message: response.invalid })
            } else {
                if (myuser.company.hasOwnProperty("invalid")) {
                    delete myuser.company.invalid;
                    this.props.reduxUser({ myuser })
                    this.setState({ message: '' })
                }
            }


        } catch (err) {
            alert(err)
        }
    }


    async loadspecifications(companyid, projectid) {
        const design = new Design();
        const project = design.getproject.call(this)
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (project) {
                const i = design.getprojectbykeyid.call(this, project.projectid)

                try {
                    let response = await LoadSpecifications(companyid, projectid)
                    if (response.hasOwnProperty("specifications")) {
                        myuser.company.projects[i].specifications = response.specifications;
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })

                    }

                } catch (err) {
                    alert(err)
                }


            }

        }

    }
    getcompanyid() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let companyid = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                companyid = myuser.company.companyid;
            }
        }
        return companyid;

    }

    getgocheckheight() {
        if (this.state.width > 1200) {
            return ({
                width: '69px',
                height: '69px'
            })
        } else if (this.state.width > 600) {
            return ({
                width: '59px',
                height: '59px'
            })
        } else {
            return ({
                width: '49px',
                height: '49px'
            })
        }

    }

    getbiditemkeybycsiid(projectid, csiid) {
        const design = new Design();
        let key = false;
        const project = design.getprojectbyid.call(this, projectid);
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("bidschedule")) {
                // eslint-disable-next-line
                project.costestimate.bidschedule.map((bidschedule, i) => {
                    if (bidschedule.csiid === csiid) {
                        key = i;
                    }
                })

            }

        }
        return key
    }

    getbiditembycsiid(projectid, csiid) {
        const design = new Design();
        let schedule = false;
        const project = design.getprojectbyid.call(this, projectid);
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("bidschedule")) {
                // eslint-disable-next-line
                project.costestimate.bidschedule.map(bidschedule => {
                    if (bidschedule.csiid === csiid) {
                        schedule = bidschedule;
                    }
                })

            }

        }
        return schedule;
    }

    gethourlyrate(providerid) {
        const design = new Design()
        const companys = design.getallcompanys.call(this)
        let hourlyrate = 0;
        if(companys) {
            companys.map(company=> {
                if(company.hasOwnProperty("employees")) {
                    company.employees.map(employee=> {
                        if(employee.providerid === providerid) {
                            hourlyrate = employee.laborrate;
                        }
                    })
                }
            })
        }
        return hourlyrate;

    }
    getmilestonebyid(projectid, milestoneid) {
        const design = new Design();
        const milestones = design.getmilestonesbyprojectid.call(this, projectid)
        let mymilestone = false;
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.milestoneid === milestoneid) {
                    mymilestone = milestone;
                }
            })
        }
        return mymilestone;
    }
    getmilestonesbyprojectid(projectid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid);
        let milestones = false;
        if (project.hasOwnProperty("milestones")) {
            milestones = project.milestones;
        }
        return milestones;
    }


    getmymaterialfromid(materialid) {
        const design = new Design();
        const companys = design.getallcompanys.call(this)
        let mymaterial = false;
        if (companys) {

            // eslint-disable-next-line
            companys.map(company => {


                if (company.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        company.materials.map(material => {
                            if (material.materialid === materialid) {
                                mymaterial = material;
                            }

                        })
                    }

            })

        }
        return mymaterial;
    }
    getmyequipmentfromid(equipmentid) {
        const design = new Design();
        const companys = design.getallcompanys.call(this)
        let myequipment = false;
        if (companys) {
            // eslint-disable-next-line
            companys.map(company => {
                if (company.hasOwnProperty("company")) {
                    if (company.company.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        company.company.equipment.map(equipment => {
                            if (equipment.equipmentid === equipmentid) {
                                myequipment = equipment;
                            }
                        })
                    }
                }
            })
        }
        return myequipment;
    }
    getequipmentkeybyid(projectid, equipmentid) {
        const design = new Design();
        const myequipment = design.getequipmentbyprojectid.call(this, projectid)
        let key = false;
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map((equipment, i) => {
                if (equipment.equipmentid === equipmentid) {
                    key = i;

                }
            })
        }
        return key;
    }

    getequipmentratebyid(companyid, equipmentid, timein, timeout) {
        const design = new Design();
        let equipmentrate = 0;
        const equipment = design.getcompanyequipmentbyid.call(this, companyid, equipmentid)
        if (equipment.hasOwnProperty("equipmentrate")) {
            equipmentrate = equipment.equipmentrate;
        } else if (equipment.hasOwnProperty("rentalrates")) {
            equipmentrate = design.calculateequipmentratebyid.call(this, companyid, equipmentid, timein, timeout)
        }
        return equipmentrate;
    }

    getequipmentrentalratebyid(companyid, equipmentid, timein, timeout) {
        const design = new Design();
        const myequipment = design.getcompanyequipmentbyid.call(this, companyid, equipmentid);
        let rentalrate = 0;
        if (myequipment) {
            if (myequipment.hasOwnProperty("rentalrates")) {
                const hourlyrate = Number(myequipment.rentalrates.hour);
                const dailyrate = Number(myequipment.rentalrates.day);

                const weeklyrate = Number(myequipment.rentalrates.week);
                const monthlyrate = Number(myequipment.rentalrates.month);
                const rentalObj = getEquipmentRentalObj(timein, timeout);

                const hours = rentalObj.hours;
                const days = rentalObj.days;
                const weeks = rentalObj.weeks;
                const months = rentalObj.months;
                let rentalcost = (hourlyrate * hours) + (days * dailyrate) + (weeks * weeklyrate) + (months * monthlyrate);
                let totalhours = calculatetotalhours(timeout, timein);
                rentalrate = rentalcost / totalhours;
            }
        }
        return rentalrate;

    }


    calculateequipmentratebyownership(equipmentid) {
        const design = new Design();
        const myequipment = design.getmyequipmentfromid.call(this, equipmentid);

        const i = (Number(myequipment.ownership.loaninterest) / 100) / 12;
        const workinghours = Math.round(Number(myequipment.ownership.workinghours) / 12);
        let equipmentrate = 0;

        const P = () => {
            let P = 0;

            if (myequipment.ownership.hasOwnProperty("costs")) {
                // eslint-disable-next-line
                myequipment.ownership.costs.map(cost => {

                    let n = calculateTotalMonths(myequipment.ownership.purchasedate, cost.timein);
                    let F = Number(cost.cost)
                    P += FutureCostPresent(i, n, F);

                })
            }
            return (P)
        }
        const Period = () => {
            let purchasedate = myequipment.ownership.purchasedate;
            let saledate = myequipment.ownership.saledate;
            if (purchasedate && saledate) {
                let totalmonths = calculateTotalMonths(purchasedate, saledate)
                return (totalmonths)
            } else {
                return 0;
            }

        }

        const AFactor = () => {
            const T = Period();
            const i = Number(myequipment.ownership.loaninterest);

            if (T) {

                return (AmmortizeFactor(i, T))
            } else {

                return 0;
            }

        }

        const totalworkinghours = () => {
            let annual = Number(myequipment.ownership.workinghours);
            let years = Period() / 12;

            return (Math.round(annual * years))
        }

        if (i > 0) {

            equipmentrate = (P() * AFactor()) / (workinghours);
        } else {

            equipmentrate = P() / (totalworkinghours())
        }

        return equipmentrate;
    }





    calculateequipmentratebyid(companyid, equipmentid, timein, timeout) {

        const design = new Design();

        let equipmentrate = design.getequipmentrentalratebyid.call(this, companyid, equipmentid, timein, timeout)

        return equipmentrate;

    }
    getequipmentbyid(projectid, equipmentid) {
        const design = new Design();
        const myequipment = design.getequipmentbyprojectid.call(this, projectid)
        let equipments = false;
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                if (equipment.equipmentid === equipmentid) {
                    equipments = equipment;

                }
            })
        }
        return equipments;
    }

    getequipmentbyprojectid(projectid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid)
        let myequipment = false;
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("equipment")) {
                myequipment = project.costestimate.equipment;

            }
        }
        return myequipment;
    }
    getcompanyidfrommaterialid(projectid, materialid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid);
        let companyid = this.state.companyid;
        if (project) {
            const mymaterial = design.getmaterialbyid.call(this, projectid, materialid);
            const mymaterialid = mymaterial.mymaterialid;

            const companys = design.getallcompanys.call(this);
            if (companys) {
                // eslint-disable-next-line
                companys.map(company => {

                    if (company.hasOwnProperty("materials")) {
                            // eslint-disable-next-line
                            company.materials.map(material => {
                                if (material.materialid === mymaterialid) {

                                    companyid = company.companyid;
                                }
                            })
                        }

                })
            }
        }
        return companyid;
    }

    getcompanybyid(companyid) {
        const design = new Design();
        const allcompanys = design.getallcompanys.call(this);
        let mycompany = false;
        if (allcompanys) {
            allcompanys.map(company => {
                if (company.companyid === companyid) {
                    mycompany = company;

                }
            })
        }

        return mycompany;
    }

    getcompanyequipmentbyid(companyid, equipmentid) {
        const design = new Design();
        const company = design.getcompanybyid.call(this, companyid)
        let myequipment = false;
        if (company) {
            if (company.hasOwnProperty("equipment")) {
                company.equipment.map(equipment => {
                    if (equipment.equipmentid === equipmentid) {
                        myequipment = equipment;

                    }
                })
            }

        }
        return myequipment;
    }
    getcompanyidfromequipmentid(equipmentid) {
        const design = new Design();
        const companys = design.getallcompanys.call(this);
        let companyid = false;
   
        if (companys) {
            // eslint-disable-next-line
            companys.map(company => {
              
                if (company.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    company.equipment.map(equipment => {
                 
                        if (equipment.equipmentid === equipmentid) {
                    
                            companyid = company.companyid;
                        }
                    })
                }


            })

        }

        return companyid;
    }
    getcompanyidfromlaborid(projectid, laborid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid);
        let companyid = this.state.companyid;
        if (project) {
            const mylabor = design.getlaborbyid.call(this, projectid, laborid);
            const providerid = mylabor.providerid;

            const companys = design.getallcompanys.call(this);
            if (companys) {
                // eslint-disable-next-line
                companys.map(company => {

                    if (company.hasOwnProperty("employees")) {
                            // eslint-disable-next-line
                            company.employees.map(employee => {
                                if (employee.providerid === providerid) {

                                    companyid = company.companyid;
                                }
                            })
                        }

                 })
            }
        }
        return companyid;
    }

    getmaterialkeybyid(projectid, materialid) {
        const design = new Design();
        const materials = design.getmaterialsbyprojectid.call(this, projectid);
        let key = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map((material, i) => {
                if (material.materialid === materialid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getmaterialbyid(projectid, materialid) {
        const design = new Design();
        const materials = design.getmaterialsbyprojectid.call(this, projectid);
        let mymaterial = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map(material => {
                if (material.materialid === materialid) {
                    mymaterial = material;
                }
            })
        }
        return mymaterial;
    }

    getmaterialsbyprojectid(projectid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid)
        let mymaterials = false;
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("materials")) {
                mymaterials = project.costestimate.materials;

            }
        }
        return mymaterials;
    }

    getlaborkeybyid(projectid, laborid) {
        const design = new Design();
        const mylabor = design.getlaborbyprojectid.call(this, projectid)
        let key = false;
        if (mylabor) {
            // eslint-disable-next-line
            mylabor.map((labor, i) => {
                if (labor.laborid === laborid) {
                    key = i;

                }
            })
        }
        return key;
    }
    getlaborbyid(projectid, laborid) {
        const design = new Design();
        const mylabor = design.getlaborbyprojectid.call(this, projectid)
        let labors = false;
        if (mylabor) {
            // eslint-disable-next-line
            mylabor.map(labor => {
                if (labor.laborid === laborid) {
                    labors = labor;

                }
            })
        }
        return labors;
    }

    getlaborbyprojectid(projectid) {
        const design = new Design();
        const project = design.getprojectbyid.call(this, projectid)
        let mylabor = false;
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("labor")) {
                mylabor = project.costestimate.labor;

            }
        }
        return mylabor;
    }

    getcompanykeybyid(companyid) {
        const design = new Design();
        const allcompanys = design.getallcompanys.call(this);
        let key = false;
        if (allcompanys) {
            // eslint-disable-next-line
            allcompanys.map((company, i) => {
                if (company.companyid === companyid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getemployeebyid(providerid) {
        const design = new Design();
        const companys = design.getallcompanys.call(this);
        let myemployee = false;
        if (companys) {
            // eslint-disable-next-line
            companys.map(company => {


                if (company.hasOwnProperty("employees")) {
                    // eslint-disable-next-line
                    company.employees.map(employee => {
                        if (employee.providerid === providerid) {
                            myemployee = employee;
                        }
                    })

                }

            })
        }
        return myemployee;
    }



    getallcompanys() {
        let companys = false;
        if (this.props.allcompanys) {
            if (this.props.allcompanys.hasOwnProperty("companies")) {
                companys = this.props.allcompanys.companies;
            }
        }
        return companys;
    }

    getblackx() {
        if (this.state.width > 1200) {
            return ({ width: '49px', height: '49px' })
        } else if (this.state.width > 600) {
            return ({ width: '49px', height: '49px' })
        } else {
            return ({ width: '49px', height: '49px' })
        }
    }

    getappleicon() {

        if (this.state.width > 1200) {
            return ({ width: '373px', height: '88px' })
        } else if (this.state.width > 600) {
            return ({ width: '277px', height: '65px' })
        } else {
            return ({ width: '140px', height: '33px' })
        }


    }

    getampmicon() {
        if (this.state.width > 1200) {
            return ({ width: '83px', height: '48px' })
        } else if (this.state.width > 600) {
            return ({ width: '70px', height: '41px' })
        } else {
            return ({ width: '57px', height: '33px' })
        }

    }
    getgoogleicon() {

        if (this.state.width > 1200) {
            return ({ width: '365px', height: '87px' })
        } else if (this.state.width > 600) {
            return ({ width: '277px', height: '66px' })
        } else {
            return ({ width: '140px', height: '33px' })
        }

    }

    getMenuicon() {
        if (this.state.width > 1200) {
            return ({ width: '63px', height: '55px' })
        } else if (this.state.width > 600) {
            return ({ width: '63px', height: '55px' })
        } else {
            return ({ width: '63px', height: '55px' })
        }
    }

    getquantityfield() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '145px' })
        } else {
            return ({ maxWidth: '96px' })
        }
    }


    getcsikeybyid(csiid) {
        const design = new Design();
        const codes = design.getallcsicodes.call(this)
        let key = false;
        if (codes) {
            // eslint-disable-next-line
            codes.map((code, i) => {
                if (code.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getcsibyid(csiid) {
        const design = new Design();
        const codes = design.getallcsicodes.call(this)
        let csi = false;
        if (codes) {

            // eslint-disable-next-line
            codes.map(code => {
                if (code.csiid === csiid) {
                    csi = code;
                }
            })
        }
        return csi;
    }

    getprojectbytitle(title) {
        const design = new Design();
        const myprojects = design.getprojects.call(this)
        let project = false;
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.title === title) {
                    project = myproject;

                }
            })
        }
        return project;
    }

    getcontentkeybyid(projectid, csiid, sectionid, contentid) {
        const design = new Design();
        const section = design.getsectionbyid.call(this, projectid, csiid, sectionid)
        let key = false;
        if (section) {

            if (section.hasOwnProperty("content")) {
                // eslint-disable-next-line
                section.content.map((content, i) => {
                    if (content.contentid === contentid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }

    getcontentbyid(projectid, csiid, sectionid, contentid) {
        const design = new Design();
        const section = design.getsectionbyid.call(this, projectid, csiid, sectionid)
        let mycontent = false;
        if (section) {

            if (section.hasOwnProperty("content")) {
                // eslint-disable-next-line
                section.content.map(content => {
                    if (content.contentid === contentid) {
                        mycontent = content;
                    }
                })
            }
        }
        return mycontent
    }

    getsubcontentkeybyid(projectid, csiid, sectionid, contentid, subcontentid) {
        const design = new Design();
        const content = design.getcontentbyid.call(this, projectid, csiid, sectionid, contentid)
        let key = false;
        if (content) {
            if (content.hasOwnProperty("subcontent")) {
                // eslint-disable-next-line
                content.subcontent.map((subcontent, i) => {
                    if (subcontent.subcontentid === subcontentid) {
                        key = i;
                    }
                })
            }
        }
        return key;

    }

    getsubcontentbyid(projectid, csiid, sectionid, contentid, subcontentid) {
        const design = new Design();
        const content = design.getcontentbyid.call(this, projectid, csiid, sectionid, contentid)
        let mycontent = false;
        if (content) {
            if (content.hasOwnProperty("subcontent")) {
                // eslint-disable-next-line
                content.subcontent.map(subcontent => {
                    if (subcontent.subcontentid === subcontentid) {
                        mycontent = subcontent;
                    }
                })
            }
        }
        return mycontent;

    }
    getsectionnumberbyid(projectid, csiid, sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this, projectid, csiid)
        let mycounter = "";
        if (spec.hasOwnProperty("sections")) {
            const section = design.getsectionbyid.call(this, projectid, csiid, sectionid)
            if (section) {
                let part = section.part;

                spec.sections.sort((b, a) => {
                    return sortpart(b, a)
                })

                let counter = 1;
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.part === part) {

                        if (section.sectionid === sectionid) {
                            mycounter = counter;
                        } else {
                            counter += 1;
                        }

                    }



                })

            }

        }
        if (Number(mycounter) < 10) {
            mycounter = `0${mycounter}`
        }
        return mycounter;
    }

    getsectionbyid(projectid, csiid, sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this, projectid, csiid)
        let mysection = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section => {
                    if (section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }



    getsectionkeybyid(projectid, csiid, sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this, projectid, csiid)
        let key = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }

    getspecficationkeybycsi(projectid, csiid) {
        const design = new Design();
        const specs = design.getspecficationsbyprojectid.call(this, projectid)
        let key = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map((spec, i) => {
                if (spec.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getspecficationbycsi(projectid, csiid) {
        const design = new Design();
        const specs = design.getspecficationsbyprojectid.call(this, projectid)

        let myspec = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                if (spec.csiid === csiid) {
                    myspec = spec;

                }
            })
        }
        return myspec;
    }
    getspecficationsbyprojectid(projectid) {
        const design = new Design();
        const myproject = design.getprojectbyid.call(this, projectid)
        let specifications = false;
        if (myproject.hasOwnProperty("specifications")) {
            specifications = myproject.specifications;
        }
        return specifications;
    }
    getsaveestimate() {
        if (this.state.width > 1200) {
            return ({ width: '338px', height: '71px' })
        } else if (this.state.width > 600) {
            return ({ width: '278px', height: '59px' })
        } else {
            return ({ width: '218px', height: '46px' })

        }
    }
    validatesavecostestimate() {
        const design = new Design();
        let validate = {};
        validate.validate = true;
        validate.message = "";
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (project) {
            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        if (!labor.milestoneid) {
                            validate.validate = false;
                            validate.message += `Labor ID ${labor.laborid} Missing MilestoneID`;
                        }
                        if (!labor.csiid) {

                            validate.validate = false;
                            validate.message += `Labor ID ${labor.laborid} Missing CSI`;

                        }
                        if (!labor.providerid) {

                            validate.validate = false;
                            validate.message += `Labor ID ${labor.laborid} Missing ProviderID`;

                        }
                    })
                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        if (!material.milestoneid) {
                            validate.validate = false;
                            validate.message += `Material ${material.materialid} Missing MilestoneID`;

                        }
                        if (!material.csiid) {
                            validate.validate = false;
                            validate.message += `Material ${material.materialid} CSI`;

                        }
                        if (!material.mymaterialid) {
                            validate.validate = false;
                            validate.message += `Material ${material.materialid} Missing MaterialID`;

                        }
                    })
                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        if (!equipment.milestoneid) {
                            validate.validate = false;
                            validate.message += `Equipment ${equipment.equipmentid} Missing MilestoneID`;

                        }
                        if (!equipment.csiid) {
                            validate.validate = false;
                            validate.message += `Equipment ${equipment.equipmentid} Missing CSI`;

                        }
                        if (!equipment.myequipmentid) {
                            validate.validate = false;
                            validate.message += `Equipment ${equipment.equipmentid} Missing EquipmentID`;

                        }
                    })
                }


            }



        }
        return validate;
    }
    async savecostestimate() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        const validate = design.validatesavecostestimate.call(this)
        if (validate.validate) {
            if (myuser) {
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (myuser.hasOwnProperty("company")) {
                    const companyid = myuser.company.companyid;
                    if (project) {
                        const projectid = project.projectid;
                        const i = design.getprojectbykeyid.call(this, projectid)
                        if (project.hasOwnProperty("costestimate")) {
                            const costestimate = project.costestimate;
                            const values = { projectid, companyid, costestimate }
                            try {
                                let response = await SaveCostEstimate(values);
                                console.log(response)
                                let activelaborid = "";
                                let activematerialid = "";
                                let activeequipmentid = "";
                                if (response.hasOwnProperty("replaceids")) {
                                    if (this.state.activelaborid) {
                                        if (response.replaceids.hasOwnProperty("labor")) {
                                            // eslint-disable-next-line
                                            response.replaceids.labor.map(labor => {
                                                if (labor.oldlaborid === this.state.activelaborid) {
                                                    this.setState({ activelaborid: false })
                                                    activelaborid = labor.laborid;
                                                }
                                            })
                                        }

                                    } else if (this.state.activematerialid) {
                                        if (response.replaceids.hasOwnProperty("materials")) {
                                            // eslint-disable-next-line
                                            response.replaceids.materials.map(material => {
                                                if (material.oldmaterialid === this.state.activematerialid) {
                                                    this.setState({ activematerialid: false })
                                                    activematerialid = material.materialid;
                                                }
                                            })
                                        }

                                    } else if (this.state.activeequipmentid) {
                                        if (response.replaceids.hasOwnProperty("equipment")) {
                                            // eslint-disable-next-line
                                            response.replaceids.equipment.map(equipment => {
                                                if (equipment.oldequipmentid === this.state.activeequipmentid) {
                                                    this.setState({ activeequipmentid: false })
                                                    activeequipmentid = equipment.equipmentid;
                                                }
                                            })
                                        }

                                    }

                                }
                                if (response.hasOwnProperty("costestimate")) {
                                    myuser.company.projects[i].costestimate = response.costestimate;
                                    this.props.reduxUser({ myuser })
                                    let message = "";
                                    if (response.hasOwnProperty("message")) {

                                        message = `${response.message}`
                                    }
                                    message += `last updated ${inputUTCStringForLaborID(response.lastupdated)}`


                                    if (activelaborid) {
                                        this.setState({ render: 'render', message, activelaborid })

                                    }
                                    if (activematerialid) {
                                        this.setState({ render: 'render', message, activematerialid })

                                    }
                                    if (activeequipmentid) {
                                        this.setState({ render: 'render', message, activeequipmentid })

                                    }

                                    this.setState({ render: 'render', message })


                                }
                            } catch (err) {
                                alert(err)
                            }
                        }
                    }

                }

            }

        } else {
            alert(validate.message)
        }
    }
    showsaveestimate() {
        const design = new Design();
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        const saveestimate = design.getsaveestimate.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...saveestimate }} onClick={() => { design.savecostestimate.call(this) }}>{saveCostEstimateIcon()}</button>

                        </div>
                    </div>

                </div>
            </div>
        )
    }

    getprojectbykeyid(projectid) {
        const design = new Design();
        const myprojects = design.getprojects.call(this)
        let key = false;
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;

    }
    getprojectbyid(projectid) {
        const design = new Design();
        const myprojects = design.getprojects.call(this)
        let project = false;
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        return project;

    }
    getprojects() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        let projects = false;
        if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
                projects = myuser.company.projects;
            }
        }

        return projects;
    }
    getsaveicon() {
        if (this.state.width > 1200) {
            return ({ width: '122px', height: '52px' })
        } else if (this.state.width > 600) {
            return ({ width: '107px', height: '45px' })
        } else {
            return ({ width: '92px', height: '39px' })
        }
    }

    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({ width: '340px' })
        } else if (this.state.width > 600) {
            return ({ width: '270px' })
        } else {
            return ({ width: '200px', height: '44px' })
        }
    }
    getremoveicon() {
        if (this.state.width > 600) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    getloginnow() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '479px',
                    height: '115px'
                })

        } else if (this.state.width > 600) {
            return (
                {
                    width: '360px',
                    height: '86px'
                })

        } else {
            return (
                {
                    width: '242px',
                    height: '58px'
                })
        }

    }
    getFolderSize() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '142px',
                    height: '88px'
                })

        } else if (this.state.width > 600) {
            return (
                {
                    width: '93px',
                    height: '76px'
                })

        } else {
            return (
                {
                    width: '88px',
                    height: '61px'
                })
        }

    }
    getdropicon() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '93x',
                    height: '45px'
                })

        } else if (this.state.width > 600) {
            return (
                {
                    width: '78px',
                    height: '38px'
                })

        } else {
            return (
                {
                    width: '62px',
                    height: '30px'
                })
        }
    }

    async loadcsis() {

        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                const companyid = myuser.company.companyid;
                const response = await LoadCSIs(companyid);
                console.log(response)
                if (response.hasOwnProperty("csicodes")) {
                    this.props.reduxCSIs(response.csicodes);
                    this.setState({ render: 'render' })
                }
            }
        }
    }

    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 600) {
            return (
                {
                    width: '285px',
                    height: '249px'
                })

        } else {
            return (
                {
                    width: '167px',
                    height: '145px'
                })
        }
    }
    getactiveproject() {
        let activeproject = false;
        if (this.props.project) {
            activeproject = this.props.project;
        }
        return activeproject;
    }

    async savemyprofile() {
        const design = new Design();
        const myuser = design.getuser.call(this)

        const validatemyuser = (myuser) => {
            let message = "";
            if (myuser.hasOwnProperty("invalid")) {
                message += ' Invalid Profile '

            }

            if (myuser.hasOwnProperty("invalidemail")) {
                message += `Invalid Email`
            }
            return message;

        }

        if (myuser) {

            if (!validatemyuser(myuser)) {

                const profile = {

                    providerid: myuser.providerid,
                    profile: myuser.profile,
                    firstname: myuser.firstname,
                    lastname: myuser.lastname,
                    emailaddress: myuser.emailaddress,
                    phonenumber: myuser.phonenumber
                }

                if (myuser.hasOwnProperty("company")) {

                    profile.company = {
                        companyid: myuser.company.companyid,
                        company: myuser.company.company,
                        url: myuser.company.url,
                        address: myuser.company.address,
                        city: myuser.company.city,
                        contactstate: myuser.company.contactstate,
                        zipcode: myuser.company.zipcode
                    }

                }




                try {

                    let response = await SaveProfile({ profile })
                    console.log(response)
                    if (response.hasOwnProperty("profile")) {

                        myuser.profile = response.profile.profile;
                        myuser.firstname = response.profile.firstname;
                        myuser.lastname = response.profile.lastname;
                        myuser.emailaddress = response.profile.emailaddress;
                        myuser.phonenumber = response.profile.phonenumber;

                        if (response.profile.hasOwnProperty("company")) {
                            myuser.company.url = response.profile.company.url;
                            myuser.company.company = response.profile.company.company;
                            myuser.company.address = response.profile.company.address;
                            myuser.company.city = response.profile.company.city;
                            myuser.company.contactstate = response.profile.company.contactstate;
                            myuser.company.zipcode = response.profile.company.zipcode;

                        }

                        this.props.reduxUser({ myuser });
                        this.setState({ render: 'render' })

                    }

                    if (response.hasOwnProperty("message")) {
                        let message = "";

                        message += response.message;
                        if (response.hasOwnProperty("lastupdated")) {
                            message += `Last Updated ${inputUTCStringForLaborID(response.lastupdated)}`
                        }

                        this.setState({ message })
                    }

                } catch (err) {
                    alert(err)
                }

            } else {
                this.setState({ message: validatemyuser(myuser) })
            }


        }


    }

    showsaveprofile() {
        const styles = MyStylesheet();
        const design = new Design();
        const saveprofile = () => {
            if (this.state.width > 1200) {
                return ({ width: '288px' })
            } else if (this.state.width > 600) {
                return ({ width: '237px' })
            } else {
                return ({ width: '171px' })
            }
        }
        return (
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <button style={{ ...styles.generalButton, ...saveprofile() }} onClick={() => { design.savemyprofile.call(this) }}
                >{saveProfileIcon()}</button>
            </div>
        )
    }
    getuser() {
        let myuser = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("myuser")) {
                myuser = this.props.myusermodel.myuser;
            }
        }
        return myuser;
    }
    getslidebyid(id) {
        const design = new Design();
        const slides = design.getslides.call(this)
        let myslide = false;
        if (slides) {
            // eslint-disable-next-line
            slides.map(slide => {
                if (slide.id === id) {
                    myslide = slide;
                }
            })
        }
        return myslide;
    }
    getslides() {
        const slides = () => {
            return ([

                {
                    title: 'Project Specification',
                    id: 'viewspecification',
                    url: 'http://civilengineer.io/design/slides/specunhighlighted.png',
                    caption: `Specifications component was created for making and viewing specifications`

                },
                {
                    title: 'Update Project Specification',
                    id: 'updatespecification',
                    url: 'http://civilengineer.io/design/slides/spechighlighted.png',
                    caption: `Create and Update your project specifications. This sets the standards for the construction and mentions payment.`

                },

        

                {
                    title: 'Update Company Specification',
                    id: 'updatingspecifications',
                    url: 'http://civilengineer.io/design/slides/updatespecview.png',
                    caption: `Update your companys specification database, add new codes to existing set`

                },

                {
                    title: 'Cost Estimating',
                    id: 'costestimate',
                    url: 'http://civilengineer.io/design/slides/costestimate.png',
                    caption: `Engineering Cost Estimate using Contractor equipment, labor, and material prices`

                },
                {
                    title: 'Bid Schedule',
                    id: 'bidschedule',
                    url: 'http://civilengineer.io/design/slides/bidschedule.png',
                    caption: `Engineers bid schedule produces itemized construction schedule done for cost estimating purposes`
                },
                {
                    title: 'Line Item',
                    id: 'lineitem',
                    url: 'http://civilengineer.io/design/slides/lineitem.png',
                    caption: `View Labor, Equipment, Materials for each line item in your cost estimate`
                },


            ])
        }
        return slides();
    }
    getallcsicodes() {

        let csis = false;
        if (this.props.hasOwnProperty("csis")) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis
            }
        }
        return csis;
    }
    getsmallslide() {
        if (this.state.width > 1200) {
            return ({ width: '362px', height: 'auto' })
        } else if (this.state.width > 600) {
            return ({ width: '254px', height: 'auto' })
        } else {
            return ({ width: '178px', height: 'auto' })
        }

    }
    getmainslide() {
        if (this.state.width > 1200) {
            return ({ width: '1087px', height: 'auto' })
        } else if (this.state.width > 600) {
            return ({ width: '762px', height: 'auto' })
        } else {
            return ({ width: '356px', height: 'auto' })
        }
    }
    getLargeFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '48px' })
        } else if (this.state.width > 600) {
            return ({ fontSize: '40px' })
        } else {
            return ({ fontSize: '36px' })
        }
    }
    getRegularFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '36px' })
        } else if (this.state.width > 600) {
            return ({ fontSize: '30px' })
        } else {
            return ({ fontSize: '24px' })
        }
    }
    getbuttonheight() {
        if (this.state.width > 1200) {
            return ({ height: '75px' })
        } else if (this.state.width > 600) {
            return ({ height: '58px' })
        } else {
            return ({ height: '40px' })
        }
    }

    getHeaderFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '40px' })
        } else if (this.state.width > 600) {
            return ({ fontSize: '36px' })
        } else {
            return ({ fontSize: '30px' })
        }
    }


    getaddicon() {


        if (this.state.width > 1200) {
            return ({ width: '130px' })
        } else if (this.state.width > 600) {
            return ({ width: '105px' })
        } else {
            return ({ width: '80px' })
        }


    }

    async saveupdatedcsis() {
        const design = new Design();

        const csicodes = design.getallcsicodes.call(this)
        if (csicodes) {

            const updatedcsis = design.getupdatedcsis.call(this)

            if (updatedcsis) {
                const values = { csis: updatedcsis }
                console.log(values)
                try {
                    const response = await SaveCSI(values);
                    console.log(response)

                    if (response.hasOwnProperty("csis")) {
                        if (response.csis.hasOwnProperty("length")) {
                            response.csis.map(csis => {

                                const csi = design.getcsibyid.call(this, csis.csiid)
                                if (csi) {
                                    const i = design.getcsikeybyid.call(this, csis.csiid)
                                    csicodes[i] = csis

                                }


                            })


                        }

                        this.props.reduxCSIs(csicodes)

                    }
                    let message = "";
                    if (response.hasOwnProperty('message')) {
                        message += response.message

                    }
                    if (response.hasOwnProperty("lastupdated")) {
                        message += ` Last Updated ${inputUTCStringForLaborID(response.lastupdated)}`
                    }
                    this.setState({ message })


                } catch (err) {
                    alert(err)
                }


            }


        } // if csi codes



    }

    getproject() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let project = false;
        if (myuser) {
            const title = this.props.match.params.title;
            project = design.getprojectbytitle.call(this, title)
        }
        return project;
    }



    async saveprojectspecs() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getproject.call(this)
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, myproject.projectid)
                const specifications = design.getspecficationsbyprojectid.call(this, projectid);
                if (specifications) {
                    const specs = {}
                    specs.companyid = myuser.company.companyid;
                    specs.projectid = myproject.projectid;
                    specs.specifications = specifications;



                    try {

                        let response = await SaveSpecs({ specs });
                        console.log(response)
                        if (response.hasOwnProperty("specifications")) {
                            myuser.company.projects[i].specifications = response.specifications;
                            this.props.reduxUser({ myuser })
                            let message = `Last Updated ${new Date().toLocaleTimeString()}`
                            this.setState({ message })
                        }

                    } catch (err) {
                        alert(err)
                    }

                }


            }
        }
    }

    async googleSignIn(type) {
        const design = new Design();


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let emailaddresscheck = false;
            if (emailaddress) {
                emailaddresscheck = true;
            }
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            this.setState({ client, clientid, emailaddress, firstname, lastname, profileurl, phonenumber, emailaddresscheck })

            design.clientlogin.call(this, type)





        } catch (error) {
            alert(error)
        }


    }

    async clientlogin(type) {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let profile = this.state.profile;
        let phonenumber = this.state.phonenumber;
        let profileurl = this.state.profileurl;


        let values = { emailaddress, client, clientid, firstname, lastname, profile, phonenumber, profileurl, type }

        try {
            let response = await AppleLogin(values)
            this.props.reduxUser(response.myuser)
        } catch (err) {
            alert(err)
        }
    }

    async appleSignIn(type) {
        const design = new Design();
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;
            let firstname = "";
            let lastname = "";
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let phonenumber = user.providerData[0].phoneNumber
            let profileurl = user.providerData[0].photoURL;
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;
            let emailaddresscheck = false;
            if (emailaddress) {
                emailaddresscheck = true;
            }

            this.setState({ client, clientid, firstname, lastname, profileurl, phonenumber, emailaddress, emailaddresscheck })
            design.clientlogin.call(this, type)

        } catch (err) {
            alert(err)
        }

    }
    getupdatedcsis() {
        const design = new Design();
        let csicodes = design.getallcsicodes.call(this);
        if (csicodes) {
            csicodes = csicodes.filter(csicode => {

                if (csicode.hasOwnProperty("updatedby")) {
                    return csicode;
                }
            })
            if (csicodes.length === 0) {
                csicodes = false;
            }
        }

        return csicodes;

    }
    async logoutuser() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        if (myuser) {
            try {

                let response = await LogoutUser(myuser.providerid);
                console.log(response)
                this.props.reduxUser(response)

            } catch (err) {
                alert(err)
            }

        }

    }

}
export default Design;