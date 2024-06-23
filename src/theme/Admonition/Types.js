import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Admonition from '@theme/Admonition';
import Language from '@site/static/img/language.svg';

function TableAdmonition(props) {
	return (
		<Admonition icon="" {...props} type="note" />
	);
}
function OriginAdmonition(props) {
	return (
		<Admonition icon={<Language />} {...props} type="note" />
	);
}

const AdmonitionTypes = {
	...DefaultAdmonitionTypes,
	'table': TableAdmonition,
	'origin': OriginAdmonition
};

export default AdmonitionTypes;