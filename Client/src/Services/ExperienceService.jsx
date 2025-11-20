import axios from 'axios';

const baseUrl = 'http://localhost:3000/api'

export const fetchAllExp = async()=>{
    try {
        const responce = await axios.get(`${baseUrl}/experience`);
        console.log("Experience data", responce.data);
        return responce.data;
    } catch (error) {
        console.log('Error fetching Experience from Database:', error)
        throw error;
    }
}