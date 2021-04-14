export const getLocationFunction = (setLocation) => {
  // check if geolocation is possible. navigator.geolocation returns an object
  if (navigator.geolocation) {
    const success = (pos) => {
      const query = pos.coords.latitude + "," + pos.coords.longitude;
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          let city = result.results[0].components.city;
          let country = result.results[0].components.country;
          setLocation({ city: city, country: country });
        });
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      //if position is cached, should I used it again or get a new position from geolocation API.
      maximumAge: 0,
    };

    //get coordinates from browser
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log("Geolocation is not supported by the user browser.");
  }
};
