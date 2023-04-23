let nowPrice = document.querySelectorAll(".now-price");
let howPrice = document.querySelectorAll(".how-price");
let sumA = [2000, 2000, 2000, 2000, 2000];
let icon = document.querySelectorAll(".icon");
let imgA = document.querySelector(".A");
let imgB = document.querySelector(".B");
let imgC = document.querySelector(".C");
let imgD = document.querySelector(".D");
let imgE = document.querySelector(".E");
let imgX = document.querySelectorAll(".x");
// let iconPlus= document.querySelector(".iconPlus");
// let iconMinus= document.querySelector(".iconMinus");
let pm = ["iconPlus", "iconMinus"];
let images = ['../img/경일상폐.jpg', '../img/경일상폐1.jpg', '../img/경일상폐2.jpg', '../img/경일상폐3.jpg', '../img/경일상폐4.jpg']
let list = document.querySelectorAll(".list");
let listPrice = document.querySelectorAll(".list-flex-price");
let listPer = document.querySelectorAll(".list-flex-per");
let randomNumber;

let avgNummArr = [0, 0, 0, 0, 0]; // 평균단가
let buyNumArr = [0, 0, 0, 0, 0]; // 총수량
let priNumArr = [0, 0, 0, 0, 0]; // 총매입가격
let plusArr = [0, 0, 0, 0, 0]; // 평가손익
let percentArr = [0, 0, 0, 0, 0]; // 수익률
let allMonArr = [0, 0, 0, 0, 0]; // 총평가금액
let bool = [true, true, true, true, true];
let wallet = document.querySelector(".rest-money") // 보유현금
let avg = document.querySelectorAll(".avg-price") // 평균단가
let text = document.querySelectorAll(".vol") // 총수량
let buyPrice = document.querySelectorAll(".buy-price") // 총매입가격
let plus = document.querySelectorAll(".plus-minus") // 평가손익 (수익률)
let allMon = document.querySelectorAll(".all-money") //총평가금액
let inputData = null;
let fullInputData; //풀매수 수량
let money = 10000;

// console.log(icon);
// console.log(imgAll);
function randomNum() {
    // 랜덤값 ( howPrice, 상승&하락 결정 수)
    let a = Math.floor(Math.random() * 1100);

    if (a > 100 && a < 200)
        a = 100;
    else if (a < 100)
        a = 0;
    else if (a > 200 && a < 300)
        a = 200;
    else if (a > 300 && a < 400)
        a = 300;
    else if (a > 400 && a < 500)
        a = 400;
    else if (a > 500 && a < 600)
        a = 500;
    else if (a > 600 && a < 700)
        a = 600;
    else if (a > 700 && a < 800)
        a = 700;
    else if (a > 800 && a < 900)
        a = 800;
    else if (a > 900 && a < 1000)
        a = 900;
    else if (a > 1000)
        a = 1000;

    return a;
}
function stay(i) {
    sumA[i] = sumA[i] - randomNumber;
    nowPrice[i].innerHTML = sumA[i];
    howPrice[i].style.color = "gray";
    howPrice[i].innerHTML = randomNumber;
    icon[i].className = "icon"

}

function down(i) {
    sumA[i] = sumA[i] - randomNumber;
    nowPrice[i].innerHTML = sumA[i];
    howPrice[i].style.color = "blue";
    howPrice[i].innerHTML = randomNumber;
    // console.log(pm[1]);
    icon[i].className = "icon " + pm[1];
}

function up(i) {
    sumA[i] = sumA[i] + randomNumber;
    nowPrice[i].innerHTML = sumA[i];
    howPrice[i].style.color = "red";
    howPrice[i].innerHTML = randomNumber;
    // console.log(pm[0]);
    icon[i].className = "icon " + pm[0];
}

