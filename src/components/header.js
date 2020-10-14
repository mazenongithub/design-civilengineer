import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design'
import { menuIcon, blackx } from './svg'
import { Link } from 'react-router-dom'

class Header {


    shownavigation() {
        const styles = MyStylesheet();
        const design = new Design();
        const menuicon = design.getMenuicon.call(this)
        const headerFont = design.getHeaderFont.call(this)
        const getblackx = design.getblackx.call(this)
        const myuser = design.getuser.call(this)
        const loginlink = () => {
            if (myuser) {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div className="headerFont createlink" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} onClick={() => { design.logoutuser.call(this) }}>logout</div>
                    </div>)
            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/profile/login`}>/login</Link>
                </div>)
            }

        }

        const registerlink = () => {
            if (!myuser) {

                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/profile/register`}>/register</Link>
                </div>)
            }

        }
        const profilelink = () => {
            if (myuser) {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/${myuser.profile}/profile`}>/{myuser.profile}</Link>
                    </div>)
            }

        }

        const projectlink = () => {
            if (myuser.hasOwnProperty("company")) {
                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/${myuser.profile}/projects`}>/projects</Link>
                </div>)
            }

        }

        const csilink = () => {
            if (myuser.hasOwnProperty("company")) {
                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/${myuser.profile}/csis`}>/specs</Link>
                </div>)
            }

        }

        const companylink = () => {
            if (myuser.hasOwnProperty("company")) {
                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/${myuser.profile}/company`}>/{myuser.company.url}</Link>
                </div>)
            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    <Link className="headerFont" style={{ ...styles.generalLinkonly, ...styles.navigationFont, ...headerFont }} to={`/${myuser.profile}/company`}>/comany</Link>
                </div>)

            }

        }

       

        if (this.state.navigation) {
            return (<div style={{ ...styles.generalFlex, ...styles.navigation }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex5, ...styles.alignCenter }}>

                            

                            {profilelink()}
                            {companylink()}
                            {projectlink()}
                            {csilink()}
                            {loginlink()}
                            {registerlink()}
                        
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button className="createlink" style={{ ...getblackx, ...styles.navigationbutton }} onClick={() => { this.setState({ navigation: false }) }}>{blackx()}</button>

                        </div>
                    </div>


                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer }}>
                <button className="createlink"
                    style={{ ...styles.generalButton, ...menuicon }} onClick={() => { this.setState({ navigation: true }) }}>{menuIcon()}</button>

            </div>)
        }
    }

    showheader() {
        const styles = MyStylesheet();
        const design = new Design();
        const headerFont = design.getHeaderFont.call(this)
        const header = new Header();
        const largeFont = design.getLargeFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.topHeader }}>
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <span style={{ ...largeFont, ...styles.boldFont, ...styles.headerFamily }}>CIVILENGINEER.IO DESIGN</span>
                                </div>


                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                        <span style={{ ...headerFont, ...styles.headerFamily }}>Project Specifications</span>

                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                        <span style={{ ...headerFont, ...styles.headerFamily }}>Cost Estimating</span>

                                    </div>
                                </div>




                            </div>

                            {header.shownavigation.call(this)}

                        </div>
                    </div>




                </div>
            </div>
        )
    }
}
export default Header;