getphonenumber() {
    const design = new Design();
    const myuser = design.getuser.call(this)
    if(myuser) {
        return myuser.phonenumber;
    }

}
handlephonenumber(phonenumber) {
    const design = new Design();
    const myuser = design.getuser.call(this)
    if(myuser) {
         myuser.phonenumber = phonenumber;
         this.props.reduxUser({myuser})
         this.setState({render:'render'})
    }

}