function finish(i) {
    switch (i) {
        case 0:
            // imgA.style.backgroundImage = `url(${images[i]})`;
            imgA.style.backgroundColor = '#000000cc';
            imgX[i].style.display = "block";
            aa.forEach(function (i, index) {
                if (i == 0) {
                    i.onclick = function (e) {
                        e.preventDefault();
                    }
                }
            })
            break;
        case 1:
            imgB.style.backgroundColor = '#000000cc';
            imgX[i].style.display = "block";
            aa.forEach(function (i, index) {
                if (i == 1) {
                    i.onclick = function (e) {
                        e.preventDefault();
                    }
                }
            })
            break;
        case 2:
            imgC.style.backgroundColor = '#000000cc';
            imgX[i].style.display = "block";

            aa.forEach(function (i, index) {
                if (i == 2) {
                    i.onclick = function (e) {
                        e.preventDefault();
                    }
                }
            })

            break;
        case 3:
            imgD.style.backgroundColor = '#000000cc';
            imgX[i].style.display = "block";
            aa.forEach(function (i, index) {
                if (i == 3) {
                    i.onclick = function (e) {
                        e.preventDefault();
                    }
                }
            })
            break;
        case 4:
            imgE.style.backgroundColor = '#000000cc';
            imgX[i].style.display = "block";
            aa.forEach(function (i, index) {
                if (i == 4) {
                    i.onclick = function (e) {
                        e.preventDefault();
                    }
                }
            })
    }


    // 해야될거 이미지 배열로 하기

    setTimeout(() => {
        howPrice[i].style.color = "gray";
        howPrice[i].innerHTML = "-";
        icon[i].className = "icon"
        nowPrice[i].innerHTML = "-";
    }, 1000);
}

