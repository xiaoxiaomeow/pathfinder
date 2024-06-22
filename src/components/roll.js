import React, { useState } from 'react';
import D6 from '@site/static/img/d6.svg';
import Plus from '@site/static/img/plus.svg';
import Minus from '@site/static/img/minus.svg';
import Admonition from '@theme/Admonition';

function d(n) {
	return 1 + Math.floor(Math.random() * n);
}

export default function Roll({ method, title, initial }) {
	if (method == "standard" || method == "classic" || method == "heroic") {
		let [content, setContent] = useState(initial);
		let handleClick = () => {
			let abilities = [];
			let texts = "";
			for (let i = 0; i < 6; i++) {
				let dices = [];
				if (method == "standard") {
					let lowestIndex = -1;
					for (let j = 0; j < 4; j++) {
						dices[j] = d(6);
						if (lowestIndex == -1 || dices[j] < dices[lowestIndex]) {
							lowestIndex = j
						}
					}
					let sum = 0;
					for (let j = 0; j < 4; j++) {
						if (j != lowestIndex) {
							sum += dices[j];
						}
					}
					abilities[i] = sum;
					texts += "4d6k3 = {" + dices + "}k3 = " + sum + "\n";
				}
				if (method == "classic") {
					for (let j = 0; j < 3; j++) {
						dices[j] = d(6);
					}
					let sum = 0;
					for (let j = 0; j < 3; j++) {
						sum += dices[j];
					}
					abilities[i] = sum;
					texts += "3d6 = {" + dices + "} = " + sum + "\n";
				}
				if (method == "heroic") {
					for (let j = 0; j < 2; j++) {
						dices[j] = d(6);
					}
					let sum = 6;
					for (let j = 0; j < 2; j++) {
						sum += dices[j];
					}
					abilities[i] = sum;
					texts += "2d6+6 = {" + dices + "} = " + sum + "\n";
				}
			}
			abilities.sort((a, b) => (b - a));
			texts += "结果：" + abilities;
			setContent(texts);
		};
		return (<Admonition icon={<D6 onClick={handleClick} />} type="info" title={title}>{content.split('\n').map((line, index) => (
			<React.Fragment key={index}>
				{line}
				<br />
			</React.Fragment>
		))}</Admonition>);
	} else if (method == "dice_pool") {
		let [content, setContent] = useState(initial);
		let abilities = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];
		let abilityLines = [];
		let counts = []
		let [totalCount, setTotalCount] = useState(18);
		let calculate = (offset) => {
			let sum = 0;
			for (let i in counts) {
				sum += counts[i];
			}
			setTotalCount(sum + offset);
		}
		for (let i in abilities) {
			let [count, setCount] = useState(3);
			counts[i] = count;
			let increase = () => {
				if (totalCount < 24) {
					setCount(count + 1);
					calculate(1);
				}
			}
			let decrease = () => {
				if (count > 3) {
					setCount(count - 1);
					calculate(-1);
				}
			}
			abilityLines[i] = <div>
				{abilities[i]}：
				<Minus onClick={decrease} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
				{count}d6
				<Plus onClick={increase} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
			</div>
		}
		let handleClick = () => { };
		return (<Admonition icon={<D6 onClick={handleClick} />} type="info" title={title}><div>骰池：{totalCount}d6/24d6</div>{abilityLines}</Admonition>);
	}
}