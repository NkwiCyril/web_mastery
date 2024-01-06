let arr = ["blue","red","yellow"]
let arr2 = ["blue","red"]

// let arrJSON = JSON.stringify(arr);
// let arr2JSON = JSON.stringify(arr2);

const checkAnswer = (a, b) => {
    a.length === b.length &&
    a.every((element, index) => element === b[index]);
    console.log(checkAnswer(arr,arr2))
}

checkAnswer()

