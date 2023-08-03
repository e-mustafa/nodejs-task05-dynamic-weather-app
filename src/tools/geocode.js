const request = require("request");

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZS1tdXN0YWZhIiwiYSI6ImNsa2VuaDRveTFjbmEzbHRqMHZic252dDYifQ.pm8umeldARavF9wnc9K2fw`;

	request({ url, json: true }, (error, res) => {
		if (error) {
			callback("Unable to connect to Geocode service", undefined);
		} else if (res.body.error) {
			callback("Error from Geocoding API access", undefined);
		} else if (res.body.features.length == 0) {
			callback("Your search is invalid", undefined);
		} else {
			callback(undefined, {
				latitude: res.body.features[0].center[0],
				longitude: res.body.features[0].center[1],
			});
		}
	});
};

module.exports = geocode;
