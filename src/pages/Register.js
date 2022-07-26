// Imports
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { loginUser, registerUser } from "../features/user/userSlice";

// Initial state
const initialState = {
	name:'',
	email:'',
	password:'',
	isMember:true
};

// Component
const Register = () => {

	// Autofocus on first input
	const nameRef = useRef();
	const emailRef = useRef();
	useEffect(() => {
		emailRef.current.focus();
	},[]);

	// Store
	const { user, isLoading } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// State
	const [state, setState] = useState(initialState);
	const { name, email, password, isMember } = state;

	// Redirect to dashboard if already connected
	const navigate = useNavigate();
	useEffect(() => {
		if (user){
			setTimeout(() => {
				navigate('/');
			},1000);
		}
		// No problems to add navigate in dependencies
		// because navigate function will never change
		// because it's created with use function
	},[user, navigate]);

	// Inputs change
	const handleChange = (e) => {
		setState((oldState) => {
			return {
				...oldState, [e.target.name]:e.target.value
			};
		});
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		if (!email || !password || (!isMember && !name)){
			// https://fkhadra.github.io/react-toastify/introduction/
			toast.error('Please fill out all fields', {
				autoClose:1777
			});
			return;
		}
		if (isMember){
			dispatch(loginUser({ email, password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};

	// Demo
	const showDemo = () => {
		dispatch(loginUser({ email:'testUser@test.com', password:'secret' }));
	};

	// Toggle member
	const toggleMember = () => {
		setState((oldState) => {
			return { 
				...oldState, isMember:!isMember 
			};
		});
		// Reset autofocus, setTimeout => because it's asynchronous ,-)
		setTimeout(() => {
			if (!isMember){
				emailRef.current.focus();
			} else {
				nameRef.current.focus();
			}
		}, 50);
	};

	// Return
	return(
		<Wrapper className="full-page">
			<form className="form" onSubmit={ submitForm }>

				{/* Header */}
				<Logo/>
				<h3>{ isMember ? 'Login' : 'Register' }</h3>
				{/* Header */}

				{/* Name */}
				{
					!isMember && <FormRow type="text" name="name" ref={ nameRef }
						value={ name } handleChange={ handleChange }/>
				}
				{/* Name */}

				{/* Email */}
				<FormRow type="email" name="email" value={ email } ref={ emailRef }
					handleChange={ handleChange }/>
				{/* Email */}

				{/* Password */}
				<FormRow type="password" name="password" value={ password } 
					handleChange={ handleChange }/>
				{/* Password */}

				{/* Submit btn */}
				{/* Disabled also if user, because of the timeout to redirect to dashboard, 
				which allows to click for one second after the login or register is fullfilled 
				which resets isLoading to false ,-) */}
				<button type="submit" className="btn btn-block" disabled={ isLoading || user }>
					{ isLoading ? 'Loading...' : 'Submit' }
				</button>
				<button type="button" className="btn btn-block btn-hipster" onClick={ showDemo }>
					Demo
				</button>
				<p>
					{ isMember ? 'Not a member yet ?' : 'Already a member ?' }
					<button type="button" onClick={ toggleMember } className="member-btn">
						{ isMember ? 'Register' : 'Login' }
					</button>
				</p>
				{/* Submit btn */}

			</form>
		</Wrapper>
	);

};

// Export
export default Register;