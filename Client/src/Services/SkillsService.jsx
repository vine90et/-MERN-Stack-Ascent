import axios from 'axios';

const base_url = 'http://localhost:3000/api'

export const fetchAllSkills = async()=>{
    try {
        const responce = await axios.get(`${base_url}/skills`);
        console.log('skills:', responce.data);
        return responce.data;
    } catch (error) {
        console.log('Error fetching skill from Database:', error)
        throw error
    }
}