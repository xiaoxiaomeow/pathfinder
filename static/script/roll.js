import React, { useEffect } from 'react';
import D6 from '@site/static/img/d6.svg';
import Admonition from '@theme/Admonition';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Roll({index}) {
	let d6 = document.createElement("img");
	d6.src = "img/d6.svg";
	let label = document.createElement("div");
	d6.onclick = () => {
		label.innerHTML = "Clicked";
	};
	return <Admonition icon={d6} type="info" title="点击生成标准角色"></Admonition>
}