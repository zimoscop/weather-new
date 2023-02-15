const API = "06a41783b4be4267b23142644231002";

const changeCity = document.querySelector(".city__change");
const degrees = document.querySelector(".info");
const cityFinder = document.querySelector(".find__city");
const whatCity = document.querySelector(".info__city");
const temperature = document.querySelector(".info__degrees");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const line = document.querySelector(".line");
// отправляет запрос
function makeFeth(call) {
  fetch(call)
    .then(
      (response) => {
        return response.json();
      },
      (error) => {
        alert("Ooops. Something went wrong.");
      }
    )
    .then((data) => {
      const city = data.location.name;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      temperature.textContent = `${temp} °C`;
      whatCity.textContent = `${condition} in ${city}`;
    })
    .catch((err) => {
      btn.textContent = "Try again";
      line.classList.remove(".list");
      line.classList.add("text");
      input.textContent = "Ooops. Something went wrong.";
    });
}
// при загрузке показывает погоду в Москве
window.addEventListener("load", () => {
  const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=Moscow&aqi=yes`;
  makeFeth(call);
});
// при разрешении геолокации
navigator.geolocation.getCurrentPosition((position) => {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${lat},${long}&aqi=yes`;
  makeFeth(call);
});

// Убирает блок с температурой и открывает блок с поиском города
changeCity.addEventListener("click", () => {
  degrees.style = "display: none;";
  cityFinder.style = "display: block;";
  input.value = "";
  input.textContent = "";
  btn.textContent = "Find";
  line.classList.add(".list");
  line.classList.remove("text");
});

// Ищет погоду в другом городе
btn.addEventListener("click", () => {
  const city = String(input.value);
  const call = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=yes`;
  makeFeth(call);
  degrees.style = "display: block;";
  cityFinder.style = "display: none;";
});
