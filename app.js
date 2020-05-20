let latitude;
let longitude;
const key = '87b5841fc97ba543d2ecde0159cee419';
const day = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

navigator.geolocation.getCurrentPosition(position => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getlocation(latitude, longitude)
});

function getlocation(lati, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${key}`)
        .then(resp => resp.json())
        .then(data => {
            currentWeather(data);
        })
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&units=metric&appid=${key}`)
        .then(resp => resp.json())
        .then(data => {
            weatherForcast(data.list);
        })
}

function currentWeather(data) {
    const currentConditionEle = document.querySelector(".current-conditions");
    currentConditionEle.innerHTML = `
          <h2>Current Conditions</h2>
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
          <div class="current">
            <div class="temp">${parseInt(data.main.temp)}&#8451;</div>
            <div class="condition">${data.weather[0].description}</div>
          </div>
        </div>`
}

function weatherForcast(data) {
    let date = new Date();
    const forecastEle = document.querySelector(".forecast");
    data.forEach(weather => {
        let date = new Date(weather.dt_txt);
        if (date.toLocaleTimeString() === "12:00:00 PM") {
            forecastEle.insertAdjacentHTML(`beforeend`, `<div class="day">
      <h3>${day[date.getDay()]}</h3>
      <img src="http://openweathermap.org/img/wn/10d@2x.png" />
      <div class="description">light rain</div>
      <div class="temp">
        <span class="high">9℃</span>/<span class="low">6℃</span>
      </div>
    </div>`)
        }
    })

}