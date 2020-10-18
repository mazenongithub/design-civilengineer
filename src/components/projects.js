import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import { Link } from 'react-router-dom'
import { plusIcon, minusIcon } from './svg'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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

    handleprojecticon(myproject) {
        const design = new Design();
        const activeproject = design.getactiveproject.call(this);
        const project = design.getprojectbyid.call(this, activeproject.projectid)
        if (project) {

            if (myproject.projectid === project.projectid) {
                this.props.reduxProject({ projectid: false })
                this.setState({ render: 'render' })
            } else {
                this.props.reduxProject({ projectid: myproject.projectid })
                this.setState({ render: 'render' })
            }

        } else {

            this.props.reduxProject({ projectid: myproject.projectid })
            this.setState({ render: 'render' })

        }
    }
    showproject(myproject) {
        const styles = MyStylesheet();
        const design = new Design();
        const myuser = design.getuser.call(this)
        const headerFont = design.getHeaderFont.call(this)
        if (myuser) {
            const profile = myuser.profile;
            const iconwidth = () => {
                if (this.state.width > 1200) {
                    return ({ width: '62px' })

                } else if (this.state.width > 600) {
                    return ({ width: '49px' })
                } else {
                    return ({ width: '36px' })
                }
            }

            const activeparams = design.getactiveproject.call(this);
            const project = design.getprojectbyid.call(this, activeparams.projectid)

            const getIcon = (project) => {
                if (project) {
                    if (project.projectid === myproject.projectid) {
                        return (minusIcon())
                    } else {
                        return (plusIcon())
                    }
                } else {
                    return (plusIcon())
                }

            }

            const active = (project) => {


                if (project) {
                    if (project.projectid === myproject.projectid) {

                        return (<div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                                <Link
                                    style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }}
                                    to={`/${profile}/projects/${myproject.title}/specifications`}>/specifications</Link>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <Link style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }} to={`/${profile}/projects/${myproject.title}/costestimate`}>/costestimate</Link>

                            </div>
                        </div>)

                    }

                }
            }
            return (

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...iconwidth() }} onClick={() => { this.handleprojecticon(myproject) }}>{getIcon(project)}</button>
                                <span style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }} >{myproject.title}</span>


                            </div>
                        </div>


                        {active(project)}


                    </div>
                </div>

                // <div style={{...styles.generalContainer,...styles.bottomMargin15}} key={myproject.projectid}>
                // 
                // </div>
            )
        }
    }

    showprojects() {
        const design = new Design();
        const myprojects = design.getprojects.call(this)
        const projects = [];
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                projects.push(this.showproject(myproject))
            })
        }
        return projects;
    }

    render() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)
        if (myuser) {
            if(myuser.hasOwnProperty("company")) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont }}>/{myuser.profile}</span> <br />
                                <span style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont }}>/{myuser.company.url}</span> <br/>
                                <span style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont }}>/projects</span>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                {this.showprojects()}
                            </div>
                        </div>



                    </div>
                </div>




            )

            } else {
                return (<div style={{...styles.generalContainer}}>
                    <span style={{...styles.generalFont, ...regularFont}}>Create A company to view projects </span>
                    </div>)

            }

        } else {
            return (<div style={{...styles.generalContainer}}>
            <span style={{...styles.generalFont, ...regularFont}}>Login to view Projects</span>
            </div>)
        }

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

export default connect(mapStateToProps, actions)(Projects);