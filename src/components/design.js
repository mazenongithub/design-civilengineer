import { sortpart, inputUTCStringForLaborID } from "./functions";
import { SaveSpecs, ClientLogin, LogoutUser, SaveCSI } from './actions/api'
import firebase from 'firebase/app';
import 'firebase/auth';


class Design {

    getblackx() {
        if (this.state.width > 1200) {
            return ({ width: '49px', height: '49px' })
        } else if (this.state.width > 800) {
            return ({ width: '49px', height: '49px' })
        } else {
            return ({ width: '49px', height: '49px' })
        }
    }

    getappleicon() {

        if (this.state.width > 1200) {
            return ({ width: '373px', height: '88px' })
        } else if (this.state.width > 800) {
            return ({ width: '277px', height: '65px' })
        } else {
            return ({ width: '140px', height: '33px' })
        }


    }

    getgoogleicon() {

        if (this.state.width > 1200) {
            return ({ width: '365px', height: '87px' })
        } else if (this.state.width > 800) {
            return ({ width: '277px', height: '66px' })
        } else {
            return ({ width: '140px', height: '33px' })
        }

    }

    getMenuicon() {
        if (this.state.width > 1200) {
            return ({ width: '63px', height: '55px' })
        } else if (this.state.width > 800) {
            return ({ width: '63px', height: '55px' })
        } else {
            return ({ width: '63px', height: '55px' })
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

    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({ width: '480px', height: '107px' })
        } else if (this.state.width > 800) {
            return ({ width: '340px', height: '80px' })
        } else {
            return ({ width: '200px', height: '44px' })
        }
    }
    getremoveicon() {
        if (this.state.width > 800) {
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

        } else if (this.state.width > 800) {
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

        } else if (this.state.width > 800) {
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
    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 800) {
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
                    title: 'Design',
                    id: 'design',
                    url: 'http://civilengineer.io/design/slides/project.png',
                    caption: `Design By Civil Engineering`

                },
                {
                    title: 'Specifications',
                    id: 'specifications',
                    url: 'http://civilengineer.io/design/slides/specs.png',
                    caption: `Create Specfication by Project, Search Specification by code and select to add project`

                },
                {
                    title: 'Specification',
                    id: 'specification',
                    url: 'http://civilengineer.io/design/slides/spec.png',
                    caption: `Draft Project Specfication by Code`

                },

            ])
        }
        return slides();
    }
    getallcsicodes() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        let codes = false;
        if (myuser) {
            codes = myuser.csicodes;
        }
        return codes;
    }
    getsmallslide() {
        if (this.state.width > 1200) {
            return ({ width: '362px', height: '345px' })
        } else if (this.state.width > 800) {
            return ({ width: '254px', height: '241px' })
        } else {
            return ({ width: '178px', height: '169px' })
        }

    }
    getmainslide() {
        if (this.state.width > 1200) {
            return ({ width: '1087px', height: '1035px' })
        } else if (this.state.width > 800) {
            return ({ width: '762px', height: '725px' })
        } else {
            return ({ width: '356px', height: '339px' })
        }
    }
    getLargeFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '48px' })
        } else if (this.state.width > 800) {
            return ({ fontSize: '40px' })
        } else {
            return ({ fontSize: '36px' })
        }
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

    async savespecs() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (this.state.activecsiid) {
                const csis = design.getcsibyid.call(this, this.state.activecsiid)
                const values = { csis }
                const response = await SaveCSI(values);
         
                  if(response.hasOwnProperty("csis")) {
                      const csi = design.getcsibyid.call(this,response.csis.csiid)
                      if(csi) {
                          const i = design.getcsikeybyid.call(this,response.csis.csiid)
                      myuser.csicodes[i] = response.csis;
                      this.props.reduxUser({myuser})
                      this.setState({render:'render'})
                      }
                  }

            }

        }
        }

        async saveprojectspecs() {
            const design = new Design();
            const myuser = design.getuser.call(this)
            if (myuser) {
                const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
                if (myproject) {
                    const projectid = myproject.projectid;
                    const i = design.getprojectbykeyid.call(this, myproject.projectid)
                    const specs = design.getspecficationsbyprojectid.call(this, projectid)
                    if (specs.hasOwnProperty("sections")) {
                        specs.sections.sort((b, a) => {
                            return sortpart(b, a)
                        })
                    }
                    const values = { projectid, specs }
               
                    try {
                        let response = await SaveSpecs(values);
                        console.log(response)
                        if (response.hasOwnProperty("specifications")) {
                            myuser.company.projects[i].specifications = response.specifications;
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })

                        }
                        if (response.hasOwnProperty("message") || response.hasOwnProperty("lastupdated")) {
                            const lastupdated = response.lastupdated;
                            let message = " ";
                            if (response.hasOwnProperty("message")) {
                                message += response.message
                            }
                            this.setState({ message: `${message} last updated ${inputUTCStringForLaborID(lastupdated)}` })
                        }

                    } catch (err) {
                        alert(err)
                    }

                }
            }
        }

        async googleSignIn() {


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

             





            } catch (error) {
                alert(error)
            }


        }

        async appleSignIn() {
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
              

            } catch (err) {
                alert(err)
            }

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
        async clientlogin() {
            try {

                let client = this.state.client;
                let clientid = this.state.clientid;
                let firstname = this.state.firstname;
                let lastname = this.state.lastname;
                let emailaddress = this.state.emailaddress;
                let profileurl = this.state.profileurl;
                let phonenumber = this.state.phonumber;
                let profile = this.state.profile
                let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, profile }
                const response = await ClientLogin(values);
                console.log(response)
                this.props.reduxUser(response)
                this.setState({ render: 'render' })



            } catch (err) {
                alert(err)
            }
        }
    }
    export default Design;