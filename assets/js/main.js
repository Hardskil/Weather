'use strict'
// переключение на другую страницу
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// дата
function newDate() {
  let currentDate = new Date();
  let getCurrentDay = currentDate.getDate();
  let getCurrentMonth = 1 + currentDate.getMonth()
  if (getCurrentMonth > 12) {
    getCurrentMonth = 1;
  }
  let getFullYear = currentDate.getFullYear();

  if (getCurrentDay < 10) {
    return currentDate = `0${getCurrentDay}.${getCurrentMonth}.${getFullYear}`;
  }
  if (getCurrentMonth < 10) {
    return currentDate = `${getCurrentDay}. 0${getCurrentMonth}.${getFullYear}`;
  }
  currentDate = `${getCurrentDay}.${getCurrentMonth}.${getFullYear}`;
  return currentDate;
}
document.getElementById('current_data').innerHTML = newDate();
// массив дней в недели
function showDateTime() {
  let d = new Date();
  let n1, n2, n3, n4, n5, n6;
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  console.log(weekday);
  if (d.getDay() >= 3) {
    n1 = weekday[(d.getDay() + 0)];
    n2 = weekday[(d.getDay() + 2)];
    n3 = weekday[(d.getDay() + 3)];
    n4 = weekday[7 - (d.getDay() + 3)];
    n5 = weekday[8 - (d.getDay() + 4)];
  } if (d.getDay() >= 5) {
    n1 = weekday[(d.getDay() + 0)];
    n2 = weekday[(d.getDay() + 1)];
    n3 = weekday[7 - (d.getDay() + 2)];
    n4 = weekday[9 - (d.getDay() + 3)];
    n5 = weekday[10 - (d.getDay() + 3)];
  } if (d.getDay() >= 6) {
    n1 = weekday[(d.getDay() + 0)];
    n2 = weekday[7 - (d.getDay() + 1)];
    n3 = weekday[9 - (d.getDay() + 2)];
    n4 = weekday[11 - (d.getDay() + 3)];
    n5 = weekday[12 - (d.getDay() + 3)];
  } if (d.getDay() >= 7) {
    n1 = weekday[7 - (d.getDay() + 0)];
    n2 = weekday[9 - (d.getDay() + 1)];
    n3 = weekday[11 - (d.getDay() + 2)];
    n4 = weekday[13 - (d.getDay() + 3)];
    n5 = weekday[14 - (d.getDay() + 4)];
  } if (d.getDay() < 3) {
    n1 = weekday[(d.getDay() + 0)];
    n2 = weekday[(d.getDay() + 1)];
    n3 = weekday[(d.getDay() + 2)];
    n4 = weekday[(d.getDay() + 3)];
    n5 = weekday[(d.getDay() + 4)];

  }

  document.getElementById("day1").innerHTML = n1;
  document.getElementById("day2").innerHTML = n2;
  document.getElementById("day3").innerHTML = n3;
  document.getElementById("day4").innerHTML = n4;
  document.getElementById("day5").innerHTML = n5;
}
showDateTime();

const inputWeather = document.querySelector('#weather')
const findOutBtn = document.querySelector('#findOutBtn')
const outputText = document.querySelector('.current_weather_tittle_2')
const bdContainer = document.querySelector("#bd_container");

const API_KEY = 'c99d14bcb6e22cea5c5d4e61bf70f71d';

