import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import {Link} from 'react-router-dom'

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
    showproject(myproject) {
        const styles = MyStylesheet();
        const design = new Design();
        const myuser  = design.getuser.call(this)
        const headerFont = design.getHeaderFont.call(this)
        if(myuser) {
            const profile = myuser.profile;
        return(<div style={{...styles.generalContainer,...styles.bottomMargin15}} key={myproject.projectid}>
        <Link style={{...headerFont, ...styles.generalFont, ...styles.generalLink}} to={`/${profile}/projects/${myproject.title}`}>/{profile}/projects/{myproject.title}</Link>
        </div>)
        }
    }

    showprojects() {
        const design  = new Design();
        const myprojects = design.getprojects.call(this)
        const projects = [];
        if(myprojects) {
            // eslint-disable-next-line
            myprojects.map(myproject=> {
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
        if (myuser) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont }}>{myuser.profile}/projects</span>
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
            return (<div>Login to view Projects</div>)
        }

    }
}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Projects);