
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Design from './design'
import {makeID} from './functions'
import {Link} from 'react-router-dom'
import CSI from './csi'
import { saveProjectSpecs } from './svg';


class Specifications extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csi_1: '', csi_2: '', csi_3: '', csi_4:'' }
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

  

    handlecsiid(csiid) {
        const design  = new Design()
        const specid = makeID(16);
        const csi = design.getcsibyid.call(this,csiid)
        let csi_1 = "";        let csi_2 = "";        let csi_3 = ""; let csi_4="";
        if(csi) {
         csi_1 = csi.csi.substr(0, 2)
         csi_2 = csi.csi.substr(2, 2)
         csi_3 = csi.csi.substr(4, 2);
        }
     
        if (csi.csi.length > 6) {
            csi_4 = csi.csi.substring(7, 9);
        }
        this.setState({ csi_1, csi_2, csi_3, csi_4 })
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
        const myproject = design.getproject.call(this)
        
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
        const saveprojecticon = design.getsaveprojecticon.call(this);
        const myuser = design.getuser.call(this)
        const regularFont = design.getRegularFont.call(this)
        if(myuser) {

            const companyid = () => {
                let companyid = false;
                if(myuser.hasOwnProperty("company")) {
                    companyid = myuser.company.companyid;
                }
                return companyid;

            }


            const project = design.getproject.call(this);
            if(project) {

                if(!project.hasOwnProperty("specifications")) {
                    design.loadspecifications.call(this, companyid(), project.projectid)
                }

          

            const csis = design.getallcsicodes.call(this);
            if(!csis) {
                design.loadcsis.call(this,companyid())
            }



        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                                
                                <span style={{...styles.headerFamily,...headerFont,...styles.boldFont}}>/{myuser.profile}</span> <br />
                                <span style={{...styles.headerFamily,...headerFont,...styles.boldFont}}>/{myuser.company.url}</span> <br />
                                <span style={{...styles.headerFamily,...headerFont,...styles.boldFont}}>/{project.title}</span> <br />
                                <span style={{...styles.headerFamily,...headerFont,...styles.boldFont}}>/specifications</span> <br />

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


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.generalFont }}>
                                {this.state.message}
                            </div>
                        </div>


                    <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { design.saveprojectspecs.call(this) }}>{saveProjectSpecs()}</button>
                            </div>
                        </div>






                </div>
            </div>)

        }

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