window.addEventListener('load', () => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=41.246&lon=69.2163&exclude={part}&appid=${API_KEY}`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      console.log(data);
      outputText.textContent = `${Math.round(data.current.temp) - 273} \u00B0C`;
      document.querySelector("#current_icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">`
      document.querySelector('#sunrise').innerHTML = `Sunrise: ${window.moment(data.current.sunrise * 1000).format('HH:mm A')};`
      document.querySelector('#sunset').innerHTML = `Sunset: ${window.moment(data.current.sunset * 1000).format('HH:mm A')};`
      document.querySelector('#duration').innerHTML = `Sunset: ${window.moment(data.current.sunset * 1000 / data.current.sunrise * 1000).format('HH:mm A')}`;
      // 



      // по часовое///////////////////////
      for (let i = 0; i < 6; i++) {
        document.querySelector(`#hourly_description_${i + 1}`).textContent = data.hourly[i].weather[0].main
        document.querySelector(`#icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png">`
        document.querySelector(`#hourly_temp_${i + 1}`).innerHTML = Math.round(data.hourly[i].temp - 273) + '&deg;'
        document.querySelector(`#hourly_feel_${i + 1}`).innerHTML = Math.round(data.hourly[i].feels_like - 273) + '&deg;'
        document.querySelector(`#hourly_wind_${i + 1}`).innerHTML = `${Math.round(data.hourly[0].wind_speed * 3, 6)} km/h`
      }
      //////////////////////////////////////5-ти дневное/////////////////////////////////// 
      for (let i = 0; i < 5; i++) {
        document.querySelector(`#week_temp_${i + 1}`).innerHTML = Math.round(data.daily[i].temp.day - 273) + '&deg;';
        document.querySelector(`#week_description_${i + 1}`).innerHTML = data.daily[i].weather[0].main
        document.querySelector(`#week_icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`
      }
      // функция чтобы при нажатии менялось информация
      document.querySelector("#week_content_1").addEventListener('click', function (e) {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[0].weather[0]['main']
          document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png">`
          document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[0].feels_like.day - 273) + '&deg;'
        }
      })
      document.querySelector("#week_content_2").addEventListener('click', function (e) {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[1].weather[0]['main']
          document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`
          document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[1].feels_like.day - 273) + '&deg;'
        }
      })
      document.querySelector("#week_content_3").addEventListener('click', function (e) {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[2].weather[0]['main']
          document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`
          document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[2].feels_like.day - 273) + '&deg;'
        }
      })
      document.querySelector("#week_content_4").addEventListener('click', function (e) {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[3].weather[0]['main']
          document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`
          document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[3].feels_like.day - 273) + '&deg;'
        }
      })
      document.querySelector("#week_content_5").addEventListener('click', function (e) {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[4].weather[0]['main']
          document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">`
          document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[4].feels_like.day - 273) + '&deg;'
        }
      })
    })
  fetch(`https://api.openweathermap.org/data/2.5/find?lat=41.246&lon=69.2163&cnt=5&appid=${API_KEY}`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < 4; i++) {
        document.querySelector(`#city_${i + 1}`).innerHTML = data.list[i]['name']
        document.querySelector(`#nearby_icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`
        document.querySelector(`#nearby_temp_${i + 1}`).innerHTML = Math.round(data.list[i].main.temp - 273) + '&deg;'
      }
    })






  ////////////// для поиска ///////////////////////////////////////
  findOutBtn.addEventListener('click', function () {
    const API_URL = ('GET', `https://api.openweathermap.org/data/2.5/weather?q=${inputWeather.value}&appid=${API_KEY}`)

    const request = new XMLHttpRequest();
    console.log(request);
    request.open('GET', API_URL)
    //request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        console.log(data);
        document.querySelector('.current_weather_title_1').textContent = data.weather[0]['main']
        outputText.textContent = `${Math.round(data.main.temp) - 273} \u00B0C`;
        /////////////////////////////////// погода в этот момент ///////////////////////////////////////////////////////// 
        document.querySelector("#current_icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
        document.querySelector('#sunrise').innerHTML = `Sunrise: ${window.moment(data.sys.sunrise * 1000).format('HH:mm A')};`
        document.querySelector('#sunset').innerHTML = `Sunset: ${window.moment(data.sys.sunset * 1000).format('HH:mm A')};`
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`)
          .then(function (resp) { return resp.json() })
          .then(function (data) {
            console.log(data);
            ///////////////////////////////////// почасовое значение //////////////////////////////////////////////////
            for (let i = 0; i < 6; i++) {
              document.querySelector(`#hourly_description_${i + 1}`).textContent = data.hourly[i].weather[0].main
              document.querySelector(`#icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png">`
              document.querySelector(`#hourly_temp_${i + 1}`).innerHTML = Math.round(data.hourly[i].temp - 273) + '&deg;'
              document.querySelector(`#hourly_feel_${i + 1}`).innerHTML = Math.round(data.hourly[i].feels_like - 273) + '&deg;'
              document.querySelector(`#hourly_wind_${i + 1}`).innerHTML = `${Math.round(data.hourly[0].wind_speed * 3, 6)} km/h`
            }
            //////////////////////////////////////5-ти дневное/////////////////////////////////// 
            for (let i = 0; i < 5; i++) {
              document.querySelector(`#week_temp_${i + 1}`).innerHTML = Math.round(data.daily[i].temp.day - 273) + '&deg;';
              document.querySelector(`#week_description_${i + 1}`).innerHTML = data.daily[i].weather[0].main
              document.querySelector(`#week_icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`
            }
            ///////  функция чтобы при нажатии менялось информация///////////////////////////////////////////
            document.querySelector("#week_content_1").addEventListener('click', function (e) {
              for (let i = 0; i < 5; i++) {
                document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[0].weather[0]['main']
                document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png">`
                document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[0].feels_like.day - 273) + '&deg;'
              }
            })
            document.querySelector("#week_content_2").addEventListener('click', function (e) {
              for (let i = 0; i < 5; i++) {
                document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[1].weather[0]['main']
                document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`
                document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[1].feels_like.day - 273) + '&deg;'
              }
            })
            document.querySelector("#week_content_3").addEventListener('click', function (e) {
              for (let i = 0; i < 5; i++) {
                document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[2].weather[0]['main']
                document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`
                document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[2].feels_like.day - 273) + '&deg;'
              }
            })
            document.querySelector("#week_content_4").addEventListener('click', function (e) {
              for (let i = 0; i < 5; i++) {
                document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[3].weather[0]['main']
                document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`
                document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[3].feels_like.day - 273) + '&deg;'
              }
            })
            document.querySelector("#week_content_5").addEventListener('click', function (e) {
              for (let i = 0; i < 5; i++) {
                document.querySelector(`#hourly_description_${i + 1}_${i + 1}`).innerHTML = data.daily[4].weather[0]['main']
                document.querySelector(`#icon_${i + 1}_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">`
                document.querySelector(`#hourly_feel_${i + 1}_${i + 1}`).innerHTML = Math.round(data.daily[4].feels_like.day - 273) + '&deg;'
              }
            })
          })

        // для ближайщих городов////////////////////////////////////////////////
        fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}`)
          .then(function (resp) { return resp.json() })
          .then(function (data) {
            console.log(data);
            for (let i = 0; i < 4; i++) {
              document.querySelector(`#city_${i + 1}`).innerHTML = data.list[i]['name']
              document.querySelector(`#nearby_icon_${i + 1}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`
              document.querySelector(`#nearby_temp_${i + 1}`).innerHTML = Math.round(data.list[i].main.temp - 273) + '&deg;'
            }
          })
        // для ошибки///////////////////////////////////////////////////
      } else {
        bdContainer.style.display = 'none';
        error.style.display = 'block';
      }
    })
  })
})

