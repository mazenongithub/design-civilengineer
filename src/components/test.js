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
    if (csi_1.length === 2) {
        searchcsi = csi_1.substr(0,2);
    }
    if (csi_2.length === 2) {
        searchcsi += csi_2.substr(0,2);
    }
    if (csi_3.length === 2) {
        searchcsi += csi_3.substr(0,2);
    }
    if(csi_4.length === 2) {
        searchcsi += csi_4.substr(0,2);    
    }

    if (searchcsi) {
        const codes = design.getallcsicodes.call(this)

        if (codes) {
            if (codes.hasOwnProperty("length")) {
                // eslint-disable-next-line
                codes.map(code => {

                    if (code.csi.startsWith(searchcsi)) {

                        if (validatecode(results, codes)) {
                            results.push(code)
                        }


                    }



                })

            }

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