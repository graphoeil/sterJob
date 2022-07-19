// Imports
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notfound from "../assets/images/not-found.svg";

// Component
const Error = () => {

	// Return
	return(
		<Wrapper className="full-page">
			<div>
				<img src={ notfound } alt="404!" />
				<h3>Ooh ! page not found</h3>
				<p>We can't seem to find the pages you're looking for...</p>
				<Link to="/">Back home</Link>
			</div>
		</Wrapper>
	);

};

// Export
export default Error;