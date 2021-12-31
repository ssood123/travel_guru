import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline,Grid } from '@material-ui/core';
import { getPlacesData } from './api/index';


const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [boundaries, setBoundaries] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        getPlacesData(boundaries.sw,boundaries.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
          setIsLoading(false);
        })
      }
    },[coordinates, boundaries]);

    return (
      <>
          <CssBaseline />
          <Header />
          <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
              <List places={places} childClicked={childClicked} isLoading={isLoading}/>
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                setCoordinates={setCoordinates}
                setBoundaries={setBoundaries}
                coordinates={coordinates}
                places={places}
                setChildClicked={setChildClicked} 
              />
            </Grid>
          </Grid>
      </>  
    )
}

export default App;