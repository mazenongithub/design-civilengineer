export async function DeleteCSI(values) {
    const csiid = values.csiid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${csiid}/deletecsi`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveCSI(values) {
    console.log(values)
    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/savecsi`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveCostEstimate(values) {
    console.log(values)
    const projectid = values.projectid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${projectid}/savecostestimate`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveProfile(profile) {
    const providerid = profile.providerid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${providerid}/saveprofile`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(profile)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}


export async function SaveSpecs(values) {
    const projectid = values.specs.projectid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${projectid}/saveprojectspecs`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function LogoutUser(providerid) {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${providerid}/logout`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}

export async function ClientLogin(values) {

    let APIURL = `https://civilengineer.io/design/api/loginclient.php`;
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function  CheckUser() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/checkuser`
    console.log(APIURL)

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}

export async function  AllCompanys() {

    let APIURL = `https://civilengineer.io/design/api/allcompanys.php?providerid=mazen`
    console.log(APIURL)

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadSpecifications(companyid,projectid) {


    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${companyid}/specifications/${projectid}`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}


export async function LoadCSIs(companyid) {


    let APIURL = `${process.env.REACT_APP_SERVER_API}/design/${companyid}/loadcsis`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function AppleLogin(values) {
   
    var APIURL = `${process.env.REACT_APP_SERVER_API}/design/applelogin`
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function CheckProviderID(profile) {

    var APIURL = `${process.env.REACT_APP_SERVER_API}/design/${profile}/checkproviderid`

    return fetch(APIURL, { credentials: 'include' })
        .then(resp => {

            if (!resp.ok) {
            
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                
            }

            return resp.json();
        })
}

export async function CheckEmailAddress(emailaddress) {


    var APIURL = `${process.env.REACT_APP_SERVER_API}/design/${emailaddress}/checkemailaddress`

    return fetch(APIURL, {
        credentials: 'include'

    })
        .then(resp => {

            if (!resp.ok) {

                let err = 'Request failed';
                throw err;

            }

            return resp.json();
        })
}