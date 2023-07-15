setAnswer();

function setAnswer(){
    let answer = '';
    while (answer.length < 3) {
        const randomNum = Math.floor(Math.random() * 10);
        if(!answer.includes(randomNum)) answer += randomNum;
    }
    let count = 0;
    console.log(`컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!`);
    getValue(answer, count);
}