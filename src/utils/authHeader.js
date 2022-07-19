// Auth header (Bearer)
const authHeader = (thunkAPI) => {
	return {
		headers:{
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
};

// Export
export default authHeader;