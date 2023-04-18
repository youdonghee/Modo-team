
let chartPrice1Arr=[];

setInterval(()=>{
  let chartPrice1 = window.localStorage.getItem("KI학원");
    if(chartPrice1Arr.indexOf(chartPrice1)!==-1){

    }else{
      chartPrice1Arr.push(chartPrice1);
          console.log(chartPrice1Arr);
        }
},1000);

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
      height: 380,
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

      if(tempCount!==count){
        options.series[0].data.push(parseInt(chartPrice1Arr[count]))
        apex.updateOptions(options); // 이게 차트 그려주는거
        tempCount=count;
      }

     },1000);

  apex.render();
})
