import {React, useState, useEffect } from "react"
import $ from 'jquery'
import Restaurant from './placeDetails.js';

const api_key = "AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8"

function FindPlace(props) {
    const [placeID, setPlaceID] = useState('')
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

     useEffect(() => {
      const searchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
      const searchParameters = {
        "key": api_key,
        "location": `${props.lat},${props.lng}`,
        "radius": 500,
        "keyword": "Sushi"
    }
      const encodedSearchParameters = $.param(searchParameters)
      const searchURL = `${searchEndpoint}?${encodedSearchParameters}`

      // fetch('https://git.heroku.com/mysterious-refuge-12104.git' + searchURL)
      fetch(searchURL)
      //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setPlaceID(result.results[0].place_id)
            console.log("PlaceID = " + result.results[0].place_id)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )

        // const fetchData = async () => {
        //   console.log("begging to fetch")
        //   const response = await fetch(searchURL)
        //   const newData = await response.json()
        //   setPlaceID(newData.results[0].place_id)
        // };
        // fetchData();
      },[props.lat, props.lng])

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <header>
            <p>{placeID}</p>
            <Restaurant
              place_id = {placeID}
            />
          </header>

        );
      }

}

export default FindPlace 