const 정답 = "APPLE";

let index = 0; //숫자가 변할꺼라 let으로 변수선언
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:80px";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);

  // (2) 엔터기로직한줄 완료 후 다음 줄로 넘어가기
  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1; //attempts에 1을 더하라
    index = 0;
  };

  // (1) 엔터를 누르면 정답을 확인하는 함수 짜기
  const handleEnterKey = () => {
    //(3)맞은 개수 확인 후 종료시키기
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      //반복문 0,1,2,3,4 적용
      const block = document.querySelector(
        `.board-column[data-index="${attempts}${i}"]`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i]; // APPLE[0] = A, APPLE[1] = p
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
      // 콘솔에서 정답 확인 체크할때 사용 (없어도 되는 함수)
      console.log("입력한글자:", 입력한_글자, "정답글자:", 정답_글자);
    }

    if (맞은_갯수 === 5) gameover();
    else nextline(); // 한줄 함수가 끝나면 다음 라인으로 가거라 -> (2)
  };

  // 삭제키 로직 -> thisBloxk 에서 인덱스 1을 뺸것이 프리블록이다 -> 그 프리블록의 문자를 없앰
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //키보드를 누르면 이벤트를 확인한다, 이벤트 안에는 키보드 고유 키값, 키코드 존재
  const handlekeydown = (event) => {
    const key = event.key.toUpperCase(); //이벤트에서 키값(알파벳)을 불러온 후 대문자로 변환
    const keyCode = event.keyCode; //이벤트에서 코드갑 (알파벳은 65~90)을 불러옴

    //블럭하나당 고유 인덱스를 00~29를 가지므로 00 -> 01 올라갈수 있게 인덱스를 변수처리한다.
    //변수처리 -> 백틱사용 / $표시 및 중가로 사용
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );

    //백스페이스 작동하기
    // console.log(event.key,event.keycode);  -> 이벤트로그로 백스페이스 key, keycode 알아냄
    if (event.key === "Backspace") handleBackspace();
    //다섯번 입력되면 다음줄로 가게 코딩하기
    else if (index === 5) {
      //인덱스가 5가 되면
      if (event.key === "Enter")
        handleEnterKey(); //엔터키를 누르면 정답로직 실행
      else return; //5키를 다 눌렀는데 엔터키가 아닌 다른키를 누르면 함수 out
    } else if (65 <= keyCode && keyCode <= 90) {
      // 알파벳 키코드가 65(a) ~ 90(z) 이므로, 알파벡이 아닌 키보드는 입력 안되게 조건문 작성
      thisBlock.innerText = key;
      index += 1; //같은의미 -> index = index +1;  and  index++;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0"); //toString -> 문자로 바꿔주기  padStart(2, "0") -> 두자리로 표현 1->01
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`; //빽틱 사용 / padstart -> 자리수 맞춰주기 (01) but 문자만 가능 숫자로 인식하면 에러
    }
    //주기성 1초마다 실행
    timer = setInterval(setTime, 1000);
    console.log("timer:", timer);
  };

  startTimer();

  //keydown or up 키보드를 누를때 이밴트가 발생한다 -> 핸들키다운 이벤트 작동
  window.addEventListener("keydown", handlekeydown);
}

appStart();
