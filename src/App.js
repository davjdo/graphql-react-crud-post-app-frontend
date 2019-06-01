import React, { Component, Fragment } from 'react';

import Backdrop from './components/Backdrop/Backdrop';
import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';

class App extends Component {
	state = {
		showBackdrop: false,
		showMobileNav: false
	};

	backdropClickHandler = () => {
		this.setState({ showBackdrop: false, showMobileNav: false });
	};

	mobileNavHandler = isOpen => {
		this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
	};

	render() {
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
			</Fragment>
		);
	}
}

export default App;
