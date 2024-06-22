import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Admonition from '@theme/Admonition';

function TableAdmonition(props) {
	return (
		<Admonition icon="" {...props} type="note" />
	);
}

const AdmonitionTypes = {
	...DefaultAdmonitionTypes,
	'table': TableAdmonition
};

export default AdmonitionTypes;