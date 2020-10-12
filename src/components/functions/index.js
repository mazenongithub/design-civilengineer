
export function CreateMaterial(materialid,engineerid,mymaterialid,milestoneid,csiid,timein,quantity,unit,unitcost,profit) {
    return({materialid,engineerid,mymaterialid,milestoneid,csiid, timein, quantity, unit, unitcost, profit})
}

export function check_31date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = ""
    if (!value) {
        errmsg += `Email Address is required `

    }


    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}


export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}


export function check_30date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyeardate(dateobj)  {

    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}


export function check_31(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear(timein)  {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}

export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}

export function getFirstIsOnDate(datein) {

    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}
export function getFirstIsOn(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}

export function monthstring(month) {

    
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function CreateEquipment(equipmentid,engineerid,myequipmentid,milestoneid,csiid,timein,timeout,equipmentrate,profit) {
    return({equipmentid,engineerid,myequipmentid,milestoneid,csiid, timein,timeout,equipmentrate, profit})
}
export function CreateLabor(laborid,engineerid,providerid,milestoneid,csiid,timein,timeout,laborrate, profit) {
    return({laborid,engineerid,providerid,milestoneid,csiid,timein,timeout,laborrate,profit})
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
    console.log(timein)
    //let timein = '2020-06-02 04:01 pm'
    const time = timein.substring(17,19)
    let hours = timein.substring(11,13);
    if(time === 'pm' && hours !== '12'){
     hours = Number(hours) + 12
    }
    if(time === 'am' && hours ==='12') {
        hours ='00n'
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
    const seconds = trailingZeros(datein.getSeconds())
    return (`${month}/${date}/${year} ${hours}:${minutes}:${seconds} ${ampm}`)

}

export function trailingZeros(num) {
    if (num < 10) {
        return (`0${num}`);
    } else {
        return num;
    }

}

export function RomanLower(num) {

    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return (Array(+digits.join("") + 1).join("M") + roman).toLowerCase();

}


export function getListNumber(listType,num,i) {
  
    let listnumber = "";
    switch(listType) {
        case "Part":
            return(PartNumber(num))
        case "1.01":
            return `${i}.${trailingZeros(num)}`
        case "A.B.C":
            return(`${LetterCounter(num)}.`)
        case "1.2.3":
            return(`${num}.`)
        case "a.b.c":
            return(`${LetterCounterLower(num)}.`)
        case "i.ii.iii":
            return (`${RomanLower(num)}.`)
        default:
            break;

    }
    return listnumber;
}

export function PartNumber(num) {
    return(`Part ${num}`)
}

export function LetterCounterLower(num) {

    const numericAlpha = (num) => {
        switch (Number(num)) {
            case 1:
                return 'a'
            case 2:
                return 'b'
            case 3:
                return 'c'
            case 4:
                return 'd'
            case 5:
                return 'e'
            case 6:
                return 'f'
            case 7:
                return 'g'
            case 8:
                return 'h'
            case 9:
                return 'i'
            case 10:
                return 'j'
            case 11:
                return 'k'
            case 12:
                return 'l'
            case 13:
                return 'm'
            case 14:
                return 'n'
            case 15:
                return 'o'
            case 16:
                return 'p'
            case 17:
                return 'q'
            case 18:
                return 'r'
            case 19:
                return 's'
            case 20:
                return 't'
            case 21:
                return 'u'
            case 22:
                return 'v'
            case 23:
                return 'w'
            case 24:
                return 'x'
            case 25:
                return 'y'
            case 26:
                return 'z'
            default:
                return ''

        }



    }

    let Zs = 0;
    let newnum = "";
    let Z = "";
    if (num > 26) {

        Zs = Math.floor(num / 26);

        for (let i = 0; i < Zs; i++) {

            Z += `z`

        }
        newnum = num % 26

    } else {
        newnum = num;
    }

    return `${Z}${numericAlpha(newnum)}`

}
export function LetterCounter(num) {

    const numericAlpha = (num) => {
        switch (Number(num)) {
            case 1:
                return 'A'
            case 2:
                return 'B'
            case 3:
                return 'C'
            case 4:
                return 'D'
            case 5:
                return 'E'
            case 6:
                return 'F'
            case 7:
                return 'G'
            case 8:
                return 'H'
            case 9:
                return 'I'
            case 10:
                return 'J'
            case 11:
                return 'K'
            case 12:
                return 'L'
            case 13:
                return 'M'
            case 14:
                return 'N'
            case 15:
                return 'O'
            case 16:
                return 'P'
            case 17:
                return 'Q'
            case 18:
                return 'R'
            case 19:
                return 'S'
            case 20:
                return 'T'
            case 21:
                return 'U'
            case 22:
                return 'V'
            case 23:
                return 'W'
            case 24:
                return 'X'
            case 25:
                return 'Y'
            case 26:
                return 'Z'
            default:
                return ''

        }



    }

    let Zs = 0;
    let newnum = "";
    let Z = "";
    if (num > 26) {

        Zs = Math.floor(num / 26);

        for (let i = 0; i < Zs; i++) {

            Z += `Z`

        }
        newnum = num % 26

    } else {
        newnum = num;
    }

    return `${Z}${numericAlpha(newnum)}`

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

export function isNumeric(val) {
 
    if(val) {
      return(!isNaN(val))
    } else {
     return(true);
    }
    
  
}
export function validateCSI(csi) {
const reg_ex = /^\d{2}$/;
return reg_ex.test(csi)
}

export function validateMinutes(min) {
    const reg_ex = /^[0-5][0-9]$/;
return(reg_ex.test(min));
}
export function  validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
return(reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
return(reg_ex.test(date));

}
export function validateMonth(mon) {
const reg_ex = /^0[1-9]|1[0-2]$/;
return(reg_ex.test(mon))
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

export function CreateBidItem(csiid,providerid,quantity,unit) {
    return({csiid,providerid,quantity,unit})
}
export function ProfitForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost)) * (Number(item.profit) / 100)
}
export function DirectCostForMaterials(item) {
    return (Number(item.quantity) * Number(item.unitcost))
}
export function DirectCostForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
}
export function DirectCostForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate))
}
export function ProfitForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate)) * (Number(item.profit) / 100)
}
export function ProfitForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate)) * (Number(item.profit) / 100)
}