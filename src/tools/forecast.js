const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"https://api.weatherapi.com/v1/current.json?key=429c39268c45423085a150019232307&q=" +
		latitude +
		"," +
		longitude;

	request({ url, json: true }, (error, res) => {
		if (error) {
			callback("Unable to connect to the weather service", undefined);
		} else if (res.body.error) {
			callback(res.body.error.message, undefined);
		} else {
			const data = {
				country: res.body.location.country,
				city: res.body.location.name,
				status: res.body.current.condition.text,
				icon: res.body.current.condition.icon,
				temp: res.body.current.temp_c,
			};
			callback(undefined, data);
		}
	});
};

module.exports = forecast;
