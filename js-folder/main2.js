let nowPrice = document.querySelectorAll(".now-price");
let howPrice = document.querySelectorAll(".how-price");
let sumA=[500,2000,2000,2000,2000];
let icon = document.querySelectorAll(".icon");
let imgA = document.querySelector(".A");
let imgX = document.querySelector(".x");
// let iconPlus= document.querySelector(".iconPlus");
// let iconMinus= document.querySelector(".iconMinus");
let pm =["iconPlus","iconMinus"];
let bool= [true,true,true,true,true];
// let imgAll = ['../img/경일상폐.jpg','../img/경일상폐.jpg','../img/경일상폐.jpg','../img/경일상폐.jpg','../img/경일상폐.jpg']
let randomNumber;
console.log(icon);
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
        console.log(pm[1]);
        icon[i].className = "icon "+pm[1];
}

function up(i){
    sumA[i] = sumA[i]+randomNumber;
        nowPrice[i].innerHTML = sumA[i];
        howPrice[i].style.color = "red";
        howPrice[i].innerHTML=randomNumber;
        console.log(pm[0]);
        icon[i].className = "icon "+pm[0];
}

function finish(i){
    // imgA.style.backgrounImage = url(imgAll[i]);ㅣㅣ
    imgA.style.backgroundImage = 'url(../img/경일상폐.jpg)';
    imgX.style.display="block";           
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
        console.log(randomNumber);

    //하락
    let b = Math.floor(Math.random()*2);
    if(b==0){ 

        if(randomNumber==0){ 
            console.log(randomNumber);
            stay(i);
        }
        // 하락일 때
        else{
            // 하락인데 sumA가 하락금액보다 낮을 때
        console.log(randomNumber);
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
}

