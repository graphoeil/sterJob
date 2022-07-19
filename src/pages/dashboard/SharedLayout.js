// Imports
import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";

// Component
const SharedLayout = () => {

	// Return
	return(
		<Wrapper>
			<main className="dashboard">
				<SmallSidebar/>
				<BigSidebar/>
				<div>
					<Navbar/>
					<div className="dashboard-page">
						{/* Outlet component render active nested route,
						here <Stats/> because of index in App.js */}
						<Outlet/>
					</div>
				</div>
			</main>
		</Wrapper>
	);

};

// Export
export default SharedLayout;