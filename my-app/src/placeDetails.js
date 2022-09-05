import {React, useState, useEffect } from "react"
import $ from 'jquery'

const api_key = "AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8"

function Restaurant(props) {
    const [restaurantName, setRestaurant] = useState('')
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

     useEffect(() => {
        const fields = ["name", "rating", "formatted_phone_number", "formatted_address"]
        const detailEndpoint = "https://maps.googleapis.com/maps/api/place/details/json"
        const detailParams = {
            "place_id": props.place_id,
            "fields" : fields.join(','),
            "key": api_key
        }
        const encodedPlaceParameters = $.param(detailParams)
        const detailURL = `${detailEndpoint}?${encodedPlaceParameters}`
        console.log('detailURL: ' + detailURL)

        fetch(detailURL)
        //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setRestaurant(result.result.name)
                console.log("Place Name = " + result.result.name)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        },[props.place_id])

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <p>{restaurantName}</p>
        );
      }

}

export default Restaurant 