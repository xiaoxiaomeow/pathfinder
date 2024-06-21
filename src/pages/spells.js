import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let loadTransAndSearchElements, search;
export default function SpellsPage() {
	useEffect(() => {
		if (ExecutionEnvironment.canUseDOM) {
			loadTransAndSearchElements = require('@site/static/script/spellUtils').loadTransAndSearchElements;
			search = require('@site/static/script/spellUtils').search;

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
				<div className="horizontal" id="clazz">
					<div>职业：</div>
				</div>
				<div className="horizontal" id="levels">
					<div>环位：</div>
				</div>
				<div className="horizontal" id="source">
					<div>出处：</div>
				</div>
				<div className="horizontal" id="source2">
				</div>

				<details>
					<summary>高级筛选</summary>
					<div className="horizontal" id="school">
						<div>学派：</div>
					</div>
					<div className="horizontal" id="subSchools">
						<div>子学派：</div>
					</div>
					<div className="horizontal" id="descriptors">
						<div>描述符：</div>
					</div>
					<div className="horizontal" id="castingTime">
						<div>施法时间：</div>
					</div>
					<div className="horizontal" id="duration">
						<div>持续时间：</div>
					</div>
					<div className="horizontal" id="range">
						<div>范围：</div>
					</div>
					<div className="horizontal" id="spellResistance">
						<div>法术抗力：</div>
					</div>
					<div className="horizontal" id="savingThrow">
						<div>豁免：</div>
					</div>
					<div className="horizontal">
						<label><input type="checkbox" id="race" />有种族/神祇限制</label>
						<label><input type="checkbox" id="mythic" />有神话版本</label>
						<label><input type="checkbox" id="en" />仅限未翻译</label>
					</div>
				</details>

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