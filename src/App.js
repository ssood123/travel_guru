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
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        setCoordinates({lat: latitude, lng: longitude})
      })
    },[])

    useEffect(() => {
      const filteredPlaces = places.filter((place) => {
        return place.rating >= rating;
      })
      setFilteredPlaces(filteredPlaces);
    },[rating])

    useEffect(() => {
      if (boundaries.sw && boundaries.ne) {
        setIsLoading(true);
        getPlacesData(type, boundaries.sw,boundaries.ne)
        .then((data) => {
          data = data.filter(place => place.name && place.num_reviews > 0)
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
        })
      }
    },[type, boundaries]);


    return (
      <>
          <CssBaseline />
          <Header setCoordinates={setCoordinates} />
          <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
              <List 
                places={filteredPlaces.length > 0 ? filteredPlaces : places} 
                childClicked={childClicked} 
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                setCoordinates={setCoordinates}
                setBoundaries={setBoundaries}
                coordinates={coordinates}
                places={filteredPlaces.length > 0 ? filteredPlaces : places}
                setChildClicked={setChildClicked} 
              />
            </Grid>
          </Grid>
      </>  
    )
}

export default App;