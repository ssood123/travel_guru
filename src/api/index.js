import axios from 'axios';

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

/*
const options = {
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359',
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': ''
    }
  };
  */

export const getPlacesData = async (type, southwest, northeast) => {
    try {
        console.log('southwest')
        console.log(southwest)
        console.log('northeast')
        console.log(northeast)
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: southwest.lat,
            tr_latitude: northeast.lat,
            bl_longitude: southwest.lng,
            tr_longitude: northeast.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '',
          }
        });
        return data;
    } catch(error) {
        console.log(error);
    }
}