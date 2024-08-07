import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Admonition from '@theme/Admonition';
import Language from '@site/static/img/language.svg';
import Progress from '@site/static/img/progress.svg';

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
function ProgressAdmonition(props) {
	return (
		<Admonition icon={<Progress />} {...props} type="warning" />
	);
}
const AdmonitionTypes = {
	...DefaultAdmonitionTypes,
	'table': TableAdmonition,
	'origin': OriginAdmonition,
	'progress': ProgressAdmonition
};

export default AdmonitionTypes;