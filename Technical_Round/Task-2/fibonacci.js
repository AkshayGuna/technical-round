// let num = prompt("Enter a number: ") // The "prompt" is run only in node.js server or browser
// let number = parseInt(number)

let number = 43

let res = [0,1]

let fibonacci = (num) => {
    let n1 = 0
    let n2 = 1

    let sum = 0
    let index = 2

    while(sum < num){
        sum = n1 + n2
        res[index] = sum
        index += 1
        n1 = n2
        n2 = sum
    }

    res.pop()

    return res
}

let result = fibonacci(number)
console.log(result.toString())