// 라운드마다 가격변동
function randomPrice() {
    let i = 0;
    for (i; i < 5; i++) {
        if (bool[i] == true) {

            randomNumber = randomNum();
            // console.log(randomNumber);

            //하락
            let b = Math.floor(Math.random() * 2);
            if (b == 0) {

                if (randomNumber == 0) {
                    // console.log(randomNumber);
                    stay(i);
                }
                // 하락일 때
                else {
                    // 하락인데 sumA가 하락금액보다 낮을 때
                    // console.log(randomNumber);
                    if (sumA[i] < randomNumber) {
                        randomNumber = sumA[i];
                        console.log(typeof (sumA[i]));
                    }
                    down(i);
                }
                // 0원이 되었을 때
                if (sumA[i] == 0) {
                    console.log(typeof (sumA[i]));
                    bool[i] = false;
                    finish(i);
                }

            }
            // 상승
            if (b == 1) {

                // 등락률이 0일 때
                if (randomNumber == 0) {
                    stay(i);
                }
                else {
                    up(i);

                }
            }
        }
    }
    let arr = [];

    arr.push(sumA[0]);
    // console.log(sumA[0]);
    arr.push(sumA[1]);
    arr.push(sumA[2]);
    arr.push(sumA[3]);
    arr.push(sumA[4]);

    return arr;

}
let arr = new Array(5).fill(0);
let Mon ;
// 주식 상승률 순위 js
function a() {
    // console.log(sumA[0]);
    arr = randomPrice();
    
    
    
    window.localStorage.setItem("KI학원", sumA[0]);
    window.localStorage.setItem("CM건설", sumA[1]);
    window.localStorage.setItem("JW은행", sumA[2]);
    window.localStorage.setItem("JY전자", sumA[3]);
    window.localStorage.setItem("DH통신", sumA[4]);



    // let map = new Map();

    let arr2 = [{ name: "KI학원", value: arr[0] },
    { name: "CM건설", value: arr[1] },
    { name: "JW은행", value: arr[2] },
    { name: "JY전자", value: arr[3] },
    { name: "DH통신", value: arr[4] }]

    arr2.sort(function (a, b) {

        return b.value - a.value;
    })

    list.forEach((e, i) => {
        e.innerHTML = arr2[i].name;

        if (arr2[i].value < 2000) {
            e.style.color = "blue";
        }
        else if (arr2[i].value == 2000) {
            e.style.color = "black";
        }
        else if (arr2[i].value > 2000) {
            e.style.color = "red";
        }
    })

    listPrice.forEach((e, i) => {

        e.innerHTML = arr2[i].value;

        if (arr2[i].value < 2000) {
            e.style.color = "blue";
        }
        else if (arr2[i].value == 2000) {
            e.style.color = "black";
        }
        else if (arr2[i].value > 2000) {
            e.style.color = "red";
        }
    });

    listPer.forEach((e, i) => {
        // let plusNum;
        if ((2000 - arr2[i].value) < 0) {
            e.innerHTML = "+" + -parseInt(((2000 - arr2[i].value) / 2000) * 100) + "%";
            e.style.color = "red";
        }
        else if ((2000 - arr2[i].value) > 0) {
            e.innerHTML = -parseInt(((2000 - arr2[i].value) / 2000) * 100) + "%";
            e.style.color = "blue";
            // }}}
        }
        else if ((2000 - arr2[i].value) == 0) {
            e.innerHTML = "0%";
            e.style.color = "black";
        }
    })

   

    for (let i = 0; i < 5; i++) {
        if (nowPrice[i].innerHTML == "-") {
            nowPrice[i].innerHTML = 0;
        }
        // 평가손익 (보유중인 주식의 현재가격 * 수량) - 매입총액 = 평가손익
        plusArr[i] = (nowPrice[i].innerHTML * buyNumArr[i]) - priNumArr[i]
        plus[i + 1].innerHTML = plusArr[i];

        // 수익률 (현재가 - 평균매입가격 / 평균매입가격) * 100 = 수익률 
        percentArr[i] = ((nowPrice[i].innerHTML - avgNummArr[i]) / avgNummArr[i]) * 100
        plus[i + 1].innerHTML = `${plusArr[i]} (${percentArr[i].toFixed(2)} %)`// 소수점 2자리 까지 : toFixed(2)

        // 총평가금액
        allMonArr[i] = (priNumArr[i] + plusArr[i])
        allMon[i + 1].innerHTML = allMonArr[i];
        // console.log(allMonArr[i]);


        // 평가손익 (보유중인 주식의 현재가격 * 수량) - 매입총액 = 평가손익
        plusArr[i] = (nowPrice[i].innerHTML * buyNumArr[i]) - priNumArr[i]
        plus[i + 1].innerHTML = plusArr[i];

        // 수익률 (현재가 - 평균매입가격 / 평균매입가격) * 100 = 수익률 
        if (avgNummArr[i] !== 0) { //분모가 0일때 무한으로 출력이됨 방지해줌
            percentArr[i] = (Number(nowPrice[i].innerHTML - avgNummArr[i]) / avgNummArr[i]) * 100

            plus[i + 1].innerHTML = `${plusArr[i]} (${percentArr[i].toFixed(2)} %)`// 소수점 2자리 까지 : toFixed(2)
        } else {
            percentArr[i] = 0;
        }

        // 총평가금액
        allMonArr[i] = (priNumArr[i] + plusArr[i])
        allMon[i + 1].innerHTML = allMonArr[i];

        
        
        
    }
        Mon= Number(allMonArr[0]+ allMonArr[1] + allMonArr[2]+ allMonArr[3]+ allMonArr[4]);
        console.log(Mon);

    //등락률 ((2000-현재가) / 2000) *100
}

// map.set('KI학원', arr[0]);
// map.set('CM건설', arr[1]);
// map.set('JW은행', arr[2]);
// map.set('JY전자', arr[3]);
// map.set('DH통신', arr[4]);

// for (let key of map.keys()) {
//     console.log(key + " / " + map.get(key) ) 
//   } 

// arr.sort(function(a, b) { // 내림차순 정렬
//     // console.log(a);
//     return b - a ;
// });

// for (let key of map.keys()) {
//     console.log(key + " / " + map.get(key) ) 
//   } 

//     console.log(arr);
//  for(let i=0; i <5 ; i++){

//     if(arr[i]==map.get('KI학원')){
//         list[i].innerHTML = "KI학원"; 
//     }
//     if(rr[i]==map.get('CM건설')){
//         list[i].innerHTML = "CM건설";
//     }
//     if(arr[i]==map.get('JW은행')){
//         list[i].style.transition = "1s";
//     }
//     if(arr[i]==map.get('JY전자')){
//         list[i].innerHTML = "JY전자";
//     }
//     if(arr[i]==map.get('DH통신')){
//         list[i].innerHTML = "DH통신";
//     }
// }

