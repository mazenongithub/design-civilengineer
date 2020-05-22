import React from 'react'
import {MyStylesheet} from './styles'
import Design from './design'

class EmailAddress {
    
    showemailaddress() {
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this)
        return(<div style={{...styles.generalFlex,...styles.bottomMargin15}}>
            <div style={{...styles.flex1}}>
                <span style={{...regularFont,...styles.generalFont}}>Email Address </span>
            </div>
            <div style={{...styles.flex2}}>
                <input type="text" style={{...regularFont,...styles.generalFont}}
                value={this.state.emailaddress} 
                    onChange={event=>{this.setState({emailaddress:event.target.value})}}
                />
            </div>
        </div>)
    }

}
export default EmailAddress;