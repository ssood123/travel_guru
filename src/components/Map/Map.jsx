import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map = ({setCoordinates,setBoundaries,coordinates,places}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    //const coordinates = {lat: 0, lng: 0};

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key:''}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    console.log('onchange')
                    console.log(e)
                    setCoordinates({lat: e.center.lat, lng: e.center.lng })
                    setBoundaries({ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={''}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            isMobile ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'http://www.greatwallbedford.com/wp-content/uploads/2012/11/take-out-lexington-copy-3.jpg'}
                                        alt={place.name} 
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }

                    </div>
                ))}
            </GoogleMapReact>

        </div>
    )
}

export default Map;