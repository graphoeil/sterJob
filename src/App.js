// Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Landing, Error, ProtectedRoute, Register } from "./pages";
import { SharedLayout, AddJob, AllJobs, Profile, Stats } from "./pages/dashboard";

// Component
const App = () => {

	// Return
	return(
		<Router>
			<Routes>
				<Route path="/" element={ <ProtectedRoute>
					<SharedLayout/>
				</ProtectedRoute> }>
					{/* Nested routes */}
					<Route index element={ <Stats/> }/>
					<Route path="all-jobs" element={ <AllJobs/> }/>
					<Route path="add-job" element={ <AddJob/> }/>
					<Route path="profile" element={ <Profile/> }/>
				</Route>
				<Route path="/landing" element={ <Landing/> }/>
				<Route path="/register" element={ <Register/> }/>
				<Route path="*" element={ <Error/> }/>
			</Routes>
			<ToastContainer position="top-center" autoClose={ 1777 }/>
		</Router>
	);

};

// Export
export default App;