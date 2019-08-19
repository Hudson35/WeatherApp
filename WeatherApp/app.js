window.addEventListener("load", () => {
	let long;	//longitude
	let lat;	//latidute
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			//at end of api is latitude, and then longitude
			const api = `${proxy}https://api.darksky.net/forecast/d0071de7fab6cb5707189a3ebd6531db/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					//shows the json data in chrome console
					//console.log(data);
					const { temperature, summary, icon } = data.currently;
					//Set DOM Elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					//Formula for Celsius
					let celsius = (temperature - 32) * (5 / 9);

					//Set Icon
					setIcons(icon, document.querySelector('.icon'));

					//Change temperature to Celsius/Farenheit
					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === "F") {
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();	//Replaces every - with a _ 
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});