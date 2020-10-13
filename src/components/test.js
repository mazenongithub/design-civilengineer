

movesectiondown(contentid) {
    const design = new Design();
    const myuser = design.getuser.call(this)
    if (myuser) {
        const myproject = design.getproject.call(this);
        if (myproject) {
            const projectid = myproject.projectid;
            const i = design.getprojectbykeyid.call(this, projectid)
            const csiid = this.props.match.params.csiid;
            const myspec = design.getspecficationbycsi.call(this, projectid, csiid);
            if (myspec) {
                const j = design.getspecficationkeybycsi.call(this, projectid, csiid)
                if (myspec.hasOwnProperty("sections")) {

                    const mysection = design.getsectionbyid.call(this, projectid, csiid, contentid)
                    if (mysection) {
                        let k = design.getsectionkeybyid.call(this, projectid, csiid, contentid)
                        if (k < myspec.paragraph.list.length - 1) {
                           
                            this.props.reduxUser({ myuser })
                            this.setState({ render: 'render' })
                        }
                    }

                }

            }
        }
    }

}