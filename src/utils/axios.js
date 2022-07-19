// Imports
import axios from "axios";

// Custom axios instance, 
// for not repeating baseURL, and many others params everywhere
const customFetch = axios.create({
	baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

// Export
export default customFetch;