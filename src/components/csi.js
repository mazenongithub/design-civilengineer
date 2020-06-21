import React from 'react';
import Design from './design';
import { MyStylesheet } from './styles';
import { removeIconSmall, saveIcon } from './svg';
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
        let csi_4 = this.state.csi_4;
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
        if (csi_1.length>1) {
            searchcsi += csi_1.substr(0, 2)
        
        if (csi_2.length>1) {
            searchcsi += csi_2.substr(0, 2)
        
        if (csi_3.length>1) {
            searchcsi += csi_3.substr(0, 2)
        
            if(csi_4.length>1) {
                searchcsi += `.${csi_4.substr(0, 2)}`
            }
        
        }


    }

    }

        if (searchcsi.length >1) {
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
        const getsaveicon = design.getsaveicon.call(this)
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
            if(this.state.activecsiid) {
            const mycsi = design.getcsibyid.call(this,this.state.activecsiid)
            
            if (mycsi) {       

                    if (mycsi.providerid === myuser.providerid) {
                        csicheck = true;
                    }
              
            }

        }
            return csicheck;
        }

        const updateIcon = () => {
            

            if ( checkcsi()) {
                return (
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...getsaveicon }} onClick={() => { design.savespecs.call(this) }}>{saveIcon()} </button>
                    </div>
                )
            } else {
                return;
            }

        }

        const removeIcon = () => {
            

            if ( checkcsi()) {
                return (
                    <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...removeIconWidth }} onClick={() =>{ design.deletecsi.call(this)}}>{removeIconSmall()} </button>
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
            {updateIcon()}
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
         

                return (

                    <div style={{ ...styles.generalFlex, ...styles.csiContainer  }}>
                        <div style={{ ...styles.flex1, ...styles.csiContainer }}>

                            <div style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer }}>
                                CSI
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1,...styles.addMargin }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_1}
                                        onChange={event => { this.setState({csi_1:event.target.value})}}
                                    />

                                </div>
                                <div style={{ ...styles.flex1,...styles.addMargin }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_2}
                                        onChange={event => { this.setState({csi_2:event.target.value})}}
                                    />
                                </div>
                                <div style={{ ...styles.flex1,...styles.addMargin }}>
                                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                        value={this.state.csi_3}
                                        onChange={event => { this.setState({csi_3:event.target.value})}}
                                    />
                                </div>
                                <div style={{ ...styles.flex1,...styles.addMargin }}>

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
        return (
            <div className="hidescroll" style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

              
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