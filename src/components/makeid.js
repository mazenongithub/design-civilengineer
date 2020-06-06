
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

    sectionid() {
        const design = new Design();
        let sectionid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                sectionid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("specifications")) {
                        // eslint-disable-next-line
                        project.specifications.map(spec => {
                            if (spec.hasOwnProperty("sections")) {
                                // eslint-disable-next-line
                                spec.sections.map(section => {


                                    if (section.sectionid === sectionid) {
                                        validate = false;
                                    }
                                })

                            }
                        })
                    }


                }


            }

        }
        return sectionid
    }

    contentid() {
        const design = new Design();
        let contentid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                contentid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("specifications")) {
                        // eslint-disable-next-line
                        project.specifications.map(spec => {
                            if (spec.hasOwnProperty("content")) {
                                // eslint-disable-next-line
                                spec.content.map(content => {
                                    if (content.contentid === contentid) {
                                        validate = false;
                                    }
                                })

                            }

                        })
                    }


                }


            }

        }
        return contentid;
    }

    subcontentid() {
        const design = new Design();
        let subcontentid = "";
        let validate = false
        const myuser = design.getuser.call(this);
        if (myuser) {

            while (!validate) {

                subcontentid = makeID(16);
                validate = true;
                const project = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (project) {
                    if (project.hasOwnProperty("specifications")) {
                        // eslint-disable-next-line
                        project.specifications.map(spec => {
                            if (spec.hasOwnProperty("content")) {
                                // eslint-disable-next-line
                                spec.content.map(content => {
                                    if (content.hasOwnProperty("subcontent")) {
                                        // eslint-disable-next-line
                                        content.subcontent.map(subcontent => {
                                            if (subcontent.subcontentid === subcontentid) {
                                                validate = false;
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
        return subcontentid;
    }




}

export default MakeID;