import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

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
      'x-rapidapi-key': '649d26e0e7msh9d3b527717761edp139df8jsn9fd1f46c21e9'
    }
  };
  */

export const getPlacesData = async (southwest, northeast) => {
    try {
        console.log('southwest')
        console.log(southwest)
        console.log('northeast')
        console.log(northeast)
        const {data: { data }} = await axios.get(URL,{
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