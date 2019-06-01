import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
	{ id: 'feed', text: 'Feed', link: '/' },
	{ id: 'login', text: 'Login', link: '/login' },
	{ id: 'signup', text: 'Signup', link: '/signup' }
];

const navigationItems = props => {
	return navItems.map(item => (
		<li
			key={item.id}
			className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
		>
			<NavLink to={item.link} exact onClick={props.onClose}>
				{item.text}
			</NavLink>
		</li>
	));
};

export default navigationItems;
