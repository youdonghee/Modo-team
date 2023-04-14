let nowPrice = document.querySelectorAll(".now-price");
let howPrice = document.querySelectorAll(".how-price");
let sumA=[2000,2000,2000,2000,2000];
let icon = document.querySelectorAll(".icon");
let imgA = document.querySelector(".A");
let imgB = document.querySelector(".B");
let imgC = document.querySelector(".C");
let imgD = document.querySelector(".D");
let imgE = document.querySelector(".E");
let imgX = document.querySelectorAll(".x");
// let iconPlus= document.querySelector(".iconPlus");
// let iconMinus= document.querySelector(".iconMinus");
let pm =["iconPlus","iconMinus"];
let bool= [true,true,true,true,true];
let images = ['../img/경일상폐.jpg','../img/경일상폐1.jpg','../img/경일상폐2.jpg','../img/경일상폐3.jpg','../img/경일상폐4.jpg']
let list = document.querySelectorAll(".list");
let listPrice = document.querySelectorAll(".list-flex-price");
let listPer = document.querySelectorAll(".list-flex-per");
let randomNumber;
// console.log(icon);
// console.log(imgAll);
function randomNum(){
    // 랜덤값 ( howPrice, 상승&하락 결정 수)
    let a = Math.floor(Math.random()*1100);

    if (a>100 && a<200)
        a=100;
    else if(a<100)
        a=0;
    else if(a>200 && a<300)
        a=200;
    else if(a>300 && a<400)
        a=300;
    else if(a>400 && a<500)
        a=400;
    else if(a>500 && a<600)
        a=500;
    else if(a>600 && a<700)
        a=600;
    else if(a>700 && a<800)
        a=700;
    else if(a>800 && a<900)
        a=800;
    else if(a>900 && a<1000)
        a=900;
    else if(a>1000)
        a=1000;
    
    return a;
}
function stay(i){
    sumA[i] = sumA[i]-randomNumber;
    nowPrice[i].innerHTML = sumA[i];
    howPrice[i].style.color = "gray";
    howPrice[i].innerHTML=randomNumber;
    icon[i].className = "icon"
    
}

function down(i){
    sumA[i] = sumA[i]-randomNumber;
        nowPrice[i].innerHTML = sumA[i];
        howPrice[i].style.color = "blue";
        howPrice[i].innerHTML=randomNumber;
        // console.log(pm[1]);
        icon[i].className = "icon "+pm[1];
}

function up(i){
    sumA[i] = sumA[i]+randomNumber;
        nowPrice[i].innerHTML = sumA[i];
        howPrice[i].style.color = "red";
        howPrice[i].innerHTML=randomNumber;
        // console.log(pm[0]);
        icon[i].className = "icon "+pm[0];
}

function finish(i){
    switch (i) {
        case 0:
            // imgA.style.backgroundImage = `url(${images[i]})`;
            imgA.style.backgroundColor = '#000000cc';
            imgX[i].style.display="block"; 
            break;
        case 1:
            imgB.style.backgroundColor = '#000000cc';
            imgX[i].style.display="block";
            break;
        case 2:
            imgC.style.backgroundColor = '#000000cc';
            imgX[i].style.display="block";
            break;
        case 3:
            imgD.style.backgroundColor = '#000000cc';
            imgX[i].style.display="block";
            break;
        case 4:
            imgE.style.backgroundColor = '#000000cc';
            imgX[i].style.display="block";
            break;
    }
    
              
    // 해야될거 이미지 배열로 하기
            
            setTimeout(() => {
                howPrice[i].style.color = "gray";
                howPrice[i].innerHTML= "-";
                icon[i].className = "icon"
                nowPrice[i].innerHTML = "-";
            }, 1000);
}

// 라운드마다 가격변동
function randomPrice(){
    let i=0;
    for(i ; i < 5 ; i++){
    if(bool[i]==true){

        randomNumber = randomNum();
        // console.log(randomNumber);

    //하락
    let b = Math.floor(Math.random()*2);
    if(b==0){ 

        if(randomNumber==0){ 
            // console.log(randomNumber);
            stay(i);
        }
        // 하락일 때
        else{
            // 하락인데 sumA가 하락금액보다 낮을 때
        // console.log(randomNumber);
            if(sumA[i]<randomNumber)
            {
                randomNumber=sumA[i];
            }
            down(i);
        }
        // 0원이 되었을 때
        if(sumA[i]==0){
            
            bool[i]=false;
            finish(i);
        }
       
    }
    // 상승
    if(b==1){

        // 등락률이 0일 때
        if(randomNumber==0){
           stay(i);
        }
       else{
            up(i);
 
        } 
    }
    }       
    }
    let arr=[];    

        arr.push(sumA[0]);
        // console.log(sumA[0]);
        arr.push(sumA[1]);
        arr.push(sumA[2]);
        arr.push(sumA[3]);
        arr.push(sumA[4]);

    return arr;
    
}
let arr=new Array(5).fill(0);

// 주식 상승률 순위 js
function a() {
    // console.log(sumA[0]);
    arr = randomPrice();
    window.localStorage.setItem("KI학원", sumA[0]);

    // let map = new Map();

    let arr2 = [{name: "KI학원", value : arr[0]},
                {name: "CM건설", value : arr[1]},
                {name: "JW은행", value : arr[2]},
                {name: "JY전자", value : arr[3]},
                {name: "DH통신", value : arr[4]}]

    arr2.sort(function(a,b){
    
        return b.value - a.value;
    })
 
    list.forEach((e,i)=>{
        e.innerHTML = arr2[i].name;

        if(arr2[i].value<2000){
            e.style.color ="blue";
        }
        else if(arr2[i].value==2000){
            e.style.color ="black";
        }
        else if(arr2[i].value>2000){
            e.style.color ="red";
        }
    })

    listPrice.forEach((e,i)=>{
        
        e.innerHTML = arr2[i].value;

        if(arr2[i].value<2000){
            e.style.color ="blue";
        }
        else if(arr2[i].value==2000){
            e.style.color ="black";
        }
        else if(arr2[i].value>2000){
            e.style.color ="red";
        }
    });

    listPer.forEach((e,i)=>{
        // let plusNum;
        if((2000-arr2[i].value)<0){
            e.innerHTML = "+"+-parseInt(((2000-arr2[i].value) / 2000) *100) + "%";
            e.style.color ="red";
        }
        else if((2000-arr2[i].value)>0){
             e.innerHTML = -parseInt(((2000-arr2[i].value) / 2000) *100) + "%";
             e.style.color ="blue";
        // }}}
        }
        else if((2000-arr2[i].value)==0){
            e.innerHTML = "0%";
             e.style.color ="black";
        }
        // else if((2000-arr2[i].value)>0){

        // }
    });

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






