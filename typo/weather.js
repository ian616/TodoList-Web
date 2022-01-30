const API_KEY = '28a7de875500adcd531efe2d158dc3f0';

function ongeoSuccess(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    console.log(url);
    fetch(url).then(response => response.json()).then(data => {
        const name = data.name;
        const weather = data.weather[0].main;
    })
}

function ongeoFailed(){

}

navigator.geolocation.getCurrentPosition(ongeoSuccess, ongeoFailed)