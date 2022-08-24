// Imports
import customFetch from "../../utils/axios";
import firstLetterUpper from "../../utils/firstLetterUpper";
import { logoutUser, clearStore } from "./userSlice";
import { clearValues } from "../job/jobSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";

// Thunk methods
export const registerUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/register', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const loginUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/login', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const updateUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.patch('/auth/updateUser', user, {
			headers:{
				// Here with getState we access user store and then user in state ,-)
				authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
			}
		});
		return response.data;
	} catch (error){
		if (error.response.status === 401){
			// Logout the user if rejected because the user don't have valid 
			// credentials and have nothing to do here !
			thunkAPI.dispatch(clearStore());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
// Clear all value when logout
export const clearStoreThunkFn = async(message, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearValues());
		thunkAPI.dispatch(clearAllJobsState());
		return Promise.resolve();
	} catch (error){
		return Promise.reject();
	}
};