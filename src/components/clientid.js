import React from 'react'
import {MyStylesheet} from './styles'
import Design from './design'
import {googlesign, appleID} from './svg'

class ClientID {

    showclientid() {
        const styles = MyStylesheet();
        const design = new Design()
        const regularFont = design.getRegularFont.call(this);
        const appleicon = design.getappleicon.call(this)
        const googleicon = design.getgoogleicon.call(this)
        return(<div style={{...styles.generalFlex, ...styles.bottomMargin15}}>
            <div style={{...styles.flex1}}>
                <span style={{...regularFont, ...styles.generalFont}}>Secure your Sign In</span>
            </div>
            <div style={{...styles.flex1}}>
                <button style={{...styles.generalButton,...appleicon}} onClick={()=>{design.appleSignIn.call(this)}}>{appleID()}</button>
            </div>
            <div style={{...styles.flex1}}>
            <button style={{...styles.generalButton,...googleicon}} onClick={()=>{design.googleSignIn.call(this)}}>{googlesign()}</button>
            </div>
        </div>)
    }
}
export default ClientID