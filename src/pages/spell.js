import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function SpellPage() {
	useEffect(() => {
		if (ExecutionEnvironment.canUseDOM) {
			let loadTransAndUrlSpell = require('@site/static/script/spellUtils').loadTransAndUrlSpell;
			loadTransAndUrlSpell();
		}
	});

	return (
		<Layout>
			<div className="main" id="box"></div>
		</Layout >
	);
}