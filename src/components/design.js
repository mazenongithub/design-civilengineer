import { sortpart,inputUTCStringForLaborID} from "./functions";
import {SaveSpecs} from './actions/api'

class Design {

    getcsibyid(csiid) {
        const design = new Design();
        const codes = design.getallcsicodes.call(this)
        let csi = false;
        if(codes) {
            // eslint-disable-next-line
            codes.map(code=> {
                if(code.csiid === csiid) {
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
        if(myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject=> {
                if(myproject.title ===title) {
                    project = myproject;

                }
            })
        }
        return project;
    }

    getcontentkeybyid(projectid,csiid,sectionid,contentid) {
        const design = new Design();
        const section = design.getsectionbyid.call(this,projectid,csiid,sectionid)
        let key = false;
        if(section) {
            
            if(section.hasOwnProperty("content")) {
                // eslint-disable-next-line
                section.content.map((content,i)=> {
                    if(content.contentid === contentid) {
                       key = i;
                    }
                })
            }
        }
        return key;
    }

    getcontentbyid(projectid,csiid,sectionid,contentid) {
        const design = new Design();
        const section = design.getsectionbyid.call(this,projectid,csiid,sectionid)
        let mycontent = false;
        if(section) {
            
            if(section.hasOwnProperty("content")) {
                // eslint-disable-next-line
                section.content.map(content=> {
                    if(content.contentid === contentid) {
                       mycontent = content;
                    }
                })
            }
        }
        return mycontent
    }

    getsubcontentkeybyid(projectid,csiid,sectionid,contentid,subcontentid) {
        const design = new Design();
        const content = design.getcontentbyid.call(this,projectid,csiid,sectionid,contentid)
        let key = false;
        if(content) {
            if(content.hasOwnProperty("subcontent")) {
                // eslint-disable-next-line
                content.subcontent.map((subcontent,i)=> {
                    if(subcontent.subcontentid === subcontentid) {
                       key = i;
                    }
                })
            }
        }
        return key;

    }

    getsubcontentbyid(projectid,csiid,sectionid,contentid,subcontentid) {
        const design = new Design();
        const content = design.getcontentbyid.call(this,projectid,csiid,sectionid,contentid)
        let mycontent = false;
        if(content) {
            if(content.hasOwnProperty("subcontent")) {
                // eslint-disable-next-line
                content.subcontent.map(subcontent=> {
                    if(subcontent.subcontentid === subcontentid) {
                        mycontent = subcontent;
                    }
                })
            }
        }
        return mycontent;

    }
    getsectionnumberbyid(projectid,csiid,sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this,projectid,csiid)
        let mycounter = "";
        if(spec.hasOwnProperty("sections")) {
            const section = design.getsectionbyid.call(this,projectid,csiid,sectionid)
            if(section) {
                let part = section.part;
            
            spec.sections.sort((b,a)=>{
              return sortpart(b,a)
            })
            
            let counter = 1;
            // eslint-disable-next-line
            spec.sections.map((section,i)=>{
                if(section.part === part) {
                   
                    if(section.sectionid === sectionid) {
                        mycounter = counter;
                    } else {
                        counter+=1;
                    }

                }

                

            })

        } 

    }
    if(Number(mycounter)<10) {
        mycounter = `0${mycounter}`
    }
    return mycounter;
    }

    getsectionbyid(projectid,csiid,sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this,projectid,csiid)
        let mysection = false;
        if(spec) {
            
            if(spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section=> {
                    if(section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }



    getsectionkeybyid(projectid,csiid,sectionid) {
        const design = new Design();
        const spec = design.getspecficationbycsi.call(this,projectid,csiid)
        let key = false;
        if(spec) {
            
            if(spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map((section,i)=> {
                    if(section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }

    getspecficationkeybycsi(projectid,csiid) {
        const design = new Design();
        const specs = design.getspecficationsbyprojectid.call(this,projectid)
        let key = false;
        if(specs) {
            // eslint-disable-next-line
            specs.map((spec,i)=> {
                if(spec.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getspecficationbycsi(projectid,csiid) {
        const design = new Design();
        const specs = design.getspecficationsbyprojectid.call(this,projectid)
        let myspec = false;
        if(specs) {
            // eslint-disable-next-line
            specs.map(spec=> {
                if(spec.csiid === csiid) {
                    myspec = spec;
                }
            })
        }
        return myspec;
    }
    getspecficationsbyprojectid(projectid) {
        const design = new Design();
        const myproject = design.getprojectbyid.call(this,projectid)
        let specifications = false;
        if(myproject.hasOwnProperty("specifications")) {
            specifications = myproject.specifications;
        }
        return specifications;
    }
    getprojectbykeyid(projectid) {
        const design = new Design();
        const myprojects = design.getprojects.call(this)
        let key = false;
        if(myprojects) {
            // eslint-disable-next-line
            myprojects.map((myproject,i)=> {
                if(myproject.projectid === projectid) {
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
        if(myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject=> {
                if(myproject.projectid === projectid) {
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
        if(myuser.hasOwnProperty("company")) {
            if(myuser.company.hasOwnProperty("projects")) {
                projects = myuser.company.projects;
            }
        }

return projects;
    }

    getsaveprojecticon() {
        if(this.state.width>1200) {
            return({width:'480px',height:'107px'}) 
        } else if (this.state.width>800) {
            return({width:'340px',height:'80px'}) 
        } else {
            return({width:'200px',height:'44px'}) 
        }
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    getuser() {
        let myuser = false;
        if(this.props.myusermodel) {
            if(this.props.myusermodel.hasOwnProperty("myuser")) {
                myuser = this.props.myusermodel.myuser;
            }
        }
        return myuser;
    }
    getallcsicodes() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let codes = false;
        if(myuser) {
            codes = myuser.csicodes;
        }
        return codes;
    }
    getRegularFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '36px' })
        } else if (this.state.width > 800) {
            return ({ fontSize: '30px' })
        } else {
            return ({ fontSize: '24px' })
        }
    }

    getHeaderFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '40px' })
        } else if (this.state.width > 800) {
            return ({ fontSize: '36px' })
        } else {
            return ({ fontSize: '30px' })
        }
    }

    async saveprojectspecs() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if(myuser) {
            const myproject = design.getprojectbytitle.call(this,this.props.match.params.title)
            if(myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this,myproject.projectid)
                const specs = design.getspecficationsbyprojectid.call(this,projectid)
                if(specs.hasOwnProperty("sections")) {
                    specs.sections.sort((b,a)=>{
                        return sortpart(b,a)
                    })
                }
                const values = {projectid, specs}
                console.log(values)
                try {
                let response = await SaveSpecs(values);
                if(response.hasOwnProperty("specifications")) {
                    myuser.company.projects[i].specifications = response.specifications;
                    this.props.reduxUser({myuser})
                    this.setState({render:'render'})
                    
                }
                if(response.hasOwnProperty("message") || response.hasOwnProperty("lastupdated")) {
                    const lastupdated = response.lastupdated;
                    let  message = " ";
                    if(response.hasOwnProperty("message")) {
                    message+=response.message
                    }
                    this.setState({message:`${message} last updated ${inputUTCStringForLaborID(lastupdated)}`})
                }

                } catch(err) {
                    alert(err)
                }
                
            }
        }
    }
}
export default Design;