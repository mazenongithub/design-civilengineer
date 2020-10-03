
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import {makeID} from './functions'
import {Link} from 'react-router-dom'
import CSI from './csi'
import { LoadCSIs } from './actions/api';

class Specifications extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csi_1: '', csi_2: '', csi_3: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ title: this.props.match.params.title })
        const design = new Design();
       


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async loadcsis() {
       
        const design = new Design();
        const myuser = design.getuser.call(this)
        if(myuser) {
            if(myuser.hasOwnProperty("company")) {
                const companyid = myuser.company.companyid;
                const response = await LoadCSIs(companyid);
                console.log(response)
                if(response.hasOwnProperty("csicodes")) {
                    this.props.reduxCSIs(response.csicodes);
                    this.setState({render:'render'})
                }
            }
        }
    }

    

    handlecsiid(csiid) {
        const design  = new Design()
        const specid = makeID(16);
        const csi = design.getcsibyid.call(this,csiid)
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2);
        this.setState({ csi_1, csi_2, csi_3 })
        const newSpec = {specid,csiid}
        const myuser = design.getuser.call(this)
        if(myuser) {
        const myproject = design.getprojectbytitle.call(this,this.props.match.params.title)
        if(myproject) {
            const i = design.getprojectbykeyid.call(this,myproject.projectid)
            const specs = design.getspecficationsbyprojectid.call(this,myproject.projectid)
            if(specs) {
                myuser.company.projects[i].specifications.push(newSpec)

            } else {
                myuser.company.projects[i].specifications = [newSpec]
            }
            this.props.reduxUser({myuser})
            this.setState({render:'render'})
        }

    }

}
       

    getcsiid() {

    }

    showprojectspec() {

    }
    showspecification(spec) {
        const design = new Design();
        const csiid = spec.csiid;
        const csi = design.getcsibyid.call(this, csiid)
        const styles = MyStylesheet();
        const regularFont = design.getRegularFont.call(this)
        const profile = this.props.match.params.profile;
        const projectid = this.props.match.params.title;
        return (
        <div style={{ ...styles.generalContainer }}>
        <Link style={{...styles.generalFont, ...regularFont,...styles.generalLink}} to={`/${profile}/projects/${projectid}/specifications/${csi.csiid}`}>{csi.csi} - {csi.title}</Link>
        </div>
        )

    }
    showspecifications() {
        const design = new Design();
        const myproject = design.getprojectbytitle.call(this,this.props.match.params.title)
        let specids = [];
        if(myproject) {
        const specs = design.getspecficationsbyprojectid.call(this, myproject.projectid)
        
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                specids.push(this.showspecification(spec))
            })
        }
    }
        return specids;
    }

    render() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const csi = new CSI();

        const myuser = design.getuser.call(this)
        if(myuser) {

            const companyid = () => {
                let companyid = false;
                if(myuser.hasOwnProperty("company")) {
                    companyid = myuser.company.companyid;
                }
                return companyid;

            }

            const csis = design.getallcsicodes.call(this);
            if(!csis) {
                this.loadcsis(companyid())
            }

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                            /{this.props.match.params.title} <br />
                            Specifications
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {csi.showCSI.call(this)}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                            Project Specifications
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                            {this.showspecifications()}
                        </div>
                    </div>






                </div>
            </div>)

        }
          else {
        return(<div style={{...styles.generalContainer}}>
            <span>Please Login to View Specifications</span>
        </div>)
    }

}

}


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(Specifications);