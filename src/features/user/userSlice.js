// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";
import { registerUserThunkFn, loginUserThunkFn, updateUserThunkFn, clearStoreThunkFn } from "./userThunk";

// Initial state
const initialState = {
	isSidebarOpen:false,
	isLoading:false,
	user:getUserFromLocalStorage()
};

// Async methods
// user variable comes from Register.js and Profile.js in (pages subfolder)
export const registerUser = createAsyncThunk('user/registerUser', (user, thunkAPI) => {
	return registerUserThunkFn('/auth/register', user, thunkAPI);
});
export const loginUser = createAsyncThunk('user/loginUser', (user, thunkAPI) => {
	return loginUserThunkFn('/auth/login', user, thunkAPI);
});
export const updateUser = createAsyncThunk('user/updateUser', (user, thunkAPI) => {
	return updateUserThunkFn('/auth/updateUser', user, thunkAPI);
});
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunkFn);

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Toggle sidebar
		toggleSidebar:(state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		// Logout
		logoutUser:(state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload){
				toast.success(payload);
			}
		}
	},
	extraReducers:{
		// Register user
		[registerUser.pending]:(state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]:(state, action) => {
			// Because action.payload is response.data
			// and user is a property of data ,-)
			const { user } = action.payload;
			addUserToLocalStorage(user);
			state.isLoading = false;
			state.user = user;
			toast.success(`Hello there ${ user.name }`);
		},
		[registerUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			// Because here payload is the message
			// We destructure it from action ,-)
			toast.error(payload);
		},
		// Login user
		[loginUser.pending]:(state) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]:(state, { payload }) => {
			const { user } = payload;
			addUserToLocalStorage(user);
			state.isLoading = false;
			state.user = user;
			toast.success(`Welcome back ${ user.name }`);
		},
		[loginUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Update user
		[updateUser.pending]:(state) => {
			state.isLoading = true;
		},
		[updateUser.fulfilled]:(state, { payload }) => {
			const { user } = payload;
			addUserToLocalStorage(user);
			state.isLoading = false;
			state.user = user;
			toast.success('User updated');
		},
		[updateUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Clear store
		[clearStore.rejected]:() => {
			toast.error('There was an error...');
		}
	}
})

// Actions export
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;