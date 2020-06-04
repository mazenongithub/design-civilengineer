
export function CreateMaterial(materialid,mymaterialid,milestoneid,csiid,timein,quantity,unit,unitcost,profit) {
    return({materialid,mymaterialid,milestoneid,csiid, timein, quantity, unit, unitcost, profit})
}
export function CreateEquipment(equipmentid,myequipmentid,milestoneid,csiid,timein,timeout,equipmentrate,profit) {
    return({equipmentid,myequipmentid,milestoneid,csiid, timein,timeout,equipmentrate, profit})
}
export function CreateLabor(laborid,providerid,milestoneid,csiid,timein,timeout,laborrate, profit) {
    return({laborid,providerid,milestoneid,csiid,timein,timeout,laborrate,profit})
}
export function makeTimeString(year,month,day,hours,minutes,time) {
    return `${year}-${month}-${day} ${hours}:${minutes} ${time}`
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

export function AmmortizeFactor(i, n) {
    i = ((i / 1200));
    // let n = 80;

    const num = i * Math.pow((1 + i), n)

    const deno = Math.pow((1 + i), n) - 1;

    const factor = num / deno;

    return factor;
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
export function UTCTimeStringfromTime(timein) {
    //let timein = '2020-06-02 04:01 pm'
    const time = timein.substring(17,19)
    let hours = timein.substring(11,13);
    if(time === 'pm') {
     hours = Number(hours) + 12
    }
    const sym = () => {
      let myoffset = new Date().getTimezoneOffset()/60
      let sym = "+";
      if(myoffset > 0) {
        sym = "-"
      }
      return sym;
      
    }
    const extraoffset = () => {
     let myoffset = (new Date().getTimezoneOffset()/60)*2
    
      if(myoffset <10) {
        myoffset =`0${myoffset}`
      }
      return myoffset;
    }
    let minutes = timein.substring(14,16)
    let year = timein.substring(0,4)
    let month = timein.substring(5,7);
    let day = timein.substring(8,10)
    
    timein = `${year}/${month}/${day} ${hours}:${minutes}:00${sym()}${extraoffset()}:00`
    const newDate = new Date(timein)
    hours = newDate.getHours();
    if(hours < 10) {
      hours = `0${hours}`
    }
    minutes = newDate.getMinutes();
    if(minutes<10) {
      minutes = `0${minutes}`
    }
    year = newDate.getFullYear();
    day = newDate.getDate();
    if(day < 10) {
      day=`0${day}`
    }
    month = newDate.getMonth()+1;
    if(month<10) {
     month = `0${month}`
    }
   return( `${year}-${month}-${day} ${hours}:${minutes}:00`);
}

export function getAMPMfromTimeIn(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let hours = newDate.getHours();
    let ampm = "";
    if(hours > 12) {
      ampm ='pm'
     
    } else {
      ampm='am'
    }
    
    return(ampm); 
}


export function getMinutesfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
let  minutes = newDate.getMinutes();
if(minutes < 10) {
 minutes =`0${minutes}` 
}
return(minutes);
}
export function getHoursfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
let hours = newDate.getHours();
if(hours > 12) {
  hours = hours - 12;
 
}
if(hours < 10) {
 hours =`0${hours}` 
}
return(hours);

}
export function getYearfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
return newDate.getFullYear();

}
export function getDayfromTimein(timein) {
   //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let date = newDate.getDate();
    if(date <10) {
    date = `0${date}`
      
    }
    return date;
}
export function getMonthfromTimein(timein) {
    console.log(timein)
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
     let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`

    }
    console.log(timein, month)
    return month;
}

export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function formatDateStringDisplay(timein) {
    timein.replace(/-/g, '/')
    timein = timein.split('-')
    let year = "";
    let month = "";
    let day = "";

    if (timein.length === 3) {
        year = timein[0]
        month = timein[1]
        day = timein[2]
    }
    return (`${month}/${day}/${year}`)
}
export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes} ${ampm}`)

}
export function LetterCounter(i) {
    switch (Number(i)) {
        case 1:
            return 'A'
        case 2:
            return 'B'
        case 3:
            return 'C'

        default:
            break;
    }
}
export function sortpart(b, a) {
    if (Number(b.part) < Number(a.part)) {
        return -1

    } else {
        return 1;
    }

}
export function sortcode(codeb, codea) {

    //console.log(codea, codeb)
    if (Number(codea.csi) < Number(codeb.csi)) {

        return 1;
    }
    else if (Number(codeb.csi) < Number(codea.csi)) {

        return -1;
    }
    else {
        return 0;
    }
}
export function contentSubcontent(subcontentid, content) {
    return ({ subcontentid, content })
}
export function sectionContent(contentid, content) {
    return ({ contentid, content })
}
export function specSection(sectionid, part, title) {
    return ({ sectionid, part, title })
}

export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
    return totalhours;
}

export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function CreateCSI(csiid, providerid, csi, title) {
    return ({ csiid, providerid, csi, title })
}