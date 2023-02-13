const API = "06a41783b4be4267b23142644231002";

const changeCity = document.querySelector(".city__change");
const degrees = document.querySelector(".info");
const cityFinder = document.querySelector(".find__city");
const whatCity = document.querySelector(".info__city");
const temperature = document.querySelector(".info__degrees");
const input = document.querySelector("input");
const btn = document.querySelector("button");

window.addEventListener("load", () => {
  const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=Moscow&aqi=yes`;
  fetch(call)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const city = data.location.name;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      temperature.textContent = `${temp} °C`;
      whatCity.textContent = `${condition} in ${city}`;
    });
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${lat},${long}&aqi=yes`;
    fetch(call)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const city = data.location.name;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        temperature.textContent = `${temp} °C`;
        whatCity.textContent = `${condition} in ${city}`;
      });
  });
}

// Убирает блок с температурой и открывает блок с поиском города
changeCity.addEventListener("click", () => {
  degrees.style = "display: none;";
  cityFinder.style = "display: block;";
});

// Ищет погоду в другом городе ENG
btn.addEventListener("click", () => {
  const city = String(input.value);
  const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=yes`;
  fetch(call)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const city = data.location.name;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      temperature.textContent = `${temp} °C`;
      whatCity.textContent = `${condition} in ${city}`;
    });
  degrees.style = "display: block;";
  cityFinder.style = "display: none;";
});
