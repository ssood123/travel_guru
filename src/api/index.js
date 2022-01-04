import axios from 'axios';


export const getPlacesData = async (type, southwest, northeast) => {
    try {
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: southwest.lat,
            tr_latitude: northeast.lat,
            bl_longitude: southwest.lng,
            tr_longitude: northeast.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          }
        });
        return data;
    } catch(error) {
        console.log(error);
    }
}