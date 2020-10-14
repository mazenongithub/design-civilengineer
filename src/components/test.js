getcompanycontactstate() {
    const design = new Design();
    const myuser = design.getuser.call(this)
    let contactstate = "";
    if(myuser) {
        if(myuser.hasOwnProperty("company")) {
            contactstate = myuser.company.contactstate;
        }


    }
    return contactstate;

}

handlecompanycontactstate(contactstate) {

    const design = new Design();
    const myuser = design.getuser.call(this)
 
    if(myuser) {
        if(myuser.hasOwnProperty("company")) {
            myuser.company.contactstate = contactstate;
            this.props.reduxUser({myuser})
            this.setState({render:'render'})


        }
    }

}