const geocode = require("./tools/geocode");
const forecast = require("./tools/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "./template/views");
const partialDirectory = path.join(__dirname, "./template/partials");

console.log(__dirname);
console.log(publicDirectory);

const app = express();
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", viewsDirectory);

hbs.registerPartials(partialDirectory);
// ---------------------------------------------------------------

app.get("/", (req, res) => {
	res.render("index", {
		title: "Home Page",
		welcome: "Welcome in weather App",
	});
});

app.get("/check-weather", (req, res) => {
	res.render("checkWeather", {
		title: "Check Weather",
		latitude: 26.4941838299718,
		longitude: 29.871903452398,
		country: "Egypt",
		status: "clear",
		temp: "33",
	});
});

app.get("/weathers", (req, res) => {
	if (!req.query.address) {
		return res.send({ error: "You must provide an address" });
	}

	geocode(req.query.address, (error, data) => {
		if (error) {
			return res.send({ error });
		}

		forecast(data.latitude, data.longitude, (error, forecastInfo) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location: req.query.address,
				latitude: data.latitude,
				longitude: data.longitude,
				forecast: forecastInfo,
			});
		});
	});
});

app.get("/weather", (req, res) => {
	console.log(req);
	res.render("weather");
});


// ------------------------------- listen ------------------------------------
app.get("*", (req, res) => {
	res.render("notFoundPage");
});

app.listen(port, () => console.log(`app listen in port ${port}`));
