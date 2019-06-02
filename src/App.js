import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Backdrop from './components/Backdrop/Backdrop';
import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import SignupPage from './pages/Auth/Signup';

class App extends Component {
	state = {
		showBackdrop: false,
		showMobileNav: false,
		isAuth: false,
		authLoading: false,
		error: null
	};

	backdropClickHandler = () => {
		this.setState({ showBackdrop: false, showMobileNav: false });
	};

	mobileNavHandler = isOpen => {
		this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
	};

	signupHandler = (event, authData) => {
		event.preventDefault();
		this.setState({ authLoading: true });
		const graphqlQuery = {
			query: `
        mutation CreateUser($email: String!, $name: String!, $password: String!) {
          createUser(userInput: {email: $email, name: $name, password: $password}) {
            _id
            email
          }
       	 }
			`,
			variables: {
				email: authData.signupForm.email.value,
				name: authData.signupForm.name.value,
				password: authData.signupForm.password.value
			}
		};
		fetch('http://localhost:3002/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(graphqlQuery)
		})
			.then(res => {
				return res.json();
			})
			.then(resData => {
				if (resData.errors && resData.errors[0].status === 422) {
					throw new Error(
						"Validation failed. Make sure the email address isn't used yet!"
					);
				}
				if (resData.errors) {
					throw new Error('User creation failed!');
				}
				console.log(resData);
				this.setState({ isAuth: false, authLoading: false });
				this.props.history.replace('/');
			})
			.catch(err => {
				console.log(err);
				this.setState({
					isAuth: false,
					authLoading: false,
					error: err
				});
			});
	};

	render() {
		let routes = (
			<Switch>
				<Route
					path="/signup"
					exact
					render={props => (
						<SignupPage
							{...props}
							onSignup={this.signupHandler}
							loading={this.state.authLoading}
						/>
					)}
				/>
			</Switch>
		);
		return (
			<Fragment>
				{this.state.showBackdrop && (
					<Backdrop onClick={this.backdropClickHandler} />
				)}
				<Layout
					header={
						<Toolbar>
							<MainNavigation
								onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
							/>
						</Toolbar>
					}
					mobileNav={
						<MobileNavigation
							open={this.state.showMobileNav}
							mobile
							onCloseItem={this.mobileNavHandler.bind(this, false)}
						/>
					}
				/>
				{routes}
			</Fragment>
		);
	}
}

export default withRouter(App);
