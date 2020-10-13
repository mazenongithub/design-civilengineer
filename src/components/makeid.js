
import Design from './design';
import { makeID } from './functions';

class MakeID {

    laborid() {
        const design = new Design();
        let laborid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                laborid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("costestimate")) {
                        if (project.costestimate.hasOwnProperty("labor")) {
                            // eslint-disable-next-line
                            project.costestimate.labor.map(labor => {
                                if (labor.laborid === laborid) {
                                    validate = false;
                                }
                            })
                        }
                    }

                }


            }

        }

        return laborid;

    }

    materialid() {
        const design = new Design();
        let materialid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                materialid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("costestimate")) {
                        if (project.costestimate.hasOwnProperty("materials")) {
                            // eslint-disable-next-line
                            project.costestimate.materials.map(material => {
                                if (material.materialid === materialid) {
                                    validate = false;
                                }
                            })
                        }
                    }

                }


            }

        }

        return materialid;

    }


    equipmentid() {
        const design = new Design();
        let equipmentid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                equipmentid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("costestimate")) {
                        if (project.costestimate.hasOwnProperty("equipment")) {
                            // eslint-disable-next-line
                            project.costestimate.equipment.map(equipment => {
                                if (equipment.equipmentid === equipmentid) {
                                    validate = false;
                                }
                            })
                        }
                    }

                }


            }

        }

        return equipmentid;

    }

    specid() {
        const design = new Design();
        let specid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                specid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("specifications")) {
                        // eslint-disable-next-line
                        project.specifications.map(spec => {
                            if (spec.specid === specid) {
                                validate = false;
                            }
                        })
                    }


                }


            }

        }
        return specid;
    }

  

    contentid() {
        const design = new Design();
        let contentid = "";
        let validate = false;
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                contentid = makeID(16);
                validate = true;
                const project = design.getproject.call(this)
                if (project) {
                    const spec = design.getspecficationbycsi.call(this,project.projectid, this.props.match.params.csiid)
                
                    if (spec) {
                        // eslint-disable-next-line
                        if(spec.hasOwnProperty("paragraph")) {
                            spec.paragraph.list.map(list=> {
                                if(list.contentid === contentid) {
                                    validate = false;
                                }
                                
                                if(list.hasOwnProperty("sublist")) {
                                    list.sublist.list.map(sublist=> {
                                        if(sublist.contentid === contentid) {
                                            validate = false;
                                        }
                                        if(sublist.hasOwnProperty("sublist")) {
                                            sublist.sublist.list.map(sublist_1=> {
                                                if(sublist_1.contentid === contentid) {
                                                    validate = false;
                                                }

                                                if(sublist_1.hasOwnProperty("sublist")) {
                                                    sublist_1.sublist.list.map(sublist_2=> {
                                                        if(sublist_2.contentid === contentid) {
                                                            validate = false;
                                                        }

                                                        if(sublist_2.hasOwnProperty("sublist")) {
                                                            sublist_2.sublist.list.map(sublist_3=> {
                                                                
                                                                if(sublist_3.contentid === contentid) {
                                                                    validate = false;
                                                                }

                                                            })

                                                        
                                                        
                                                        }


                                                    
                                                    })

                                                }
                                            
                                            
                                            })
                                        }
                                    })
                                }





                            })
                        }
                        
                        
                    }


                }


            }

        }
        return contentid;
    }

    



}

export default MakeID;