import React, {useEffect, useState} from "react";
import { Route,Redirect,withRouter } from "react-router-dom";
import {Auth} from "aws-amplify"
import {setUserAction} from "../../store/auth/login/actions"
import { useDispatch } from "react-redux";

const Authmiddleware = ({ component: Component, layout: Layout}) => {
	const [userLogIn, setUser] = useState()
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
	const authUser  = async() =>{
		const data = await Auth.currentAuthenticatedUser()
					.then(user => user)
					.catch(err=> false);
				
		setUser(data)
		dispatch(setUserAction(data))
		setLoading(false)
	}

	useEffect(()=>{
		authUser()
	}, [])

	if(loading)
		return null
	return(
		<Route
		render={props => {
		
		// here you can apply condition
			if (!userLogIn) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}
			return (
			 <Layout>
					<Component {...props} />
				</Layout>
			);
		}}
	/>

	)
	}

export default withRouter(Authmiddleware);

