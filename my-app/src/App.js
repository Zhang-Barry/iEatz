import logo from './logo.svg';
// import test_logo from './images/test_logo.PNG';
// import Barry_pfp from './images/Barry.jpg';
// import Tiffany_pfp from './images/Tiffany_Yan.jpg';
// import Joshua_pfp from './images/Joshua_Lee.jpg';

import './App.css';
// import Places from 'google-places-web';

// Places.apiKey = 'AIzaSyDuqGl-r_6EMdZbBgml5nYde373e2X8Rq8';
import APIHandling from './findRestaurants.js';

import {
  Box, 
  Input, 
  SkeletonText,
  Button
} from '@chakra-ui/react'

import {
  useLoadScript,
  useJsApiLoader,
  Autocomplete
} from '@react-google-maps/api'

import { useEffect, useRef, useState } from 'react'
import { useForceUpdate } from 'framer-motion';


function NavBar(){
  return(
    <div>
      <ul className='nav-bar-ul'>
        <li className='nav-bar-li'><a>Home</a></li>
        <li className='nav-bar-li'><a>About Us</a></li>
        <li className='nav-bar-li'><a>Bookmarked</a></li>
      </ul>
    </div>
  );
}

export default function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })
  const [locationString, setLocation] = useState('')
  const [submitted, setSubmit] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  const destiantionRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // async function submitted(){
  //   setLocation(String(originRef))
  // }

  if (!isLoaded) {
    return <p>didn't load</p>
  }

  async function submitLocation()
  {
    // originRef.current.focus();
    setLocation(String(originRef.current.value))
  }
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <p>
    //       Enter location
    //     </p>
    //     <input 
    //       name = "location"
    //     ></input>
    //   </header>
    // </div>

    <div className = "App">
      <header className = "App-header">
        <NavBar/>
        {/* <ul>
          <li className='nav-bar-li'><a>Home</a></li>
          <li className='nav-bar-li'><a>About Us</a></li>
          <li className='nav-bar-li'><a>Bookmarked</a></li>
        </ul> */}

        <h1>Welcome to iEatz</h1>
        {/* <img src={test_logo} alt=""/> */}
        <p>Enter your location</p>
        <Autocomplete>
            <Input type='text' placeholder='Current Location' ref={originRef}/>
          </Autocomplete>
        {/* <p>{originRef.current.value}</p> */}
        <Button colorScheme='pink' type='submit' onClick={submitLocation}>Submit</Button>
        <APIHandling
          locationQuery =  {locationString}//{String(originRef.current.value)}
        />
        {locationString}
      <p></p>
      </header>
    </div>
  );
}

function About(){
  return(
    <div className = "App">
      <header className="App-header">
        <ul className='nav-bar-ul'>
            <li className='nav-bar-li'><a>Home</a></li>
            <li className='nav-bar-li'><a>About Us</a></li>
            <li className='nav-bar-li'><a>Bookmarked</a></li>
        </ul>
        <h1>About Us</h1>
        <ul className="profiles-ul">
            <li className="profiles-li">
              <div className="profile-container">
                {/* <img className="profile-pictures" src={Joshua_pfp} alt=""/> */}
                <p>Joshua Lee</p>
              </div>
            </li>
            <li className="profiles-li">
              <div className="profile-container">
                {/* <img className="profile-pictures" src={Tiffany_pfp} alt=""/> */}
                <p>Tiffany Lin</p>
              </div>
            </li>

            <li className="profiles-li">
              <div className="profile-container">
                {/* <img className="profile-pictures" src={Barry_pfp} alt=""/> */}
                <p>Barry Zhang</p>
              </div>
            </li>
        </ul> 
      </header>
    </div>
  );
}

export {App, About};
