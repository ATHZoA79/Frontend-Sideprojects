var weatherData;
var response;
var local;
var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314'

const INFO = document.querySelector('#info');
const REGION = document.querySelector('.region');
const TEMPERATURE = document.querySelector('.temp');
const WEATHER = document.querySelector('.weather');
const RAIN = document.querySelector('.rain');
const FEELS = document.querySelector('.feels');
const HR = document.querySelector('#info>hr');

INFO.classList.add('hide');
// Click event (e.target) 

const CITIES = document.querySelector('#map');
console.log(CITIES);
fetch(url)
.then((response) => {
  let Json = response.json();
  // console.log(response);
  // console.log(Json);
  return Json;
})
.then((myData) => {
  console.log(myData);
  let local = myData.records.location;
  console.log(local);
  CITIES.addEventListener('click', (e) => {
    let l_name = e.target.dataset.nameZh;
    local.forEach((local) => {
      if (local.locationName == l_name) {
        INFO.classList = "";
        if (local.weatherElement[1].time[0].parameter.parameterName < 20 ) {
          INFO.classList.add('sunny');
        }else if (local.weatherElement[1].time[0].parameter.parameterName < 50 ) {
          INFO.classList.add('cloudy');
        }else {
          INFO.classList.add('rainy');
        }
        INFO.classList.remove('show');
        INFO.classList.add('hide');
        console.log(local.locationName);
        REGION.innerHTML = local.locationName;
        TEMPERATURE.innerHTML = `氣溫：${local.weatherElement[2].time[0].parameter.parameterName} ~ ${local.weatherElement[4].time[0].parameter.parameterName}°C`;
        WEATHER.innerHTML = `天氣：${local.weatherElement[0].time[0].parameter.parameterName}`;
        RAIN.innerHTML = `降雨機率：${local.weatherElement[1].time[0].parameter.parameterName}%`;
        FEELS.innerHTML = `體感：${local.weatherElement[3].time[0].parameter.parameterName}`;
        INFO.classList.remove('hide');
        INFO.classList.add('show');
      }
    });
  });
});

// CITIES.onclick = (e) => {
//   console.log(e.target.dataset.nameZh);
// }

