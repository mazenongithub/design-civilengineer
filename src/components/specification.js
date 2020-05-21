
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import { specSection, makeID, sectionContent, contentSubcontent, LetterCounter, sortpart } from './functions'
import { upArrowIcon, downArrowIcon, removeIconSmall } from './svg';


class Specification extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activesectionid: false, title: '', part: "1", activecontentid: false, content: '', activesubcontentid: false, subcontent: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showpart(section) {
        const design = new Design()
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)

        return (<div style={{ ...styles.generalFont, ...headerFont }} key={`${section.sectionid}part`}>Part {section.part} </div>)
    }

    makesubcontentactive(subcontentid) {
        if (this.state.activesubcontentid === subcontentid) {
            this.setState({ activesubcontentid: false })
        } else {
            this.setState({ activesubcontentid: subcontentid })
        }
    }
    makecontentactive(contentid) {
        if (this.state.activecontentid === contentid) {
            this.setState({ activecontentid: false, activesubcontentid: false })
        } else {
            this.setState({ activecontentid: contentid })
        }
    }

    makesectionactive(sectionid) {
        if (this.state.activesectionid === sectionid) {
            this.setState({ activesectionid: false, activecontentid: false, activesubcontentid: false })
        } else {
            this.setState({ activesectionid: sectionid })
        }
    }
    movesectionup(sectionid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {

                        const mysection = design.getsectionbyid.call(this, projectid, csiid, sectionid)
                        if (mysection) {
                            let k = design.getsectionkeybyid.call(this, projectid, csiid, sectionid)
                            if (k > 0) {
                                myuser.company.projects[i].specifications[j].sections[k] = myuser.company.projects[i].specifications[j].sections[k - 1]
                                myuser.company.projects[i].specifications[j].sections[k - 1] = mysection;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }
                        }

                    }

                }
            }
        }

    }
    removesection(sectionid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
    
                        const mysection = design.getsectionbyid.call(this, projectid, csiid, sectionid)
                        if (mysection) {
                            let k = design.getsectionkeybyid.call(this, projectid, csiid, sectionid)
                          
                                myuser.company.projects[i].specifications[j].sections.splice(k,1)
                               
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            
                        }
    
                    }
    
                }
            }
        }
    
    }

    movesectiondown(sectionid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {

                        const mysection = design.getsectionbyid.call(this, projectid, csiid, sectionid)
                        if (mysection) {
                            let k = design.getsectionkeybyid.call(this, projectid, csiid, sectionid)
                            if (k < myspec.sections.length - 1) {
                                myuser.company.projects[i].specifications[j].sections[k] = myuser.company.projects[i].specifications[j].sections[k + 1]
                                myuser.company.projects[i].specifications[j].sections[k + 1] = mysection;
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }
                        }

                    }

                }
            }
        }

    }
    showspecsection(section, i) {

        const design = new Design()
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        const project = design.getprojectbytitle.call(this, this.props.match.params.title)
        const projectid = project.projectid;
        const csiid = this.props.match.params.csiid;
        const sectionnumber = design.getsectionnumberbyid.call(this, projectid, csiid, section.sectionid);
        const getremoveicon = design.getremoveicon.call(this)
        return (<div style={{ ...styles.generalFont, ...headerFont }} key={`${section.sectionid}section`}><span onClick={() => { this.makesectionactive(section.sectionid) }}>{section.part}.{sectionnumber} {section.title} </span><button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movesectionup(section.sectionid) }}>{upArrowIcon()}</button> <button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movesectiondown(section.sectionid) }}>{downArrowIcon()}</button><button style={{ ...styles.generalButton, ...getremoveicon }} onClick={()=>{this.removesection(section.sectionid)}}>{removeIconSmall()}</button></div>)
    }

    movecontentup(contentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {
                                    if (content.contentid === contentid) {

                                        if (l < 0) {

                                            myuser.company.projects[i].specifications[j].sections[k].content[l] = myuser.company.projects[i].specifications[j].sections[k].content[l - 1]
                                            myuser.company.projects[i].specifications[j].sections[k].content[l - 1] = content
                                            this.props.reduxUser({ myuser })
                                            this.setState({ render: 'render' })
                                        }
                                    }
                                })

                            }
                        })




                    }

                }
            }
        }

    }

    removecontent(contentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {
                                    if (content.contentid === contentid) {

                                        myuser.company.projects[i].specifications[j].sections[k].content.splice(l, 1)
                                        this.props.reduxUser({ myuser })
                                        this.setState({ render: 'render' })

                                    }
                                })

                            }
                        })




                    }

                }
            }
        }

    }

    movecontentdown(contentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {
                                    if (content.contentid === contentid) {

                                        if (l < section.content.length - 1) {
                                            myuser.company.projects[i].specifications[j].sections[k].content[l] = myuser.company.projects[i].specifications[j].sections[k].content[l + 1]
                                            myuser.company.projects[i].specifications[j].sections[k].content[l + 1] = content
                                            this.props.reduxUser({ myuser })
                                            this.setState({ render: 'render' })
                                        }
                                    }
                                })

                            }
                        })




                    }

                }
            }
        }

    }

    showcontent(content, i) {
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const styles = MyStylesheet();
        const counter = LetterCounter(i + 1)
        const getremoveicon = design.getremoveicon.call(this)
        return (
            <div style={{ ...styles.generalFont, ...regularFont, ...styles.marginLeft30 }} key={content.contentid}>
                <span onClick={() => {
                    this.makecontentactive(content.contentid)
                }}>{counter}. {content.content}
                </span> <button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movecontentup(content.contentid) }}>{upArrowIcon()}</button> <button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movecontentdown(content.contentid) }}>{downArrowIcon()}</button><button style={{ ...styles.generalButton, ...getremoveicon }} onClick={() => { this.removecontent(content.contentid) }}>{removeIconSmall()}</button></div>
        )


    }

    movesubcontentup(subcontentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {

                                    if (content.hasOwnProperty("subcontent")) {
                                        // eslint-disable-next-line
                                        content.subcontent.map((subcontent, m) => {

                                            if (subcontent.subcontentid === subcontentid) {
                                                if (m > 0) {

                                                    myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m] = myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m - 1]
                                                    myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m - 1] = subcontent
                                                    this.props.reduxUser({ myuser })
                                                    this.setState({ render: 'render' })
                                                }

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

    movesubcontentdown(subcontentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {

                                    if (content.hasOwnProperty("subcontent")) {
                                        // eslint-disable-next-line
                                        content.subcontent.map((subcontent, m) => {

                                            if (subcontent.subcontentid === subcontentid) {
                                                if (m < content.subcontent.length - 1) {
                                                    myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m] = myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m + 1]
                                                    myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m + 1] = subcontent
                                                    this.props.reduxUser({ myuser })
                                                    this.setState({ render: 'render' })
                                                }

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

    removesubcontent(subcontentid) {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title);
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                    if (myspec.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        myspec.sections.map((section, k) => {
                            if (section.hasOwnProperty("content")) {

                                // eslint-disable-next-line
                                section.content.map((content, l) => {

                                    if (content.hasOwnProperty("subcontent")) {
                                        // eslint-disable-next-line
                                        content.subcontent.map((subcontent, m) => {

                                            if (subcontent.subcontentid === subcontentid) {

                                                myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent.splice(m, 1)
                                                this.props.reduxUser({ myuser })
                                                this.setState({ render: 'render' })


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

    showsubcontent(subcontent, j) {
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const styles = MyStylesheet();
        const getremoveicon = design.getremoveicon.call(this)

        return (<div style={{ ...styles.generalFont, ...regularFont, ...styles.marginLeft60 }} key={subcontent.subcontentid}
        ><span onClick={() => { this.makesubcontentactive(subcontent.subcontentid) }}>{j + 1}. {subcontent.subcontent} </span>  <button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movesubcontentup(subcontent.subcontentid) }}>{upArrowIcon()}</button> <button style={{ ...styles.smallbutton, ...styles.generalButton }} onClick={() => { this.movesubcontentdown(subcontent.subcontentid) }}>{downArrowIcon()}</button><button style={{ ...styles.generalButton, ...getremoveicon }} onClick={() => { this.removesubcontent(subcontent.subcontentid) }}>{removeIconSmall()}</button></div>)

    }
    handlesection(title) {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid)
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)



                    if (this.state.activesectionid) {
                        const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                        if (mysection) {
                            const k = design.getsectionkeybyid.call(this, projectid, csiid, this.state.activesectionid)
                            myuser.company.projects[i].specifications[j].sections[k].title = title
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })

                        }

                    } else {
                        const spec = design.getspecficationbycsi.call(this, projectid, csiid)
                        const specid = makeID(16);
                        const part = this.state.part;
                        const newSection = specSection(specid, part, title)
                        if (spec.hasOwnProperty("sections")) {
                            myuser.company.projects[i].specifications[j].sections.push(newSection);
                        } else {
                            myuser.company.projects[i].specifications[j].sections = [newSection]
                        }

                        this.props.reduxUser({ myuser })
                        this.setState({ activesectionid: specid })

                    }



                }

            }

        }

    }
    getcontent() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        let mycontent = "";
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            if (this.state.activesectionid) {
                const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                if (mysection.hasOwnProperty("content")) {
                    if (this.state.activecontentid) {
                        const content = design.getcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                        mycontent = content.content;
                    } else {
                        mycontent = this.state.content;
                    }
                }

            }

        }
        return mycontent;

    }

    getsubcontent() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        let mycontent = "";
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            if (this.state.activesectionid) {
                const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                if (mysection.hasOwnProperty("content")) {
                    if (this.state.activecontentid) {
                        const content = design.getcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                        if (content.hasOwnProperty("subcontent")) {
                            if (this.state.activesubcontentid) {
                                const subcontent = design.getsubcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid, this.state.activesubcontentid);
                                mycontent = subcontent.subcontent;
                            } else {
                                mycontent = this.state.subcontent;
                            }
                        }
                    }
                }

            }

        }
        return mycontent;

    }

    handlecontent(content) {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid)
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)

                    if (this.state.activesectionid) {
                        const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                        if (mysection) {

                            const k = design.getsectionkeybyid.call(this, projectid, csiid, this.state.activesectionid)


                            if (this.state.activecontentid) {
                                const mycontent = design.getcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                                if (mycontent) {
                                    const l = design.getcontentkeybyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                                    myuser.company.projects[i].specifications[j].sections[k].content[l].content = content
                                    this.props.reduxUser({ myuser })
                                    this.setState({ render: 'render' })

                                }

                            }


                            else {
                                const section = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                                const contentid = makeID(16);
                                const newContent = sectionContent(contentid, content)
                                if (section.hasOwnProperty("content")) {
                                    myuser.company.projects[i].specifications[j].sections[k].content.push(newContent);
                                } else {
                                    myuser.company.projects[i].specifications[j].sections[k].content = [newContent]
                                }

                                this.props.reduxUser({ myuser })
                                this.setState({ activecontentid: contentid })

                            }




                        }


                    }

                }

            }

        }

    }

    handlesubcontent(subcontent) {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid)
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)

                    if (this.state.activesectionid) {
                        const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                        if (mysection) {

                            const k = design.getsectionkeybyid.call(this, projectid, csiid, this.state.activesectionid)
                            if (mysection.hasOwnProperty("content")) {

                                if (this.state.activecontentid) {
                                    const mycontent = design.getcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                                    if (mycontent) {
                                        const l = design.getcontentkeybyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)

                                        if (this.state.activesubcontentid) {
                                            const m = design.getsubcontentkeybyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid, this.state.activesubcontentid)
                                            myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent[m].subcontent = subcontent
                                            this.props.reduxUser({ myuser })
                                            this.setState({ render: 'render' })

                                        } else {
                                            const content = design.getcontentbyid.call(this, projectid, csiid, this.state.activesectionid, this.state.activecontentid)
                                            const subcontentid = makeID(16);
                                            const newContent = contentSubcontent(subcontentid, content)
                                            if (content.hasOwnProperty("subcontent")) {
                                                myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent.push(newContent);
                                            } else {
                                                myuser.company.projects[i].specifications[j].sections[k].content[l].subcontent = [newContent]
                                            }

                                            this.props.reduxUser({ myuser })
                                            this.setState({ activesubcontentid: subcontentid })

                                        }



                                    }




                                }

                            }


                        }


                    }

                }

            }

        }

    }
    getsection() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            if (this.state.activesectionid) {
                const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                return mysection.title;
            } else {
                return this.state.title;
            }

        }
    }

    getpart() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            if (this.state.activesectionid) {
                const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                return mysection.part;
            } else {
                return this.state.part;
            }

        }
    }

    handlepart(part) {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        const myuser = design.getuser.call(this)
        if (myuser) {
            if (myproject) {
                const projectid = myproject.projectid;
                const i = design.getprojectbykeyid.call(this, projectid)
                const csiid = this.props.match.params.csiid;
                const myspec = design.getspecficationbycsi.call(this, projectid, csiid)
                if (myspec) {
                    const j = design.getspecficationkeybycsi.call(this, projectid, csiid)



                    if (this.state.activesectionid) {
                        const mysection = design.getsectionbyid.call(this, projectid, csiid, this.state.activesectionid)
                        if (mysection) {
                            const k = design.getsectionkeybyid.call(this, projectid, csiid, this.state.activesectionid)
                            myuser.company.projects[i].specifications[j].sections[k].part = part
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })

                        }

                    } else {
                        const spec = design.getspecficationbycsi.call(this, projectid, csiid)
                        const specid = makeID(16);
                        const title = this.state.title;
                        const newSection = specSection(specid, part, title)
                        if (spec.hasOwnProperty("sections")) {
                            myuser.company.projects[i].specifications[j].sections.push(newSection);
                        } else {
                            myuser.company.projects[i].specifications[j].sections = [newSection]
                        }

                        this.props.reduxUser({ myuser })
                        this.setState({ activesectionid: specid })

                    }



                }

            }

        }

    }

    showspecification() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
        let myspec = [];
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            const spec = design.getspecficationbycsi.call(this, projectid, csiid)



            if (spec) {



                if (spec.hasOwnProperty("sections")) {

                    spec.sections.sort((b, a) => {
                        return sortpart(b, a)
                    })

                    // eslint-disable-next-line
                    spec.sections.map((section, i) => {

                        if (i === 0) {
                            myspec.push(this.showpart(section))
                        } else if (section.part !== spec.sections[i - 1].part) {
                            myspec.push(this.showpart(section))
                        }

                        myspec.push(this.showspecsection(section, i))

                        if (section.hasOwnProperty("content")) {
                            // eslint-disable-next-line
                            section.content.map((content, i) => {
                                myspec.push(this.showcontent(content, i))

                                if (content.hasOwnProperty("subcontent")) {
                                    // eslint-disable-next-line
                                    content.subcontent.map((subcontent, j) => {
                                        myspec.push(this.showsubcontent(subcontent, j))
                                    })
                                }


                            })





                        }



                    })
                }

            }



        }
        return myspec;
    }

    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this);
        const regularFont = design.getRegularFont.call(this)
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                        /{this.props.match.params.title} <br />
                            Specifications <br />
                            CSI {this.props.match.params.csiid}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...regularFont }}>
                        <select value={this.getpart()} onChange={event => { this.handlepart(event.target.value) }}
                            style={{ ...regularFont, ...styles.generalFont, ...styles.width200, ...styles.generalPadding }}>
                            <option value="1"> Part 1</option>
                            <option value="2">Part 2</option>
                            <option value="3">Part 3</option>
                        </select>

                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...regularFont }}>
                        Section <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalPadding, ...styles.width80 }}
                            value={this.getsection()}
                            onChange={event => { this.handlesection(event.target.value) }}
                        />

                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...regularFont, ...styles.marginLeft30 }}>
                        Content <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalPadding, ...styles.width80 }}
                            value={this.getcontent()}
                            onChange={event => { this.handlecontent(event.target.value) }}
                        />

                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.marginLeft60 }}>
                    <div style={{ ...styles.flex1, ...regularFont }}>
                        Subcontent <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalPadding, ...styles.width80 }}
                            value={this.getsubcontent()}
                            onChange={event => { this.handlesubcontent(event.target.value) }}
                        />

                    </div>
                </div>

                {this.showspecification()}


            </div>
        </div>)
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Specification);