import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './MainNavigation.css';

const mainNavigation = () => (
	<nav className="main-nav">
		<div className="main-nav__logo">
			<NavLink to="/">
				<Logo />
			</NavLink>
		</div>
		<div className="spacer" />
		<ul className="main-nav__items">
			<NavigationItems />
		</ul>
	</nav>
);
export default mainNavigation;
