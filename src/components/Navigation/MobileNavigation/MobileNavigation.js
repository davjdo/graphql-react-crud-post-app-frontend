import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

import './MobileNavigation.css';

const mobileNavigation = props => {
	return (
		<nav className={['mobile-nav', props.open ? 'open' : ''].join(' ')}>
			<ul
				className={['mobile-nav__items', props.mobile ? 'mobile' : ''].join(
					' '
				)}
			>
				<NavigationItems mobile onClose={props.onCloseItem} />
			</ul>
		</nav>
	);
};

export default mobileNavigation;
