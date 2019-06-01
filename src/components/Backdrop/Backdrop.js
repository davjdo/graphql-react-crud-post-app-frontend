import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const backdrop = props =>
	ReactDOM.createPortal(
		<div
			onClick={props.onClick}
			className={['backdrop', props.open ? 'open' : ''].join(' ')}
		/>,
		document.getElementById('backdrop-root')
	);

export default backdrop;
