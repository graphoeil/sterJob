// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunkFn, deleteJobThunkFn, editJobThunkFn } from "./jobThunk";

// Initial state
const initialState = {
	isLoading:false,
	position:'',
	company:'',
	jobLocation:'',
	jobTypeOptions:['full-time', 'part-time', 'remote', 'internship'],
	jobType:'full-time',
	statusOptions:['interview', 'declined', 'pending'],
	status:'pending',
	isEditing:false,
	editJobId:''
};

// Async methods
export const createJob = createAsyncThunk('job/createJob', createJobThunkFn);
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunkFn);
export const editJob = createAsyncThunk('job/editJob', editJobThunkFn);

// Slice
const jobSlice = createSlice({
	name:'job',
	initialState,
	reducers:{
		// Handle change input fields in AddJob.js
		handleChange:(state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
		// Reset fields
		clearValues:() => {
			return { ...initialState, jobLocation:getUserFromLocalStorage()?.location || '' };
		},
		// Set edit job, submit from Job.js
		setEditJob:(state, { payload }) => {
			// Make a copy of the state, set isEditing to true
			// and overwrite state value passed in the payload
			return { ...state, isEditing:true, ...payload };
		}
	},
	extraReducers:{
		// Create job
		[createJob.pending]:(state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]:(state) => {
			state.isLoading = false;
			toast.success('Job created !');
		},
		[createJob.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Delete job
		[deleteJob.fulfilled]:() => {
			toast.success('Job deleted !');
		},
		[deleteJob.rejected]:(_, { payload }) => {
			toast.error(payload);
		},
		// Edit job
		[editJob.pending]:(state) => {
			state.isLoading = true;
		},
		[editJob.fulfilled]:(state) => {
			state.isLoading = false;
			toast.success('Job modified !');
		},
		[editJob.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		}
	}
});

// Actions export
export const {handleChange, clearValues, setEditJob } = jobSlice.actions;

// Reducer export
export default jobSlice.reducer;