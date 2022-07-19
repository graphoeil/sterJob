// Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

// Component
const Stats = () => {

	// Store
	const { isLoading, monthlyApplications } = useSelector((store) => { return store.allJobs; });

	// Dispatch
	const dispatch = useDispatch();

	// Load stats
	useEffect(() => {
		dispatch(showStats());
	},[dispatch]);

	// Returns
	if (isLoading){
		return <Loading center/>;
	}
	return(
		<React.Fragment>
			<StatsContainer/>
			{
				monthlyApplications.length > 0 && <ChartsContainer/>
			}
		</React.Fragment>
	);

};

// Export
export default Stats;