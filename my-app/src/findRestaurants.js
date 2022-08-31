import {React, useState, useEffect } from "react"
// class APIHandling extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isLoaded: false,
//             lat: null,
//             lng: null,
//             location_query: null,
//             api_key: "AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8",
//             result_amount: 3
//         };
//         this.findLocation = this.findLocation.bind(this);
//     }

//     // findLocation(){
//     //     var endpoint = "https://maps.googleapis.com/maps/api/geocode/json"
//     //     var params = {"address":this.location_query, "key": this.api_key}
//     //     var url_params = encodeURIComponent(params)
//     //     var url = endpoint + "?" + url_params

//     //     useEffect(()  =>{
//     //     fetch(url)
//     //     .then(res => res.json())
//     //     .then(
//     //         (result) => {
//     //             // this.setState({
//     //             //     isLoaded: true,
//     //             //     lat: result.lat
//     //             //      ['results'][0]['geometry']['location']
//     //             // })
//     //             // console.log(result[0].geometry.location)
//     //             this.setState({lat: 123})
//     //             console.log("hey")
//     //             return("suh")
//     //         }
//     //     )
//     // }, []);

//     useEffect(() => {
//         var endpoint = "https://maps.googleapis.com/maps/api/geocode/json";
//         var params = {"address":this.location_query, "key": this.api_key};
//         var url_params = encodeURIComponent(params);
//         var url = endpoint + "?" + url_params;

//         fetch(url)
//             .then(res => res.json())
//             .then(
//                 (results) => {
//                     setIsLoaded(true);
//                     setItems(result);
//                 },
//             (error) => {
//                 setIsLoaded(true);
//                 setError(error);
//             }
//             )
//     },[])


// //     render(){
        
// //         return(
// //             <p>{this.l}</p>
// //         );
// //     }
// // }

// export default APIHandling;
const api_key = "AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8"

function FindLocation(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [location, setLocation] = useState({})

    const endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="
    const location_parsed = props.location_query.replace(/,/g,'')
    const encoded_address = encodeURI(location_parsed)
    // const url_params = encodeURIComponent(params)
    const url = endpoint + encoded_address + "&key=" + api_key
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      console.log("encoded addres " + encoded_address)
      console.log("hey" + props.location_query)
      console.log(url)
      fetch(url)
       //fetch("https://maps.googleapis.com/maps/api/geocode/json?address=42906+Fairlee+Dr%2C+Lancaster%2C+CA&key=AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setLocation(result.results[0].geometry.location);
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
    }, [])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <p>{location.lat} {location.lng} </p>
      );
    }
  }

  export default FindLocation;
