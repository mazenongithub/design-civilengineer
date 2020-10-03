import React from 'react';
import { MyStylesheet } from './styles';
import { appleID, googlesign } from './svg';
import Design from './design';
class ClientID {

    showclientid(type) {
        const styles = MyStylesheet();
        const design = new Design();
        const loginButton = design.getgoogleicon.call(this)
        const regularFont = design.getRegularFont.call(this)
        const signinmessage = () => {
            if (this.state.client && this.state.clientid) {
                return `Your Signin is secure with ${this.state.client}`
            } else {
                return `Secure your Sign in`
            }
        }
        const apple = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { design.appleSignIn.call(this, type) }}>
                        {appleID()}
                    </button>
                </div>
)
            }
        }
        const google = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { design.googleSignIn.call(this, type) }}>
                        {googlesign()}
                    </button>
                </div>)
            }
        }

        return (
            <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                <div style={{...styles.flex1}}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1,...styles.generalFont,...regularFont }}>
                            {signinmessage()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            {apple()}
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {google()}
                        </div>
                    </div>

                </div>



            </div>)
    }

}
export default ClientID;