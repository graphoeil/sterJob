// Import
import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

// Component
const NavLinks = ({ closeSidebar }) => {

	// Return
	return(
		<div className="nav-links">
			{
				links.map((link) => {
					const { text, path, id, icon } = link;
					return(
						<NavLink key={ id } to={ path } className={ ({ isActive }) => {
							return `nav-link ${ isActive ? 'active' : '' }`;
						} } onClick={ closeSidebar }>
							<span className="icon">{ icon }</span>
							{ text }
						</NavLink>
					)
				})
			}
		</div>
	);

};

// Export
export default NavLinks;