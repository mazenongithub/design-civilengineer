import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import {Link} from 'react-router-dom'
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ title: this.props.match.params.title })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const design = new Design();
        const myuser = design.getuser.call(this);
        const styles = MyStylesheet();
        const headerFont = design.getHeaderFont.call(this)
        if (myuser) {
            const myproject = design.getprojectbytitle.call(this, this.props.match.params.title)
            const profile  = myuser.profile;
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont }}>{myuser.profile}/projects/{this.props.match.params.title}</span>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={myproject.projectid}>
                                    <Link style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }} to={`/${profile}/projects/${myproject.title}/specifications`}>/{profile}/projects/{myproject.title}/specifications</Link>
                                </div>

                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                            </div>
                        </div>

                    </div>
                </div>




            )
        } else {
            return (<div>Login to view Project</div>)
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

export default connect(mapStateToProps, actions)(Project);