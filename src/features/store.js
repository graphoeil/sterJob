// Imports
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import jobReducer from "./job/jobSlice";
import allJobsReducer from "./allJobs/allJobsSlice";

// Combine reducer
export const store = configureStore({
	reducer:{
		user:userReducer,
		job:jobReducer,
		allJobs:allJobsReducer
	}
});