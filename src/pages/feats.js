import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let loadTransAndSearchElements, search;
export default function SpellsPage() {
	useEffect(() => {
		if (ExecutionEnvironment.canUseDOM) {
			loadTransAndSearchElements = require('@site/static/script/featUtils').loadTransAndSearchElements;
			search = require('@site/static/script/featUtils').search;
			
			loadTransAndSearchElements();
			document.onkeyup = (event) => {
				if (event.key == "Enter") {
					search();
				}
			};
		}
	});

	return (
		<Layout>
			<div className="main">
				<div className="horizontal" id="descriptors">
					<div>描述符：</div>
				</div>
				<div className="horizontal" id="source">
					<div>出处：</div>
				</div>
				<div className="horizontal" id="source2">
				</div>
				<div className="horizontal">
					<label><input type="checkbox" defaultChecked={true} id="showTree" />展示专长树</label>
					<label><input type="checkbox" id="en" />仅限未翻译</label>
				</div>

				<div className="horizontal">
					<div>名称：</div>
					<input type="text" id="name" />
					<input type="button" onClick={() => {
						if (search != null) search();
					}} value="查找" />
				</div>

				<div className="searchTable" id="table" />
			</div>
		</Layout >
	);
}