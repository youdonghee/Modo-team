
let chartPrice1Arr=[];
let chartPrice1Arr2=[];
let chartPrice1Arr3=[];
let chartPrice1Arr4=[];
let chartPrice1Arr5=[];


setInterval(()=>{
  let chartPrice1 = window.localStorage.getItem("KI학원");
    if(chartPrice1Arr.indexOf(chartPrice1)!==-1){

    }else{
      chartPrice1Arr.push(chartPrice1);
          console.log(chartPrice1Arr);
        }
},2000);

setInterval(()=>{
  let chartPrice2 = window.localStorage.getItem("CM건설");
    if(chartPrice1Arr2.indexOf(chartPrice2)!==-1){

    }else{
      chartPrice1Arr2.push(chartPrice2);
        }
},2000);

setInterval(()=>{
  let chartPrice3 = window.localStorage.getItem("JW은행");
    if(chartPrice1Arr3.indexOf(chartPrice3)!==-1){

    }else{
      chartPrice1Arr3.push(chartPrice3);
          
        }
},2000);

setInterval(()=>{
  let chartPrice4 = window.localStorage.getItem("JY전자");
    if(chartPrice1Arr4.indexOf(chartPrice4)!==-1){

    }else{
      chartPrice1Arr4.push(chartPrice4);

        }
},2000);

setInterval(()=>{
  let chartPrice5 = window.localStorage.getItem("DH통신");
    if(chartPrice1Arr5.indexOf(chartPrice5)!==-1){

    }else{
      chartPrice1Arr5.push(chartPrice5);
          
        }
},2000);


// window.localStorage.clear();


  // let chartPrice1 = window.localStorage.getItem("KI학원");
  // // if(chartPrice1Arr.indexOf(chartPrice1)!==-1){

  // //       }else{
          
  // //             console.log(chartPrice1Arr);
  // //           }
  //           chartPrice1Arr.push(chartPrice1);

document.addEventListener("DOMContentLoaded", () => {

  let options= {
    
    series: [{
      name: "현재가",
      data: [2000],
    }],
  
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
     size: 6,
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'KI학원',
        align: 'middle'
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['white', 'transparent'],
        opacity: 0.5
      }, 
    },
    xaxis: {
      categories: ['ROUND1', 'ROUND2', 'ROUND3', 'ROUND4', 'ROUND5',
                     'ROUND6', 'ROUND7', 'ROUND8', 'ROUND9', 'ROUND10'],
    }
  }

   let apex = new ApexCharts(document.querySelector("#lineChart"),options);

    let tempCount=0;

    setInterval(()=>{
      // console.log(count)
      if(tempCount!==count){
        options.series[0].data.push(parseInt(chartPrice1Arr[count]));
        apex.updateOptions(options); // 이게 차트 그려주는거
        tempCount=count;
      }

     },2000);

  apex.render();
})

document.addEventListener("DOMContentLoaded", () => {

  let options2= {
    
    series: [{
      name: "현재가",
      data: [2000],
    }],
  
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
     size: 6,
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'CM건설',
        align: 'middle'
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['white', 'transparent'],
        opacity: 0.5
      }, 
    },
    xaxis: {
      categories: ['ROUND1', 'ROUND2', 'ROUND3', 'ROUND4', 'ROUND5',
                     'ROUND6', 'ROUND7', 'ROUND8', 'ROUND9', 'ROUND10'],
    }
  }

   let apex2 = new ApexCharts(document.querySelector("#lineChart2"),options2);

    let tempCount2=0;

    setInterval(()=>{
      // console.log(count)
      if(tempCount2!==count){
        options2.series[0].data.push(parseInt(chartPrice1Arr2[count]));
        apex2.updateOptions(options2); // 이게 차트 그려주는거
        tempCount2=count;
      }

     },2000);

  apex2.render();
})

document.addEventListener("DOMContentLoaded", () => {

  let options3= {
    
    series: [{
      name: "현재가",
      data: [2000],
    }],
  
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
     size: 6,
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'JW은행',
        align: 'middle'
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['white', 'transparent'],
        opacity: 0.5
      }, 
    },
    xaxis: {
      categories: ['ROUND1', 'ROUND2', 'ROUND3', 'ROUND4', 'ROUND5',
                     'ROUND6', 'ROUND7', 'ROUND8', 'ROUND9', 'ROUND10'],
    }
  }

   let apex3 = new ApexCharts(document.querySelector("#lineChart3"),options3);

    let tempCount3=0;

    setInterval(()=>{
      // console.log(count)
      if(tempCount3!==count){
        options3.series[0].data.push(parseInt(chartPrice1Arr3[count]));
        apex3.updateOptions(options3); // 이게 차트 그려주는거
        tempCount3=count;
      }

     },2000);

  apex3.render();
})

document.addEventListener("DOMContentLoaded", () => {

  let options4= {
    
    series: [{
      name: "현재가",
      data: [2000],
    }],
  
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
     size: 6,
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'JY전자',
        align: 'middle'
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['white', 'transparent'],
        opacity: 0.5
      }, 
    },
    xaxis: {
      categories: ['ROUND1', 'ROUND2', 'ROUND3', 'ROUND4', 'ROUND5',
                     'ROUND6', 'ROUND7', 'ROUND8', 'ROUND9', 'ROUND10'],
    }
  }

   let apex4 = new ApexCharts(document.querySelector("#lineChart4"),options4);

    let tempCount4=0;

    setInterval(()=>{
      // console.log(count)
      if(tempCount4!==count){
        options4.series[0].data.push(parseInt(chartPrice1Arr4[count]));
        apex4.updateOptions(options4); // 이게 차트 그려주는거
        tempCount4=count;
      }

     },2000);

  apex4.render();
})

document.addEventListener("DOMContentLoaded", () => {

  let options5= {
    
    series: [{
      name: "현재가",
      data: [2000],
    }],
  
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
     size: 6,
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'DH통신',
        align: 'middle'
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['white', 'transparent'],
        opacity: 0.5
      }, 
    },
    xaxis: {
      categories: ['ROUND1', 'ROUND2', 'ROUND3', 'ROUND4', 'ROUND5',
                     'ROUND6', 'ROUND7', 'ROUND8', 'ROUND9', 'ROUND10'],
    }
  }

   let apex5 = new ApexCharts(document.querySelector("#lineChart5"),options5);

    let tempCount5=0;

    setInterval(()=>{
      // console.log(count)
      if(tempCount5!==count){
        options5.series[0].data.push(parseInt(chartPrice1Arr5[count]));
        apex5.updateOptions(options5); // 이게 차트 그려주는거
        tempCount5=count;
      }

     },2000);

  apex5.render();
})
