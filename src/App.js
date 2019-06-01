import React, { Component, Fragment } from 'react';

import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Layout
					header={
						<Toolbar>
							<MainNavigation />
						</Toolbar>
					}
				/>
			</Fragment>
		);
	}
}

export default App;