// 매수 매도 값 보내기

wallet.innerHTML = `내 보유현금 : ${money} 원`


// 매수
function getvalueInText(i) {
        // 함수로 만들기
    if (inputData == null) {
        inputData = document.getElementsByClassName("data")[i].value;
    }
    if (inputData <= 0) {
        alert("1이상의 숫자만 넣어주세요")

        document.getElementsByClassName("data")[i].value = ""
    } else if (!Number.isInteger(parseFloat(inputData))) { //Number.isInteger() 함수는 입력된 값이 정수인지를 체크 // parseFloat() 함수는 문자열을 부동소수점 수로 변환
        alert("소수점 안돼")
        document.getElementsByClassName("data")[i].value = ""
    }

    else if (money >= nowPrice[i].innerHTML * inputData) {
        // 보유현금
        money = money - (nowPrice[i].innerHTML * inputData)
        wallet.innerHTML = `내 보유현금 : ${money} 원`
        window.localStorage.setItem("소지금", money);

        // 수량
        buyNumArr[i] += Number(inputData);
        text[i + 1].innerHTML = buyNumArr[i];
        // console.log(buyNumArr[0]);
        // console.log(buyNumArr[1]);
        // console.log(buyNumArr[2]);
        // console.log(buyNumArr[3]);
        // console.log(buyNumArr[4]);

        window.localStorage.setItem("수량", buyNumArr[0]);
        window.localStorage.setItem("수량1", buyNumArr[1]);
        window.localStorage.setItem("수량2", buyNumArr[2]);
        window.localStorage.setItem("수량3", buyNumArr[3]);
        window.localStorage.setItem("수량4", buyNumArr[4]);

        // 총 매입가격
        priNumArr[i] += nowPrice[i].innerHTML * inputData;
        buyPrice[i + 1].innerHTML = priNumArr[i]

        // 평균단가 총매입가격 / 총 수량
        avgNummArr[i] = Math.floor(priNumArr[i] / buyNumArr[i]);
        avg[i + 1].innerHTML = avgNummArr[i];

        // 평가손익 (보유중인 주식의 현재가격 * 수량) - 매입총액 = 평가손익
        plusArr[i] = (nowPrice[i].innerHTML * buyNumArr[i]) - priNumArr[i]
        plus[i + 1].innerHTML = plusArr[i];

        // 수익률 (현재가 - 평균매입가격 / 평균매입가격) * 100 = 수익률 
        percentArr[i] = (Number(nowPrice[i].innerHTML - avgNummArr[i]) / avgNummArr[i]) * 100
        plus[i + 1].innerHTML = `${plusArr[i]} (${percentArr[i].toFixed(2)} %)`// 소수점 2자리 까지 : toFixed(2)

        // 총평가금액
        allMonArr[i] = (priNumArr[i] + plusArr[i])
        allMon[i + 1].innerHTML = allMonArr[i];
        // console.log(allMonArr[i]);
        document.getElementsByClassName("data")[i].value = ""
        alert(`${inputData} 개 매수 하였습니다`)
    }
    else {
        document.getElementsByClassName("data")[i].value = ""
        alert("돈 없어")
    }
    // console.log("dd");
    close(i);
    inputData = null;
}
// 평가손익, 총평가금액은 매수매도 했을대도 바꿔지고 라운드가 끝났을때도 바꿔주기

// 매도 : 

// 보유현금 + 현재가격
// 수량 - 현재수량
// 총 매입가격 - 현재가격
// 평군단가 : (총매입가격-현재가격 / 총 수량-현재수량)

// 평가손익 , 수익률, 총평가금액은 그대로

