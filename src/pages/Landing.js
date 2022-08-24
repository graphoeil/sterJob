// Imports
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import jobHunt from "../assets/images/jobHunt.svg";
import { Logo } from "../components";

// Component
const Landing = () => {

	// Return
	return(
		<Wrapper>
			<nav>
				<Logo/>
			</nav>
			<div className="container page">
				
				{/* Info */}
				<div className="info">
					<h1>Job <span>tracking</span> app</h1>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, non! Deserunt laborum, 
						consectetur harum iure sit eos deleniti accusamus ex rerum. Nostrum doloribus 
						fugit maiores quam id quo, laborum deleniti.</p>
					<Link className="btn btn-hero" to="/register">
						Login / Register
					</Link>
				</div>
				{/* Info */}
				
				{/* Main image, It's a 2 column layout */}
				<img src={ jobHunt } alt="Job hunt" className="img main-img" />
				{/* Main image */}
			
			</div>
		</Wrapper>
	);

};

// Export
export default Landing;