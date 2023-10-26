let n = 5

for(let i=1; i < 2*n; i++) {

    let number = 1
    let character = 'A'
    
    let spatt = n >= i ? n-i : i-n
    let space = " ".repeat(spatt)

    let npatt = n >= i ? i : (2 * n) - i
    // let num = `${number}`.repeat(npatt)
    let num = ''
    for(let j=0; j < npatt; j++) {
        num += number
        number += 2
    }

    let cpatt = n >= i ? i - 1 : (2 * n) - i - 1
    // let char = `${character}`.repeat(cpatt)
    let char = ''
    for(let j=0; j < cpatt; j++) {
        char += String.fromCharCode(character.charCodeAt(0) + j);
    }

    console.log(space + num + char)
}