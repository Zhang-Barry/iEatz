import {React, useState, useEffect } from "react"
import $ from 'jquery'
import PlaceFinder from './findPlace.js';


const api_key = "AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8"

function FindLocation(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [location, setLocation] = useState({})
    // const [placeID, setPlaceID] = useState('')

    // const endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="
    // const locationParsed = props.locationQuery.replace(/,/g,'')
    // const encodedAddress = encodeURI(locationParsed)
    // // const url_params = encodeURIComponent(params)
    // const url = endpoint + encodedAddress + "&key=" + api_key
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      const lat_lng_endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="
      const locationParsed = props.locationQuery.replace(/,/g,'')
      const encodedAddress = encodeURI(locationParsed)
      // const url_params = encodeURIComponent(params)
      const url = lat_lng_endpoint + encodedAddress + "&key=" + api_key
      // console.log("encoded addres " + encodedAddress)
      // console.log("hey" + props.locationQuery)
      // console.log(url)

    //   const searchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    //   const searchParameters = {
    //     "key": api_key,
    //     "location": `${location.lat},${location.lng}`,
    //     "radius": 500,
    //     "keyword": "Mexican Food"
    // }
    //   const encodedSearchParameters = $.param(searchParameters)
    //   const searchURL = `${searchEndpoint}?${encodedSearchParameters}`

    //   console.log("searchURL " + searchURL)

      fetch(url)
       //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setLocation(result.results[0].geometry.location)
            console.log(result.results[0].geometry.location)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
      
      //Fetching placeID of restaurant locations
      // fetch(searchURL)
      // //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //       setIsLoaded(true);
      //       setPlaceID(result.results[0].place_id)
      //       console.log("PlaceID = " + result.results[1].place_id)
      //     },
      //     // Note: it's important to handle errors here
      //     // instead of a catch() block so that we don't swallow
      //     // exceptions from actual bugs in components.
      //     (error) => {
      //       setIsLoaded(true);
      //       setError(error);
      //     }
      //   )
          
    }, [props.locationQuery])

    // useEffect(() => {
    //   const searchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    //   const searchParameters = {
    //     "key": api_key,
    //     "location": `${location.lat},${location.lng}`,
    //     "radius": 500,
    //     "keyword": "Mexican Food"
    // }
    //   const encodedSearchParameters = $.param(searchParameters)
    //   const searchURL = `${searchEndpoint}?${encodedSearchParameters}`

    //   console.log("searchURL " + searchURL)

    //   fetch('https://git.heroku.com/mysterious-refuge-12104.git' + searchURL)
    //   //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setIsLoaded(true);
    //         //setPlaceID(result.results[0].place_id)
    //         console.log("PlaceID = " + result.results.plus_code)
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )

    //     // const fetchData = async () => {
    //     //   console.log("begging to fetch")
    //     //   const response = await fetch(searchURL)
    //     //   const newData = await response.json()
    //     //   setPlaceID(newData.results[0].place_id)
    //     // };
    //     // fetchData();
    //   },[location.lat, location.lng]
    // )

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
                    <p>{location.lat} {location.lng} </p>
          <p>
          <PlaceFinder
            lat = {location.lat}
            lng = {location.lng}/>
          </p>
        </header>

      );
    }
  }

  export default FindLocation;
