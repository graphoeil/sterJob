// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunkFn, showStatsThunkFn } from "./allJobsThunk";

// Initial states
const initialFilterState = {
	search:'',
	searchStatus:'all',
	searchType:'all',
	sort:'latest',
	sortOptions:['latest','oldest','a-z','z-a']
};
const initialState = {
	isLoading:true,
	jobs:[],
	totalJobs:0,
	numOfPages:1,
	page:1,
	stats:{},
	monthlyApplications:[],
	...initialFilterState
};

// Async functions
// Don't forget we trigger getAllJobs in JobsContainer.js 
// by watching change of the filters in the useEffect ,-)
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunkFn);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunkFn);

// Slice
const allJobsSlice = createSlice({
	name:'allJobs',
	initialState,
	reducers:{
		// Show loading
		showLoading:(state) => {
			state.isLoading = true;
		},
		// Hide loading
		hideLoading:(state) => {
			state.isLoading = false;
		},
		// Search, handle inputs change
		handleChange:(state, { payload }) => {
			const { name, value } = payload;
			// We reset page to page 1 because we change filters
			state.page = 1;
			state[name] = value;
		},
		// Clear filters
		clearFilters:(state) => {
			return { ...state, ...initialFilterState };
		},
		// Change page (JobsContainer.js)
		changePage:(state, { payload }) => {
			state.page = payload;
		},
		// Clear all state and filters
		clearAllJobsState:() => {
			return initialState;
		}
	},
	extraReducers:{
		// Get all jobs
		[getAllJobs.pending]:(state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]:(state, { payload }) => {
			state.isLoading = false;
			state.jobs = payload.jobs;
			state.totalJobs = payload.totalJobs;
			state.numOfPages = payload.numOfPages;
		},
		[getAllJobs.rejected]:(state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		// Show stats
		[showStats.pending]:(state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]:(state, { payload }) => {
			state.isLoading = false;
			state.stats = payload.defaultStats;
			state.monthlyApplications = payload.monthlyApplications;
		},
		[showStats.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		}
	}
});

// Actions export
export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

// Reducer export
export default allJobsSlice.reducer;