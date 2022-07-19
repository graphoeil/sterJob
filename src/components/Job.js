// Imports
import React from "react";
import { useDispatch } from "react-redux";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { deleteJob, setEditJob } from "../features/job/jobSlice";

// Component
const Job = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {

	// Dispatch
	const dispatch = useDispatch();

	// Formatted date with moment.js
	const date = moment(createdAt).format('MMM Do, YYYY');

	// Edit job
	const handleEditJob = () => {
		dispatch(setEditJob({ editJobId:_id, position, company, jobLocation, jobType, createdAt, status }));
	};

	// Return
	return(
		<Wrapper>
			<header>
				<div className="main-icon">{ company.charAt(0) }</div>
				<div className="info">
					<h5>{ position }</h5>
					<p>{ company }</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo icon={ <FaLocationArrow/> } text={ jobLocation }/>
					<JobInfo icon={ <FaCalendarAlt/> } text={ date }/>
					<JobInfo icon={ <FaBriefcase/> } text={ jobType }/>
					<div className={ `status ${ status }` }>{ status }</div>
				</div>
				<footer>
					<div className="actions">
						<Link to="/add-job" className="btn edit-btn" onClick={ handleEditJob }>
							Edit
						</Link>
						<button type="button" className="btn delete-btn" onClick={ () => { dispatch(deleteJob(_id)); } }>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);

};

// Export
export default Job;