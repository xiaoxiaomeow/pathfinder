import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function FeatPage() {
	useEffect(() => {
		if (ExecutionEnvironment.canUseDOM) {
			let loadTransAndUrlFeat = require('@site/static/script/featUtils').loadTransAndUrlFeat;
			loadTransAndUrlFeat();
		}
	});

	return (
		<Layout>
			<div className="main" id="box"></div>
		</Layout >
	);
}