const readline = require('readline');
//node는 터미널에서 상호작용(입력을 받는것)을 하기 위해 "readline"이란 모듈이 필요하고,
//리드라인 모듈을 불러오기 위해서는 require을 사용해요. 

let computerNumbers = [];
//컴퓨터에서 랜덤으로 숫자를 생성해야하니까 변수명을 "컴퓨터넘버"로 지정했어요. 

function generateRandomNumbers() {
  computerNumbers = [];
//이전에 저장된 숫자들을 제거하고, 새로운 숫자를 생성하기 위해 "컴퓨터넘버"를 초기화 했어요. 
// ' =[]; ' 를 입력하면 초기화되어요.
  while (computerNumbers.length < 3) { //length는 배열이나 문자열의 길이를 나타내는 정수값이에요. 즉, 'length < 3'는 길이가 3보다 작다는 것이에요.
    const randomNumber = Math.floor(Math.random() * 10); //'Math.random()'은 0이상 1미만의 난수를 반환해요. 여기서 10을 곱해 0 이상 10 미만의 임의의 수를 얻어요.
    //'Math.floor'는 소수점 이하를 버리기 위해 사용했어요. 
    if (!computerNumbers.includes(randomNumber)) { //'includes()' 메서드는 배열이 특정 요소를 포함하고 있는지 확인하는거에요.
      //'!'을 넣었기때문에 포함되어있지 않은 경우에만 만족하는 조건이에요. 
      computerNumbers.push(randomNumber); // 만약 randomNumber가 "컴퓨터넘버" 배열에 포함되어 있지 않은 경우
      // push(randomNumber)를 통해 "컴퓨터넘버" 배열에 (서로 다른 숫자 3개를 생성)추가해요.
      // push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하는 역할이에요.
    }
  }
}

function calculateScore(userGuess) { //함수명을 "calculateScore"로 정하고, 매게변수를 "userGuess"로 정했어요.
  // 함수를 호출할 때 매개변수를 전달하여 함수 내부에서 활용할 수 있어요.
  const userNumbers = userGuess.split('').map(Number); //split('') 메서드는 문자열을 각각의 문자로 분할하여 배열로 만들어요.
  // ex) userGuess가 "123"이라면, split('')을 사용하면 ['1', '2', '3']와 같은 배열이 생성 되어요.

  //map(Number)는 배열의 각 요소를 변환하는 메서드에요. 여기서는 각 문자를 숫자로 변환하고자 사용했어요.
  
  let strikes = 0;
  let balls = 0;
  // 개수를 나타내는 변수인 strikes, balls를 0으로 초기화 했어요.
  // 초기화하지 않은 변수는 값이 할당되지 않아서 정의되지 않은(undefined) 상태라서 예기지 않은 동작이 발생할 수도 있기 때문이에요.

  for (let i = 0; i < userNumbers.length; i++) {
    if (userNumbers[i] === computerNumbers[i]) {
    //'===' 인덱스(i)에 해당하는 userNumbers와 omputerNumber의 값과 위치까지 일치하는지를 확인하는 조건문이에요.
      strikes++; //값과 위치가 일치하는 경우 스트라이크(strikes)의 개수를 1씩 증가해요.
    } else if (computerNumbers.includes(userNumbers[i])) {
    // 인덱스(i)에 해당하는 사용자의 숫자가 컴퓨터의 숫자 배열에 포함되어 있는지를 확인하는 조건문이에요.
      balls++; //숫자 배열에 포함되어 있지만 위치는 다른 경우 볼(balls)의 개수를 1씩 증가해요.
    }
  }

  return [strikes, balls];
}

function playGame() {
  generateRandomNumbers();
  let attempts = 0;

  console.log('컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!');
  // 사용자에게 컴퓨터가 숫자를 생성했음을 알리고, 게임을 시작하라는 메시지를 콘솔에 출력해요.

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function guessNumbers() {
    rl.question(`${attempts + 1}번째 시도: `, userGuess => {
      const [strikes, balls] = calculateScore(userGuess);

      console.log(`${balls}B${strikes}S`);

      if (strikes === 3) {
        console.log(`게임을 종료합니다. ${attempts + 1}번만에 맞히셨습니다.`);
        rl.close();
      } else {
        attempts++;
        guessNumbers(); //조건문이 거짓인 경우(스트라이크의 개수가 3이 아닌 경우), attempts 변수를 증가시키고(attempts++), 다시 guessNumbers() 함수를 호출해요.
      }
    });
  }

  guessNumbers();
}

playGame();




