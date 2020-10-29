calculateequipmentratebyid(equipmentid, timein, timeout) {

    const dynamicstyles = new DynamicStyles();
    const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
    let equipmentrate = 0;
    if (myequipment.ownershipstatus === 'owned') {
        equipmentrate = dynamicstyles.calculateequipmentratebyownership.call(this, equipmentid)
    } else if (myequipment.ownershipstatus === 'rented') {
        equipmentrate = dynamicstyles.getequipmentrentalratebyid.call(this, equipmentid, timein, timeout)
    }
    return equipmentrate;

}

calculateequipmentratebyownership(equipmentid) {
    const dynamicstyles = new DynamicStyles();
    const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
    const i = (Number(myequipment.ownership.loaninterest) / 100) / 12;
    const workinghours = Math.round(Number(myequipment.ownership.workinghours) / 12);
    let equipmentrate = 0;

    const P = () => {
        let P = 0;
        const costs = dynamicstyles.getequipmentcostsbyid.call(this, myequipment.equipmentid)
        if (costs) {
            // eslint-disable-next-line
            costs.map(cost => {
                let n = calculateTotalMonths(myequipment.ownership.purchasedate, cost.timein);
                let F = Number(cost.cost)
                P += FutureCostPresent(i, n, F);

            })
        }
        return (P)
    }
    const Period = () => {
        let purchasedate = myequipment.ownership.purchasedate;
        let saledate = myequipment.ownership.saledate;
        if (purchasedate && saledate) {
            let totalmonths = calculateTotalMonths(purchasedate, saledate)
            return (totalmonths)
        } else {
            return 0;
        }

    }
    const AFactor = () => {
        const T = Period();
        const i = Number(myequipment.ownership.loaninterest);
    
        if (T) {
         
            return (AmmortizeFactor(i, T))
        } else {

            return 0;
        }

    }

    const totalworkinghours = () => {
        let annual = Number(myequipment.ownership.workinghours);
        let years = Period() / 12;

        return (Math.round(annual * years))
    }

    if (i > 0) {
        equipmentrate = (P() * AFactor()) / (workinghours);
    } else {
      
        equipmentrate = P() / (totalworkinghours())
    }

    return equipmentrate;
}


export function FutureCostPresent(i, n, F) {
    // let F=540;
    // let i=(.058/12);
    // let n = 40;
    return (F * (Math.pow((1 + i), n)))

}


export function calculateTotalMonths(purchasedate, saledate) {
    //     let purchasedate = '2018-05-24';
    // let saledate = '2025-01-24'
    const datePurchase = new Date(`${purchasedate.replace(/-/g, '/')} UTC`);
    const saleDate = new Date(`${saledate.replace(/-/g, '/')} UTC`);
    const datePurchaseYear = datePurchase.getFullYear();
    const purchaseMonth = datePurchase.getMonth() + 1;
    const saleDateYear = saleDate.getFullYear();
    const saleMonth = saleDate.getMonth() + 1;
    const yearsinterval = saleDateYear - datePurchaseYear;
    const monthInterval = saleMonth - purchaseMonth;
    const totalMonths = (yearsinterval) * 12 + monthInterval;
    return (totalMonths)
}

export function AmmortizeFactor(i, n) {
    i = ((i / 1200));
    // let n = 80;

    const num = i * Math.pow((1 + i), n)

    const deno = Math.pow((1 + i), n) - 1;

    const factor = num / deno;

    return factor;
}

getequipmentrentalratebyid(equipmentid, timein, timeout) {
    const dynamicstyles = new DynamicStyles();
    const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
    const hourlyrate = Number(myequipment.rentalrates.hour);
    const dailyrate = Number(myequipment.rentalrates.day);
    const weeklyrate = Number(myequipment.rentalrates.week);
    const monthlyrate = Number(myequipment.rentalrates.month);
    const rentalObj = getEquipmentRentalObj(timein, timeout);

    const hours = rentalObj.hours;
    const days = rentalObj.days;
    const weeks = rentalObj.weeks;
    const months = rentalObj.months;
    let rentalcost = (hourlyrate * hours) + (days * dailyrate) + (weeks * weeklyrate) + (months * monthlyrate);
    let totalhours = calculatetotalhours(timeout, timein);
    let rentalrate = rentalcost / totalhours;
    return rentalrate;

}



export function getEquipmentRentalObj(timein, timeout) {
    // let timein = '2021-03-06 17:52:33';
    // let timeout = '2021-04-17 19:52:33';

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    } else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    offset = `${sym}${offset}:00`
    let dateout = new Date(`${timeout.replace(/-/g, '/')} UTC`);
    let dateinYear = datein.getFullYear();
    let dateoutYear = dateout.getFullYear();
    let dateinMonth = datein.getMonth() + 1;
    let dateoutMonth = dateout.getMonth() + 1;
    let dateoutDate = dateout.getDate();
    let dateinDate = datein.getDate();
    let months = 0;
    let weeks = 0;
    let days = 0;
    let hours = 0;
    hours = (dateout.getTime() - datein.getTime()) / (1000 * 3600);


    if (dateoutYear !== dateinYear) {


        months += (dateoutYear - dateinYear) * 12;
        months += dateoutMonth - dateinMonth;
        if (dateoutDate < dateinDate) {
            months -= 1
        }
    } else if (dateoutMonth !== dateinMonth) {
        if (dateoutDate > dateinDate) {
            months += 1
        }
    }

    if (months > 0) {

        let monthCutoff = dateoutMonth;
        if (monthCutoff < 10) {
            monthCutoff = `0${monthCutoff}`
        }
        let dayCutoff = dateinDate
        if (dayCutoff < 10) {
            dayCutoff = `0${dayCutoff}`
        }
        let yearCutoff = dateoutYear
        let hourCutoff = datein.getHours()
        if (hourCutoff < 10) {
            hourCutoff = `0${hourCutoff}`
        }
        let minuteCutoff = datein.getMinutes();
        if (minuteCutoff < 10) {
            minuteCutoff = `0${minuteCutoff}`
        }
        let secondCutoff = datein.getSeconds();
        if (secondCutoff < 10) {
            secondCutoff = `0${secondCutoff}`
        }
        let cutDate = `${yearCutoff}-${monthCutoff}-${dayCutoff} ${hourCutoff}:${minuteCutoff}:${secondCutoff}`
        let cutOffDate = new Date(`${cutDate.replace(/-/g, '/')}${offset}`)
        let timecutoff = cutOffDate.getTime();
        hours = (dateout.getTime() - timecutoff) / (1000 * 3600)
    }


    if (hours > (24 * 7)) {
        weeks = Math.floor(hours / (24 * 7))
        hours = hours - (weeks * 24 * 7);
    }
    if (hours > 24) {
        days = Math.floor(hours / 24)
        hours = hours - (24 * days)
    }

    let obj = { hours, days, weeks, months }

    return (obj)
}


export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
    return totalhours;
}