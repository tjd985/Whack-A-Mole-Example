# Whack-A-Mole
### - 게임 시작
![start-whack-a-mole](https://github.com/tjd985/Whack-A-Mole-Example/assets/48385389/f85369f6-be0d-453d-94b9-ee6d2f66d75c)

### - 게임 재시작
![restart-whack-a-mole](https://github.com/tjd985/Whack-A-Mole-Example/assets/48385389/183f8172-9757-4e59-ada1-a728c29fc550)
<br/><br/><br/>

# 1. 프로젝트 설명
vanilla JS로 구현한 두더지잡기 게임
<br/><br/><br/>

# 2. To-Do-List
1. 9개의 두더지 구멍이 처음 화면에 나와야 합니다.
2. 게임을 시작하는 "시작" 버튼이 있어야 합니다.
3. 게임이 시작되면 1초 후부터 두더지가 구멍에서 랜덤하게 나와야 합니다.
4. 두더지가 나타난 곳을 클릭할 경우, 두더지를 잡은 것으로 간주합니다.
5. 두더지가 나타난 구멍을 사용자가 3초 내에 클릭하지 않을 경우, 두더지를 잡지 못한 것으로 간주합니다.
6. 사용자가 두더지를 잡거나 제한 시간(3초)이 초과되었을 경우,
    1초의 추가 간격을 두고 또 다시 랜덤한 두더지 구멍에서 두더지가 나와야 합니다.
7. 다음 번에 두더지가 등장하는 구멍은 이전의 구멍과는 반드시 다른 구멍이야 합니다.
8. 사용자가 두더지를 잡을 수 있는 기회는 10번으로 제한합니다.
9. 10번의 시도가 끝난 후에는 (잡은 두더지 숫자 /10) X 100 으로 계산하여
    사용자의 점수를 화면에 표기해주어야 합니다. 예) 70점
11. 점수가 표기된 후, 사용자에게는 "재시작" 버튼이 나타나야 합니다.
12. "재시작" 버튼을 누를 경우, 다시 게임이 시작되어야 합니다.
<br/><br/><br/>

# 3. 프로젝트 사용 언어
<img src="https://img.shields.io/badge/JavaScript-gray?style=flat&logo=JavaScript&logoColor=F7DF1E"/>
<br/><br/><br/>

# 4. 어려웠던 점
1. 이벤트 핸들러 함수에 event객체 말도 다른 데이터는 argument로 보낼수는 없을까?<br/>
`addEventListener`를 사용할때 이벤트 핸들러 함수에 `event객체`와, `moleEls[randomNum]`을 인자로 넘기고 싶어서<br/>
빈 익명 함수의 콜백함수로 이벤트 핸들러 함수를 넣어주었던 것이 화근이 되었음.
```javascript
tableEl.addEventListener("click", (event) => {
    catchMole(event, moleEls[randomNum])
});
```
이렇게 작성을 했더니, 내가 원하던대로 작동을 하지 않았음.<br/>
이러면 JS 파일을 읽어내려가는 순간 익명 화살표함수가 실행되기 때문 이었음.<br/>
그래서 어떻게 하면 `event객체`말고 다른 argument(`moleEls[randomNum]`)를 이벤트 핸들러 함수에 넘길 수 있을까 고민을 했음.<br/>
그래서 떠오른 방법은 이벤트 핸들러 함수를 `moleEls[randomNum]`가 선언된 렉시컬 환경에 구현을 하는 방법이었음<br/>
그렇다면 closure를 이용하여 핸들러 함수에서 `moleEls[randomNum]`를 인자로 넘겨주지 않아도 사용이 가능하기 때문임.<br/>
그러나, 함수 내부에 다른 함수를 계속 작성하는 방법으로 구현을 하고싶지 않았고 하나의 독립적인 이벤트 핸들러 함수를 선언을 하고싶었음.<br/>
그래서 결국 `moleEls[randomNum]`를 넘겨주는 방식이 아닌, 이벤트 핸들러 함수에서 `querySelector`를 통해서 다시 해당 태그를 가져온 후에 처리하는 방식으로 구현했음.

```javascript
function catchMole(event) {
  if (event.target.tagName !== "IMG") return;
  crtpointEl.textContent = ++point;
  clearTimeout(timer);

  const clickedMole = document.querySelector("img.show");
  clickedMole.classList.remove("show");
  setTimeout(showRandomMole, 1000);
}
```
