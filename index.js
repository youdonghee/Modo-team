let a;
function randomNum(){
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

    console.log(a);
        
    return a;
}

a = randomNum();
console.log(a);