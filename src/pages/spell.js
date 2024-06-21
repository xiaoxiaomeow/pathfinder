import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import {loadTransAndUrlSpell} from '@site/static/script/spellUtils';

export default function SpellPage() {
	useEffect(() => {
		loadTransAndUrlSpell();
	});

	return (
		<Layout>
			<div className="main" id="box"></div>
		</Layout >
	);
}