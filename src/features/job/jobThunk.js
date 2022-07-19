// Imports
import customFetch from "../../utils/axios";
import firstLetterUpper from "../../utils/firstLetterUpper";
// Because the deleteJob method is here, but we call it from AllJobs which
// use allJobsSlice, then we must trigger showLoading and hideLoading
// while delete the job, and trigger getAllJobs when request is completed
// to get and show all jobs from the server 
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import { clearStore } from "../user/userSlice";

// Auth header (Bearer)
// See also axios.interceptors in Jobster which avoid to declare
// authHeader for each axios request ,-)
const authHeader = (thunkAPI) => {
	return {
		headers:{
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
};

// Thunks
export const createJobThunkFn = async(job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		if (error.response.status === 401){
			// Logout and clear values
			thunkAPI.dispatch(clearStore());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const deleteJobThunkFn = async(jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${ jobId }`, authHeader(thunkAPI));
		// No need to hideLoading it's included in the extraReducer of getAllJobs
		thunkAPI.dispatch(getAllJobs());
		return response.data.msg;
	} catch (error){
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
export const editJobThunkFn = async({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${ jobId }`, job, authHeader(thunkAPI));
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};