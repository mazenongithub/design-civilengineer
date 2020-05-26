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
export function sortpart(b,a) {
if(Number(b.part)<Number(a.part)) {
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

export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function CreateCSI(csiid,providerid,csi,title) {
    return({csiid, providerid, csi, title})
}