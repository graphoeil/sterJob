// Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "../components";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";

// Component
const SearchContainer = () => {

	// Stores
	const { isLoading, searchStatus, searchType, 
		sort, sortOptions } = useSelector((store) => { return store.allJobs; });
	const { statusOptions, jobTypeOptions } = useSelector((store) => { return store.job; });

	// Dispatch
	const dispatch = useDispatch();

	// Search change
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(handleChange({ name:'search', value:searchValue }));
		}, 250);
		return () => {
			clearTimeout(timer);
		};
	},[searchValue, dispatch]);

	// Select change
	const handleSearch = (e) => {
		if (isLoading){ return; }
		dispatch(handleChange({ name:e.target.name, value:e.target.value }));
	};


	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		dispatch(clearFilters());
		setSearchValue('');
	};

	// Return
	return(
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">

					{/* Search position */}
					<FormRow type="text" labelText="Position" name="search" value={ searchValue } 
						handleChange={ (e) => { setSearchValue(e.target.value) } }/>
					{/* Search position */}

					{/* Search status */}
					<FormRowSelect labelText="Job status" name="searchStatus" value={ searchStatus } 
						handleChange={ handleSearch } options={ ['all', ...statusOptions] }/>
					{/* Search status */}

					{/* Search type */}
					<FormRowSelect labelText="Job type" name="searchType" value={ searchType } 
						handleChange={ handleSearch } options={ ['all', ...jobTypeOptions] }/>
					{/* Search type */}

					{/* Sort */}
					<FormRowSelect labelText="Sort" name="sort" value={ sort } 
						handleChange={ handleSearch } options={ sortOptions }/>
					{/* Sort */}

					{/* Clear btn */}
					<button className="btn btn-block btn-danger" disabled={ isLoading } 
						onClick={ submitForm }>
						Clear
					</button>
					{/* Clear btn */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default SearchContainer;