const form = document.getElementById("form1");
const weatherInput = document.getElementById("weatherInput");

const city_p = document.getElementById("city_p");
const country_p = document.getElementById("country_p");
const temp_p = document.getElementById("temp_p");
const icon_p = document.getElementById("icon_p");
const forecast_p = document.getElementById("forecast_p");
const error_p = document.querySelector("#error_p");

const latitude = document.querySelector(".latitude");

city_p.closest(".forecastInfo").style.display = "none";



form.addEventListener("submit", (e) => {
	e.preventDefault();
	weatherFunction();
	form.reset();
});

const weatherFunction = async () => {
	try {
		const res = await fetch("http://localhost:3000/weathers?address=" + weatherInput.value);
		const data = await res.json();
		console.log(res);
		if (data.error) {
			error_p.innerText = data.error;

			city_p.closest(".forecastInfo").style.display = "none";
			// country_p.innerText = "";
			// temp_p.innerText = "";
			// forecast_p.innerText = "";
		} else {
			console.log(data);

			error_p.innerText = "";

			city_p.closest(".forecastInfo").style.display = "block";

			setTimeout(() => {
				city_p.innerText = data.forecast.city;
				country_p.innerText = data.forecast.country;
			}, 500);

			setTimeout(() => {
            console.log(data.latitude, data.longitude);
				latitude.innerHTML = `
            <h4 class="card-text">latitude: 
               <span class="text-warning">${data.latitude}</span>
            </h4>
				<h4 class="longitude card-text">longitude: 
               <span class="text-warning">${data.longitude}</span>
            </h4>
            `;
			}, 1000);

			setTimeout(() => {
				icon_p.src = data.forecast.icon;
				temp_p.innerText = data.forecast.temp;
				forecast_p.innerText = data.forecast.status;
			}, 1500);
		}
	} catch (error) {
		console.log(error);
	}
};
