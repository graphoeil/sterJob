// Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

// Component
const JobsContainer = () => {

	// Store
	const { jobs, isLoading, totalJobs, page, 
		numOfPages, search, searchStatus, searchType, sort } = useSelector((store) => { return store.allJobs; });

	// Dispatch
	const dispatch = useDispatch();

	// Get all jobs
	useEffect(() => {
		dispatch(getAllJobs());
	},[dispatch, page, search, searchStatus, searchType, sort]);

	// Returns
	if (isLoading){
		return(
			<Wrapper>
				<Loading center/>
			</Wrapper>
		);
	}
	if (jobs.length === 0){
		return(
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}
	return(
		<Wrapper>
			<h5>{ totalJobs } job{ totalJobs > 1 && 's' } found</h5>
			<div className="jobs">
				{
					jobs.map((job) => {
						return <Job key={ job._id } { ...job }/>;
					})
				}
			</div>
			{
				numOfPages > 1 && <PageBtnContainer/>
			}
		</Wrapper>
	);

};

// Export
export default JobsContainer;