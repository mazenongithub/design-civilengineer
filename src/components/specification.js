import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Design from './design';
import { MyStylesheet } from './styles'
import { getListNumber, makeID } from './functions'
import { addIcon } from './svg';
// import { upArrowIcon, downArrowIcon, removeIconSmall,saveProjectSpecs } from './svg';
// import MakeID from './makeid'

class Specification extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activesectionid: false, title: '', part: "1", activecontentid: false, content: '' }
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

    makelistactive(contentid) {
      
        if (this.state.activecontentid === contentid) {
            this.setState({ activecontentid: false })
        } else {
            this.setState({ activecontentid: contentid })
        }
        
    }

    getlisttype(spec, contentid) {

        let listtype = spec;


        if (spec.hasOwnProperty("paragraph")) {


            if (spec.paragraph.hasOwnProperty("list")) {

                spec.paragraph.list.map(list => {

                    if (list.contentid === contentid) {

                        listtype = spec.paragraph.listType

                    }

                    if (list.hasOwnProperty("sublist")) {


                        if (list.sublist.hasOwnProperty("list")) {

                            list.sublist.list.map(sublist => {

                                if (sublist.contentid === contentid) {
                                    listtype = list.sublist.listType
                                }


                                if (sublist.hasOwnProperty("sublist")) {

                                    if (sublist.sublist.hasOwnProperty("list")) {

                                        sublist.sublist.list.map(sublist_1 => {

                                            if (sublist_1.contentid === contentid) {
                                                listtype = sublist.sublist.listType
                                            }




                                            if (sublist_1.hasOwnProperty("sublist")) {

                                                if (sublist_1.sublist.hasOwnProperty("list")) {

                                                    sublist_1.sublist.list.map(sublist_2 => {

                                                        if (sublist_2.contentid === contentid) {
                                                            listtype = sublist_1.sublist.listType
                                                        }

                                                        if (sublist_2.hasOwnProperty("sublist")) {

                                                            if (sublist_2.sublist.hasOwnProperty("list")) {

                                                                sublist_2.sublist.list.map(sublist_3 => {
                                                                    if (sublist_3.contentid === contentid) {
                                                                        listtype = sublist_2.sublist.listType

                                                                    }

                                                                })


                                                            }


                                                        }

















                                                    })


                                                }


                                            }














                                        })


                                    }


                                }


                            })


                        }


                    }



                })
            }



        }
        return listtype



    }

    handlelisttype(value) {
       
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getproject.call(this)
            if (project) {
                const i = design.getprojectbykeyid.call(this,project.projectid)
                const spec = design.getspecficationbycsi.call(this,project.projectid,this.props.match.params.csiid)
                if(spec) {
                  
                    const j = design.getspecficationkeybycsi.call(this,project.projectid,this.props.match.params.csiid)
                if (this.state.activecontentid) {
                    const list = this.getspecbyid(spec, this.state.activecontentid)
                    if (list) {
                        const speckeys = this.getspeckeybyid(spec,this.state.activecontentid)

                        if (list.hasOwnProperty("sublist")) {
                            if (speckeys.length === 1) {
                                let k = speckeys[0]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.listType = value
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            } else if (speckeys.length === 2) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.listType = value
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            } else if (speckeys.length === 3) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.listType = value
                                this.setState({ render: 'render' })
                            } else if (speckeys.length === 4) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                let n = speckeys[3]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist.listType = value
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            } else if (speckeys.length === 5) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                let n = speckeys[3]
                                let o = speckeys[4]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist.list[o].sublist.listType = value
                                this.props.reduxUser({ myuser })
                                this.setState({ render: 'render' })
                            }

                        } else {
                            // create new sublist
                            
                            const sublist = {listType:value,list:[{contentid:makeID(16),content:''}]}
                            if (speckeys.length === 1) {
                                let k = speckeys[0]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist = sublist;
                                this.props.reduxUser({ myuser })
                                this.setState({ activecontentid:sublist.list[0].contentid })
                            } else if (speckeys.length === 2) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist = sublist;
                                this.props.reduxUser({ myuser })
                                this.setState({ activecontentid:sublist.list[0].contentid })
                            } else if (speckeys.length === 3) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist = sublist;
                                this.setState({ activecontentid:sublist.list[0].contentid })
                            } else if (speckeys.length === 4) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                let n = speckeys[3]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist = sublist;
                                this.props.reduxUser({ myuser })
                                this.setState({ activecontentid:sublist.list[0].contentid })
                            } else if (speckeys.length === 5) {

                                let k = speckeys[0];
                                let l = speckeys[1];
                                let m = speckeys[2]
                                let n = speckeys[3]
                                let o = speckeys[4]
                                myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist.list[o].sublist = sublist;
                                this.props.reduxUser({ myuser })
                                this.setState({ activecontentid:sublist.list[0].contentid })
                            }






                        }
                    }


                } else {
                    // content id is not active event triggered by create new from existing spec
                    this.createnewspec(value)
                }
                } else {

                    this.createnewspec(value)
                }

            }

        }

    }

    createnewspec(listType) {

        const newspec = (listType) => {
            return({paragraph: {
                listType,
                list: [{
                        contentid: makeID(16),
                        content: ''}]
                }
            })
        }

     const design = new Design();
     const myuser = design.getuser.call(this)
     if(myuser) {
         const project = design.getproject.call(this)
         if(project) {
             const i = design.getprojectbykeyid.call(this,project.projectid)
             const newSpec = newspec(listType)
             console.log(myuser)
             const spec = design.getspecficationbycsi.call(this,project.projectid, this.props.match.params.csiid)
             if(spec) {
                 const j = design.getspecficationkeybycsi.call(this,project.projectid, this.props.match.params.csiid)

                if(!spec.hasOwnProperty("paragraph")) {
                   
                   
                    myuser.company.projects[i].specifications[j].paragraph = newSpec.paragraph;
                    this.props.reduxUser({myuser})
                    this.setState({activecontentid:newSpec.paragraph.list[0].contentid})
                    

                }

             } else {
                
                newSpec.csiid = this.props.match.params.csiid;
               
                if(myuser.company.projects[i].hasOwnProperty("specifications")) {
                   
                    myuser.company.projects[i].specifications.push(newSpec)
                } else {
                    myuser.company.projects[i].specifications  = newSpec;

                }

                this.props.reduxUser({myuser})
                this.setState({activecontentid:newSpec.paragraph.list[0].contentid})
                

             }
         }
     }


    }

    getlistvalue(spec) {
        let listvalue = "";
        if (this.state.activecontentid) {
            let content = this.getspecbyid(spec, this.state.activecontentid)
            console.log(content)
            if (content) {
                if (content.hasOwnProperty("sublist")) {
                    listvalue = content.sublist.listType
                }
            }
        }
        return listvalue;

    }

    showlisttypes(spec) {
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        const styles = MyStylesheet();
        const listWidth = { width: '326px' }
        return (
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont, ...styles.rightMargin15 }}> List Type</span>
                <select style={{ ...styles.generalFont, ...regularFont, ...listWidth, ...styles.generalPadding }}
                    value={this.getlistvalue(spec)}
                    onChange={event => { this.handlelisttype(event.target.value) }}>
                    <option value={false}>Select A List Type</option>
                    <option value="Part">Part 1</option>
                    <option value="1.01">1.01</option>
                    <option value="A.B.C">A.B.C</option>
                    <option value="1.2.3">1.2.3</option>
                    <option value="a.b.c">a.b.c</option>
                    <option value="i.ii.iii">i.ii.iii</option>
                </select>
            </div>)

    }

    handlelist(list, contentid) {
        console.log(list, contentid)
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {
            const project = design.getproject.call(this);
            if (project) {
                const i = design.getprojectbykeyid.call(this, project.projectid)
                const spec = design.getspecficationbycsi.call(this, project.projectid, this.props.match.params.csiid)
                if (spec) {
                    const j = design.getspecficationkeybycsi.call(this, project.projectid, this.props.match.params.csiid)

                    const speckeys = this.getspeckeybyid(spec, contentid);
                    console.log(speckeys)
                    if (speckeys.length === 1) {
                        let k = speckeys[0]

                        myuser.company.projects[i].specifications[j].paragraph.list[k].content = list;
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    } else if (speckeys.length === 2) {

                        let k = speckeys[0];
                        let l = speckeys[1];
                        myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].content = list
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    } else if (speckeys.length === 3) {

                        let k = speckeys[0];
                        let l = speckeys[1];
                        let m = speckeys[2]
                        myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].content = list
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    } else if (speckeys.length === 4) {

                        let k = speckeys[0];
                        let l = speckeys[1];
                        let m = speckeys[2]
                        let n = speckeys[3]
                        myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].content = list
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    } else if (speckeys.length === 5) {

                        let k = speckeys[0];
                        let l = speckeys[1];
                        let m = speckeys[2]
                        let n = speckeys[3]
                        let o = speckeys[4]
                        myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist.list[o].content = list
                        this.props.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }
                }


            }

        }

    }

    getspeckeybyid(spec, contentid) {
        console.log(contentid)
        let key = [];
        if (spec.hasOwnProperty("paragraph")) {

            if (spec.paragraph.hasOwnProperty("list")) {

                spec.paragraph.list.map((list, i) => {
                    if (list.contentid === contentid) {
                        key = [i]

                    }

                    if (list.hasOwnProperty("sublist")) {
                        if (list.sublist.hasOwnProperty("list")) {

                            list.sublist.list.map((sublist, j) => {

                                if (sublist.contentid === contentid) {

                                    key = [i, j]
                                }


                                if (sublist.hasOwnProperty("sublist")) {
                                    if (sublist.sublist.hasOwnProperty("list")) {

                                        sublist.sublist.list.map((sublist_1, k) => {

                                            if (sublist_1.contentid === contentid) {

                                                key = [i, j, k]
                                            }




                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                if (sublist_1.sublist.hasOwnProperty("list")) {

                                                    sublist_1.sublist.list.map((sublist_2, l) => {

                                                        if (sublist_2.contentid === contentid) {
                                                            key = [i, j, k, l]
                                                        }

                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                            if (sublist_2.sublist.hasOwnProperty("list")) {

                                                                sublist_2.sublist.list.map((sublist_3, m) => {

                                                                    if (sublist_3.contentid === contentid) {

                                                                        key = [i, j, k, l, m]
                                                                    }

                                                                })

                                                            }

                                                        }

                                                    })

                                                }

                                            }

                                        })


                                    }


                                }


                            })


                        }


                    }



                })
            }



        }
        return key


    }


    getspecbyid(spec, contentid) {
        let myspec = "";
        if (spec.hasOwnProperty("paragraph")) {

            if (spec.paragraph.hasOwnProperty("list")) {

                spec.paragraph.list.map(list => {
                    if (list.contentid === contentid) {
                        myspec = list

                    }

                    if (list.hasOwnProperty("sublist")) {
                        if (list.sublist.hasOwnProperty("list")) {

                            list.sublist.list.map(sublist => {

                                if (sublist.contentid === contentid) {
                                    myspec = sublist
                                }


                                if (sublist.hasOwnProperty("sublist")) {
                                    if (sublist.sublist.hasOwnProperty("list")) {

                                        sublist.sublist.list.map(sublist_1 => {

                                            if (sublist_1.contentid === contentid) {
                                                myspec = sublist_1
                                            }




                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                if (sublist_1.sublist.hasOwnProperty("list")) {

                                                    sublist_1.sublist.list.map(sublist_2 => {

                                                        if (sublist_2.contentid === contentid) {
                                                            myspec = sublist_2
                                                        }

                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                            if (sublist_2.sublist.hasOwnProperty("list")) {

                                                                sublist_2.sublist.list.map(sublist_3 => {

                                                                    if (sublist_3.contentid === contentid) {
                                                                        myspec = sublist_3
                                                                    }

                                                                })

                                                            }

                                                        }

                                                    })

                                                }

                                            }

                                        })


                                    }


                                }


                            })


                        }


                    }



                })
            }


        }
        console.log(myspec)
        return myspec;


    }

    getactivecontentid() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getproject.call(this);

            if (project) {
                const projectid = project.projectid;
                const spec = design.getspecficationbycsi.call(this, projectid, this.props.match.params.csiid)
                if (spec && this.state.activecontentid) {

                    return (this.getspecbyid(spec, this.state.activecontentid).content)

                }

            }


        }
    }

    addnewlist() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        if (myuser) {

            const project = design.getproject.call(this)
            if (project) {
                const i = design.getprojectbykeyid.call(this, project.projectid)
                const spec = design.getspecficationbycsi.call(this, project.projectid, this.props.match.params.csiid)
                if (spec) {
                    const j = design.getspecficationkeybycsi.call(this, project.projectid, this.props.match.params.csiid)
                    if (this.state.activecontentid) {
                        const content = this.getactivecontentid(spec, this.state.activecontentid)
                        if (content) {

                            const keys = this.getspeckeybyid(spec, this.state.activecontentid)
                            let k = false; let l = false; let m = false; let n = false; let o = false;
                            const contentid = makeID(16)
                            const newContent = { contentid, content: this.state.content }

                            switch (keys.length) {
                                case 1:
                                    k = keys[0]
                                    myuser.company.projects[i].specifications[j].paragraph.list.splice(k + 1, 0, newContent);
                                    this.props.reduxUser({ myuser })
                                    this.setState({ activecontentid: contentid, content:'' })
                                    break;
                                case 2:
                                    k = keys[0]
                                    l = keys[1]
                                    myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list.splice(l + 1, 0, newContent);
                                    this.props.reduxUser({ myuser })
                                    this.setState({ activecontentid: contentid, content: '' })
                                    break;
                                case 3:
                                    k = keys[0]
                                    l = keys[1]
                                    m = keys[2]
                                    myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list.splice(m + 1, 0, newContent);
                                    this.props.reduxUser({ myuser })
                                    this.setState({ activecontentid: contentid, content: '' })
                                    break;
                                case 4:
                                    k = keys[0]
                                    l = keys[1]
                                    m = keys[2]
                                    n = keys[3]
                                    myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list.splice(n + 1, 0, newContent);
                                    this.props.reduxUser({ myuser })
                                    this.setState({ activecontentid: contentid, content: '' })
                                    break;
                                case 5:
                                    k = keys[0]
                                    l = keys[1]
                                    m = keys[2]
                                    n = keys[3]
                                    o = keys[4]

                                    myuser.company.projects[i].specifications[j].paragraph.list[k].sublist.list[l].sublist.list[m].sublist.list[n].sublist.list.splice(0 + 1, 0, newContent);
                                    this.props.reduxUser({ myuser })
                                    this.setState({ activecontentid: contentid, content: '' })
                                    break;
                                default:
                                    break;
                            }




                        }

                    }

                }
            }
 

        }

    }



    showspecifications() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        const styles = MyStylesheet();
        if (myuser) {

            const project = design.getproject.call(this);


            if (project) {
                const projectid = project.projectid;
                const spec = design.getspecficationbycsi.call(this, projectid, this.props.match.params.csiid)
                if (spec) {

                    const activebackground = (contentid) => {
                        if (this.state.activecontentid === contentid) {

                            return { backgroundColor: '#D7A22A' }
                        }
                    }

                    const showlist = (contentid) => {
                        if (this.state.activecontentid === contentid) {
                            const listtype = this.getlisttype(spec, contentid)
                            console.log(listtype, contentid, spec)
                            const keys = this.getspeckeybyid(spec, contentid);
                            const mainkey = keys[keys.length - 1];
                            const width66 = () => {

                                return ({ width: '66%' })
                            }


                            let i = false;
                            if (keys.length > 1) {
                                i = keys[keys.length - 2];
                            }
                            const listnum = ` ${getListNumber(listtype, mainkey + 2, i + 1)} `
                            console.log(listnum, listtype)
                            const addicon = () => {

                                if (this.state.width > 1200) {
                                    return ({ width: '130px' })
                                } else if (this.state.width > 600) {
                                    return ({ width: '105px' })
                                } else {
                                    return ({ width: '80px' })
                                }

                            }
                            return (
                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1 }}>

                                        <div style={{ ...styles.generalFlex }}>
                                            <div style={{ ...styles.flex1 }}>
                                                <div style={{ ...styles.generalContainer, ...styles.marginTop10, ...styles.bottomMargin15 }}>
                                                    {this.showlisttypes(spec)}
                                                </div>

                                            </div>
                                        </div>

                                        <div style={{ ...styles.generalFlex }}>
                                            <div style={{ ...styles.flex1 }}>
                                                <span style={{ ...styles.generalFont, ...regularFont }}>
                                                    {listnum}
                                                </span>
                                                <input type="text"
                                                    value={this.state.content}
                                                    onChange={event => { this.setState({ content: event.target.value }) }}
                                                    style={{ ...styles.generalFont, ...regularFont, ...width66(), ...styles.generalPadding, ...styles.rightMargin15 }} />
                                                <button style={{ ...styles.generalButton, ...addicon() }} onClick={() => { this.addnewlist() }}>{addIcon()}</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            )
                        }


                    }


                    const showparagraph = () => {
                        let paragraphs = [];

                        if (spec.hasOwnProperty("paragraph")) {

                            if (spec.paragraph.hasOwnProperty("list")) {
                                // eslint-disable-next-line
                                spec.paragraph.list.map((list, i) => {

                                    const listtype_1 = () => {


                                        return (` ${getListNumber(spec.paragraph.listType, i + 1, false)} `)


                                    }

                                    const getlist = () => {



                                        if (this.state.activecontentid === list.contentid) {
                                            return (<div style={{ ...styles.generalContainer }}>
                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}> {listtype_1()}</span>
                                                <input type="text"
                                                    value={this.getactivecontentid()}
                                                    onChange={event => { this.handlelist(event.target.value, list.contentid) }}
                                                    style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid), ...styles.generalField }} />
                                                {showlist(list.contentid)}
                                            </div>)

                                        } else {
                                            return (<div style={{ ...styles.generalContainer }}>
                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid)}} onClick={() => { this.makelistactive(list.contentid) }}> {listtype_1()}</span>
                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}>{list.content}</span>
                                                {showlist(list.contentid)}
                                            </div>)
                                        }



                                    }

                                    paragraphs.push(getlist())



                                    if (list.hasOwnProperty("sublist")) {
                                        if (list.sublist.hasOwnProperty("list")) {
                                            // eslint-disable-next-line
                                            list.sublist.list.map((sublist, j) => {

                                                const listtype_2 = () => {

                                                    return (` ${getListNumber(list.sublist.listType, j + 1, i + 1)} `)
                                                }

                                                const getsublist = () => {
                                                    if (sublist.contentid === this.state.activecontentid) {
                                                        return (<div style={{ ...styles.generalContainer, ...styles.marginLeft30 }}>
                                                            <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}> {listtype_2()}</span>
                                                            <input type="text"
                                                                value={this.getactivecontentid()}
                                                                onChange={event => { this.handlelist(event.target.value, sublist.contentid) }}
                                                                style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid), ...styles.generalField }} />
                                                            {showlist(sublist.contentid)}
                                                        </div>)
                                                    } else {
                                                        return (<div style={{ ...styles.generalContainer, ...styles.marginLeft30 }}>
                                                            <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}> {listtype_2()}</span>
                                                            <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}>{sublist.content}</span>
                                                            {showlist(sublist.contentid)}
                                                        </div>)
                                                    }





                                                }

                                                paragraphs.push(getsublist())


                                                if (sublist.hasOwnProperty("sublist")) {
                                                    if (sublist.sublist.hasOwnProperty("list")) {
                                                        // eslint-disable-next-line
                                                        sublist.sublist.list.map((sublist_1, k) => {

                                                            const listtype_3 = () => {

                                                                return (` ${getListNumber(sublist.sublist.listType, k + 1, j + 1)} `)
                                                            }



                                                            const getsublist_1 = () => {
                                                                if (sublist_1.contentid === this.state.activecontentid) {
                                                                    return (<div style={{ ...styles.generalContainer, ...styles.marginLeft60 }}>
                                                                        <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}> {listtype_3()}</span>
                                                                        <input type="text"
                                                                            value={this.getactivecontentid()}
                                                                            onChange={event => { this.handlelist(event.target.value, sublist_1.contentid) }}
                                                                            style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid), ...styles.generalField }} />
                                                                        {showlist(sublist_1.contentid)}
                                                                    </div>)
                                                                } else {
                                                                    return (<div style={{ ...styles.generalContainer, ...styles.marginLeft60 }}>
                                                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}> {listtype_3()}</span>
                                                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}>{sublist_1.content}</span>
                                                                        {showlist(sublist_1.contentid)}
                                                                    </div>)
                                                                }


                                                            }



                                                            paragraphs.push(getsublist_1())


                                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                                if (sublist_1.sublist.hasOwnProperty("list")) {
                                                                    // eslint-disable-next-line
                                                                    sublist_1.sublist.list.map((sublist_2, l) => {

                                                                        const listtype_4 = () => {

                                                                            return (` ${getListNumber(sublist_1.sublist.listType, l + 1, k + 1)} `)
                                                                        }

                                                                        const getsublist_2 = () => {
                                                                            if (sublist_2.contentid === this.state.activecontentid) {
                                                                                return (<div style={{ ...styles.generalContainer, ...styles.marginLeft90 }}>
                                                                                    <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}> {listtype_4()}</span>
                                                                                    <input type="text"
                                                                                        value={this.getactivecontentid()}
                                                                                        onChange={event => { this.handlelist(event.target.value, sublist_2.contentid) }}
                                                                                        style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid), ...styles.generalField }} />
                                                                                    {showlist(sublist_2.contentid)}
                                                                                </div>)
                                                                            } else {
                                                                                return (<div style={{ ...styles.generalContainer, ...styles.marginLeft90 }}>
                                                                                    <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}> {listtype_4()}</span>
                                                                                    <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}>{sublist_2.content}</span>
                                                                                    {showlist(sublist_2.contentid)}
                                                                                </div>)
                                                                            }


                                                                        }



                                                                        paragraphs.push(getsublist_2())


                                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                                            if (sublist_2.sublist.hasOwnProperty("list")) {
                                                                                // eslint-disable-next-line
                                                                                sublist_2.sublist.list.map((sublist_3, m) => {

                                                                                    const listtype_5 = () => {

                                                                                        return (` ${getListNumber(sublist_2.sublist.listType, m + 1, k + 1)} `)
                                                                                    }

                                                                                    const getsublist_3 = () => {
                                                                                        if (sublist_3.contentid === this.state.activecontentid) {
                                                                                            return (<div style={{ ...styles.generalContainer, ...styles.marginLeft120 }}>
                                                                                                <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist_3.contentid) }} onClick={() => { this.makelistactive(sublist_3.contentid) }}> {listtype_5()}</span>
                                                                                                <input type="text"
                                                                                                    value={this.getactivecontentid()}
                                                                                                    onChange={event => { this.handlelist(event.target.value, sublist_3.contentid) }}
                                                                                                    style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid), ...styles.generalField }} />
                                                                                                {showlist(sublist_3.contentid)}
                                                                                            </div>)
                                                                                        } else {
                                                                                            return (<div style={{ ...styles.generalContainer, ...styles.marginLeft120 }}>
                                                                                                <span style={{ ...styles.generalFont, ...regularFont,...activebackground(sublist_3.contentid) }} onClick={() => { this.makelistactive(sublist_3.contentid) }}> {listtype_5()}</span>
                                                                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid) }} onClick={() => { this.makelistactive(sublist_3.contentid) }}>{sublist_3.content}</span>
                                                                                                {showlist(sublist_3.contentid)}
                                                                                            </div>)
                                                                                        }


                                                                                    }


                                                                                    paragraphs.push(getsublist_3())

                                                                                })


                                                                            }
                                                                        }



                                                                    })




                                                                }
                                                            }




                                                        })




                                                    }
                                                }



                                            })

                                        }





                                    }


                                })




                            }

                        }




                        return paragraphs;
                    }




                    return (
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                {showparagraph()}
                            </div>
                        </div>
                    )

                }

            }
        }

    }

    checkstartspec() {
        const design = new Design();
        const project = design.getproject.call(this);
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        if(project) {
            const projectid = project.projectid;
            const spec = design.getspecficationbycsi.call(this,projectid,this.props.match.params.csiid)
           console.log(spec)
            if(spec) {
                if(!spec.hasOwnProperty("paragraph")) {
                return(

                    <div style={{...styles.generalFlex}}>
                        <div style={{...styles.flex1}}>
                        <div style={{...styles.generalContainer}}>
                            <span style={{...styles.generalFont,...regularFont}}>Select A List Type To Start Spec</span>
                        </div>

                        {this.showlisttypes()}

                        </div>
                    </div>
                    
                    
                    )

                }
            } else {

                return(

                    <div style={{...styles.generalFlex}}>
                        <div style={{...styles.flex1}}>
                        <div style={{...styles.generalContainer}}>
                            <span style={{...styles.generalFont,...regularFont}}>Select A List Type To Start Spec</span>
                        </div>

                        {this.showlisttypes()}

                        </div>
                    </div>
                    
                    
                    )

            }
        }
    }

    render() {
        const design = new Design();
        const myuser = design.getuser.call(this)
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this);
        // const regularFont = design.getRegularFont.call(this)
        // const saveprojecticon = design.getsaveprojecticon.call(this);
        const csi = design.getcsibyid.call(this, this.props.match.params.csiid)
        if (myuser) {

            const companyid = () => {
                let id = false;
                if (myuser.hasOwnProperty("company")) {
                    id = myuser.company.companyid;
                }
                return id;

            }

            const project = design.getproject.call(this)
            if (project) {

                if (!project.hasOwnProperty("specifications")) {
                    design.loadspecifications.call(this, companyid(), project.projectid)
                }

                const csis = design.getallcsicodes.call(this);
                if (!csis) {
                    design.loadcsis.call(this, companyid())
                }

                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

        

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{this.props.match.params.title}</span> <br />
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /specifications</span> <br />
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}> {csi.csi} {csi.title}</span>
                            </div>
                        </div>

                        {this.checkstartspec()}

                        {this.showspecifications()}


                    </div>
                </div>)



            } else {

                // project not found
                return (<div>&nbsp;</div>)
            }

        } else {

            return (<div>Your are not logged in</div>)
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

export default connect(mapStateToProps, actions)(Specification);