// Imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { handleChange, clearValues, createJob, editJob } from "../../features/job/jobSlice";

// Component
const AddJob = () => {

	// Store
	const { isLoading, position, company, jobLocation, 
		jobType, jobTypeOptions, status, statusOptions, 
		isEditing, editJobId } = useSelector((store) => { return store.job; });

	// Dispatch
	const dispatch = useDispatch();

	// Inputs change
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Submit form
	const navigate = useNavigate();
	const submitForm = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation){
			toast.error('Please fill out all fields !');
			return;
		}
		// Send for jobSlice.js
		if (!isEditing){
			dispatch(createJob({ position, company, jobLocation, jobType, status }));
		} else {
			dispatch(editJob({ jobId:editJobId, job:{ position, company, jobLocation, jobType, status } }));
		}
		// Navigate to all-jobs
		navigate('/all-jobs');
	};

	// Return
	return(
		<Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h3>{ isEditing ? 'Edit job' : 'Add job' }</h3>
				<div className="form-center">

					{/* Position */}
					<FormRow type="text" name="position" 
						value={ position } handleChange={ handleJobInput }/>
					{/* Position */}

					{/* Company */}
					<FormRow type="text" name="company" 
						value={ company } handleChange={ handleJobInput }/>
					{/* Company */}

					{/* Job location */}
					<FormRow type="text" name="jobLocation" labelText="Job location"
						value={ jobLocation } handleChange={ handleJobInput }/>
					{/* Job location */}

					{/* Job status */}
					<FormRowSelect name="status" labelText="Job status" value={ status } 
						handleChange={ handleJobInput } options={ statusOptions }/>
					{/* Job status */}

					{/* Job type */}
					<FormRowSelect name="jobType" labelText="Job type" value={ jobType } 
						handleChange={ handleJobInput } options={ jobTypeOptions }/>
					{/* Job type */}

					{/* Buttons */}
					<div className="btn-container">
						<button type="button" className="btn btn-block clear-btn" 
							onClick={ () => { dispatch(clearValues()); } }>
							Clear
						</button>
						<button type="submit" className="btn btn-block submit-btn" 
							onClick={ submitForm } disabled={ isLoading }>
							Submit
						</button>
					</div>
					{/* Buttons */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default AddJob;