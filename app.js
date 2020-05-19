let latitude;
let longitude;
const key = '87b5841fc97ba543d2ecde0159cee419';

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
            console.log(data);
        })
}

function currentWeather(data) {
    const currentConditionEle = document.querySelector(".current-conditions");
    currentConditionEle.innerHTML = `

          
          <h2>Current Conditions</h2>
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
          <div class="current">
            <div class="temp">${parseInt(data.main.temp)}℃</div>
            <div class="condition">${data.weather[0].description}</div>
          </div>
        </div>`


}