// 조건 : 매도할때 (현재가 * 수량) <= 총평가금액
function setvalueInText(i) {
    // 함수로 만들기
    console.log(inputData);
    if (inputData == null) {
        inputData = document.getElementsByClassName("data")[i].value;
    }
    if (inputData <= 0) {
        alert("1이상의 숫자만 넣어주세요")

        document.getElementsByClassName("data")[i].value = ""
    } else if (!Number.isInteger(parseFloat(inputData))) { //Number.isInteger() 함수는 입력된 값이 정수인지를 체크 // parseFloat() 함수는 문자열을 부동소수점 수로 변환
        alert("소수점 안돼")
        document.getElementsByClassName("data")[i].value = ""
    }

    else if (allMonArr[i] >= nowPrice[i].innerHTML * inputData) { // 총 평가금액 이 구매가 보다 적을때만 가능

        // 보유현금
        allMonArr[i] -= nowPrice[i].innerHTML * inputData // 총평가금액 - 현재가
        allMon[i + 1].innerHTML = allMonArr[i];

        // 지갑
        money = money + (nowPrice[i].innerHTML * inputData)
        wallet.innerHTML = `내 보유현금 : ${money} 원`

        // 수량 (수량 - 현재수량)
        buyNumArr[i] -= Number(inputData);
        text[i + 1].innerHTML = buyNumArr[i]

        // 총 매입가격 (총 매입가격 - 현재가격)
        // priNumArr[i] -= nowPrice[i].innerHTML * inputData;
        priNumArr[i] = avgNummArr[i] * buyNumArr[i];
        // ***수정
        if (buyNumArr[i] == 0) {
            priNumArr[i] = 0;
        }

        buyPrice[i + 1].innerHTML = priNumArr[i]

        // 평균단가 총매입가격 / 총 수량 **평단가는 매도할때 줄어들면안됨
        if (buyNumArr[i] !== 0) { // avgNummArr[i]의 결과값이 0이 되면 평균을 계산할 수 없기 때문에 NaN(Not a Number)이 출력
            // avgNummArr[i] = Math.floor(priNumArr[i] / buyNumArr[i]); // **그대로 냅둬야함
            avg[i + 1].innerHTML = avgNummArr[i];
        } else {
            avgNummArr[i] = 0;
            avg[i + 1].innerHTML = avgNummArr[i];
        }

        // 평가손익 (보유중인 주식의 현재가격 * 수량) - 매입총액 = 평가손익
        plusArr[i] = (nowPrice[i].innerHTML * buyNumArr[i]) - priNumArr[i]
        plus[i + 1].innerHTML = plusArr[i];

        // 수익률 (현재가 - 평균매입가격 / 평균매입가격) * 100 = 수익률 
        if (avgNummArr[i] !== 0) { //분모가 0일때 무한으로 출력이됨 방지해줌
            percentArr[i] = ((nowPrice[i].innerHTML - avgNummArr[i]) / avgNummArr[i]) * 100
            plus[i + 1].innerHTML = `${plusArr[i]} (${percentArr[i].toFixed(2)} %)`// 소수점 2자리 까지 : toFixed(2)
        } else {
            percentArr[i] = 0;
        }

        // 총평가금액
        allMonArr[i] = (priNumArr[i] + plusArr[i])
        allMon[i + 1].innerHTML = allMonArr[i];
        document.getElementsByClassName("data")[i].value = ""
        alert(`${inputData} 개 매도 하였습니다`);
    }
    else {
        alert("돈 없어")
    }
    close(i);
    inputData = null;
}
// 풀매수
function fullget(i) {
    // inputData = document.getElementsByClassName("data")[i].value;
    fullInputData = ~~(money / nowPrice[i].innerHTML);
    if (fullInputData == 0) {
        alert("돈 없어")
    }else{
        alert(`상남자 특 ${fullInputData}개 풀매수 함`)
        inputData = fullInputData;
        getvalueInText(i)
        inputData = null;
        fullInputData = null;
    }
}
// 풀매도
function fullset(i) {
    console.log(buyNumArr[i]);
    if (buyNumArr[i] == 0) {
        alert("매도할거 없음")
    }else{
        // inputData = document.getElementsByClassName("data")[i].value;
        fullInputData = buyNumArr[i];
        inputData = fullInputData;
        alert(`상남자 특 ${fullInputData}개 풀매도 함`)
        setvalueInText(i)
        inputData = null;
    }
}
