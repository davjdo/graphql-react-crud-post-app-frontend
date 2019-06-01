import React, { Component, Fragment } from 'react';

import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
class App extends Component {
	render() {
		return (
			<Fragment>
				<Layout header={<Toolbar />} />
			</Fragment>
		);
	}
}

export default App;
