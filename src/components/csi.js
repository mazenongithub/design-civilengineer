import React from 'react';
import Design from './design';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { sortcode } from './functions';


class CSI {
    validatecsi(results, code) {
        let validate = true;
        if (results.length > 0) {
            // eslint-disable-next-line
            results.map(result => {
                if (result.csiid === code.csiid) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    getsearchresults() {
        const design = new Design();
        let csi_1 = this.state.csi_1;
        let csi_2 = this.state.csi_2;
        let csi_3 = this.state.csi_3;
        let searchcsi = "";
        let results = [];
        const validatecode = (results, code) => {

            let validate = true;
            if (results.hasOwnProperty("length")) {
                // eslint-disable-next-line
                results.map(result => {
                    if (result.csiid === code.csiid) {
                        validate = false;
                    }
                })
            }
            return validate;
        }
        if (csi_1) {
            searchcsi += csi_1.substr(0, 2)
        }
        if (csi_2) {
            searchcsi += csi_2.substr(0, 2)
        }
        if (csi_3) {
            searchcsi += csi_3.substr(0, 2)
        }

        if (searchcsi) {
            const codes = design.getallcsicodes.call(this)

            if (codes) {
             
                    // eslint-disable-next-line
                    codes.map(code => {

                        if (code.csi.startsWith(searchcsi)) {

                            if (validatecode(results, codes)) {
                                results.push(code)
                            }


                        }


                    })


            }

            results.sort((codeb, codea) => {

                return sortcode(codeb, codea)
            })

        }
        let myresults = [];
        // eslint-disable-next-line
        results.map(result => {
            if (validatecode(myresults, result)) {
                myresults.push(result)
            }
        })

        return myresults;
    }
    showcsiid(csi) {

        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const removeIconWidth = design.getremoveicon.call(this);
        const myuser = design.getuser.call(this)
        const csibackground = () => {
            if (this.state.activecsiid === csi.csiid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return;
            }
        }
        const checkcsi = () => {
            let csicheck = false;
            const mycsis = design.getallcsicodes.call(this);
            
            if (mycsis) {
                // eslint-disable-next-line
                mycsis.map(mycsi => {

                    if (mycsi.providerid=== myuser.providerid) {
                        csicheck = true;
                    }
                })
            }
            return csicheck;
        }

        const removeIcon = () => {

            if ( checkcsi()) {
                return (
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...removeIconWidth }} onClick={() => { this.removecsi(csi) }}>{removeIconSmall()} </button>
                    </div>
                )
            } else {
                return;
            }

        }
        return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont, ...csibackground() }} key={csi.csiid}>
            <div style={{ ...styles.flex5 }} onClick={() => { this.handlecsiid(csi.csiid) }}>
                {csi.csi} - {csi.title}
            </div>
            {removeIcon()}
        </div>)
    }
    showsearchresults() {
        const csi = new CSI();
        let results = csi.getsearchresults.call(this)

        let csiids = [];
        // eslint-disable-next-line
        results.map(code => {
            csiids.push(csi.showcsiid.call(this, code))

        })
        return csiids;
    }

    showCSI() {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const csi = new CSI();
        const activecsi = () => {
            if(this.state.activecsiid) {
            return(<div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont,...styles.redHighlight,...styles.showBorder }}>
                            {this.getcsiid()}
                        </div>
                    </div>)
            }
        }
        const heightLimit = () => {
            if (this.state.width > 1200) {
                return ({ maxHeight: '250px', overflow: 'scroll' })
            } else if (this.state.width > 800) {
                return ({ maxHeight: '200px', overflow: 'scroll' })
            } else {
                return ({ maxHeight: '150px', overflow: 'scroll' })
            }
        }

        const showcodes = () => {
            if (this.state.width > 800) {

                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>CSI</span>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.getcsi_1()}
                                onChange={event => { this.handlecsi_1(event.target.value) }}
                            />

                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.getcsi_2()}
                                onChange={event => { this.handlecsi_2(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_3}
                                onChange={event => { this.handlecsi_3(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_4}
                                onChange={event => { this.handlecsi_4(event.target.value) }}
                            />
                        </div>
                    </div>
                )


            } else {

                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>
                                CSI
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_1}
                                        onChange={event => { this.setState({csi_1:event.target.value})}}
                                    />

                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_2}
                                        onChange={event => { this.setState({csi_2:event.target.value})}}
                                    />
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_3}
                                        onChange={event => { this.setState({csi_3:event.target.value})}}
                                    />
                                </div>
                                <div style={{ ...styles.flex1 }}>

                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_4}
                                        onChange={event => { this.setState({csi_4:event.target.value})}}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                )

            }
        }
        return (
            <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Construction Specification
                        </div>
                    </div>

                    {showcodes()}


                    {activecsi()}

                    <div style={{ ...styles.generalContainer, ...heightLimit() }} className="hidescroll">
                        {csi.showsearchresults.call(this)}
                    </div>


                </div>
            </div>
        )

    }


}
export default CSI;