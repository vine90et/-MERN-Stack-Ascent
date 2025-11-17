import axios from "axios";
import { useEffect } from "react";

const base_url = "http://localhost:3000/api"

export const fetchAllProject = async ()=>{
    try {
        const responce = await axios.get(`${base_url}/projects`);
        console.log("Project data", responce.data);
        return responce.data;
    } catch (error) {
        console.log('Error fetching project from Database:', error)
        throw error;
    }
}
