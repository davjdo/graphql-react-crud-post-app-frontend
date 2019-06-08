import React from 'react';

import './Input.css';

const filePicker = props => (
	<div className="input">
		<label htmlFor={props.id}>{props.label}</label>
		<input
			className={[
				!props.valid ? 'invalid' : 'valid',
				props.touched ? 'touched' : 'untouched'
			].join(' ')}
			type="file"
			id={props.id}
			onBlur={props.onBlur}
			onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
		/>
	</div>
);

export default filePicker;
