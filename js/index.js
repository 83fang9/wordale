const 정답 = "APPLE";

let index = 0;   //숫자가 변할꺼라 let으로 변수선언
let attempts = 0;

function appStart() {
    //엔터를 누르면 정답을 확인하는 함수 짜기
    const handleEnterKey = () => {
        for (let i=0; i<5; i++) {    //반복문 0,1,2,3,4 적용
            const block = document.querySelector (`.board-column[data-index="${attempts}${i}"]`);
            
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];  // APPLE[0] = A, APPLE[1] = p
            console.log('입력한글자:',입력한_글자,'정답글자:',정답_글자);
        }  

    };
    
    //키보드를 누르면 이벤트를 확인한다, 이벤트 안에는 키보드 고유 키값, 키코드 존재
    const handlekeydown = (event) => {    

        const key = event.key.toUpperCase();  //이벤트에서 키값(알파벳)을 불러온 후 대문자로 변환 
        const keyCode = event.keyCode;        //이벤트에서 코드갑 (알파벳은 65~90)을 불러옴 

        //블럭하나당 고유 인덱스를 00~29를 가지므로 00 -> 01 올라갈수 있게 인덱스를 변수처리한다.
        //변수처리 -> 백틱사용 / $표시 및 중가로 사용
        const thisBlock = document.querySelector (`.board-column[data-index="${attempts}${index}"]`);
        
        if (index === 5) { //인덱스가 5가 되면 
            if (event.key === 'Enter')  handleEnterKey() ; //엔터키를 누르면 정답로직 실행 
            else return;  //5키를 다 눌렀는데 엔터키가 아닌 다른키를 누르면 함수 out  
        }  else if (65 <= keyCode && keyCode <= 90) {   // 알파벳 키코드가 65(a) ~ 90(z) 이므로, 알파벡이 아닌 키보드는 입력 안되게 조건문 작성
            thisBlock.innerText = key;
            index += 1;  //같은의미 -> index = index +1;  and  index++;
        };                
    };

    window.addEventListener("keydown", handlekeydown)

}

appStart();