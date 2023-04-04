
    const fs = require('fs')
    let usd;
    let teperature;
    let eur;
    let date= new Date();
    date.setDate(date.getDate() - 1);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    function one22(txt){
        if (txt.toString().length==1) return "0"+txt
        else return txt
    }

    let stringTodayDate= (""+date.getFullYear()+"-"+one22((date.getMonth()+1))+"-"+one22(date.getDate())).toString();
    date.setDate(date.getDate() - 1);
    let stringYesterdayDate= (""+date.getFullYear()+"-"+one22((date.getMonth()+1))+"-"+one22(date.getDate())).toString();
    
async function main(){
//for usd
let link=`https://fxds-public-exchange-rates-api.oanda.com/cc-api/currencies?base=USD&quote=ILS&data_type=general_currency_pair&start_date=${stringYesterdayDate}&end_date=${stringTodayDate}`;

    fetch(link, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        "referrerPolicy": "same-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      })
  .then((response) =>  response.json())
  .then((data) => {
  usd=data.response[0].average_bid;
  usd = Math.round(parseFloat(usd) * 100) / 100
  usd =usd.toString()
  if(usd.length==3)
  usd+='0'
  console.log(usd)
  fs.writeFile('../Stage2/StoreUSDrate.txt', usd.toString(), (error) => {
    // In case of a error throw err exception.
    if (error) {console.log(err);
    return;
    }
})})

await delay(4000);

//for Euro

//  link=`https://fxds-public-exchange-rates-api.oanda.com/cc-api/currencies?base=EUR&quote=ILS&data_type=general_currency_pair&start_date=${stringYesterdayDate}&end_date=${stringTodayDate}`;

//     fetch(link, {
//         "headers": {
//           "accept": "application/json, text/plain, */*",
//           "accept-language": "en-US,en;q=0.9",
//           "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Windows\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-site"
//         },
//         "referrerPolicy": "same-origin",
//         "body": null,
//         "method": "GET",
//         "mode": "cors",
//         "credentials": "omit"
//       })
//   .then((response) =>  response.json())
//   .then((data) => {console.log("the EUR is: "+data.response[0].average_bid)
//   eur=data.response[0].average_bid;

//   fs.writeFile('../Stage2/StoreEURrate.txt', eur.toString(), (error) => {
//     // In case of a error throw err exception.
//     if (error) {console.log(err);
//     return;
//     }
// })})

//get Tempetature TLV
fetch("https://openweathermap.org/data/2.5/onecall?lat=32.0809&lon=34.7806&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7,id;q=0.6",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://openweathermap.org/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
})
.then((response) =>  response.json())
.then((data) => {console.log("The Tmp in TLV is: "+data.current.temp)
let tmp = data.current.temp
tmp = Math.round(parseFloat(usd) * 100) / 100
let rightTmp =tmp.toString().split('.')[1]
if(rightTmp.length==1)
tmp = tmp.toString()+'0'

fs.writeFile('../Stage2/StoreTemperature.txt', data.current.temp.toString(), (error) => {
  // In case of a error throw err exception.
  if (error) {console.log(err);
  return;
  }
})
})

}

main()
  
// Data which will need to add in a file.
