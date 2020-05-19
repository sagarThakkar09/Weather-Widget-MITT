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
            console.log(data);
        })
}