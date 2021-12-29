import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline,Grid } from '@material-ui/core';
import { getPlacesData } from './api/index';


const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [boundaries, setBoundaries] = useState(null);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        setCoordinates({lat: latitude, lng: longitude})
      })
    },[])

    useEffect(() => {
      if (boundaries && coordinates) {
        console.log('coordinates')
        console.log(coordinates)
        console.log('boundaries')
        console.log(boundaries);
        getPlacesData(boundaries.sw,boundaries.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
        })
      }
    },[coordinates, boundaries]);

    return (
      <>
          <CssBaseline />
          <Header />
          <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
              <List places={places}/>
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                setCoordinates={setCoordinates}
                setBoundaries={setBoundaries}
                coordinates={coordinates} 
              />
            </Grid>
          </Grid>
      </>  
    )
}

export default App;