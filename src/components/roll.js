import React, { useState, useEffect } from 'react';
import D6 from '@site/static/img/d6.svg';
import Plus from '@site/static/img/plus.svg';
import Minus from '@site/static/img/minus.svg';
import Refresh from '@site/static/img/refresh.svg';
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
					texts += "2d6+6 = {" + dices + "}+6 = " + sum + "\n";
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
		let abilities = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];
		let abilityLines = [];
		let counts = [];
		let results = [];
		let setResults = [];
		let [totalCount, setTotalCount] = useState(18);
		let handleClick = () => {
			for (let i in results) {
				let dices = [];
				let sortedDices = [];
				for (let j = 0; j < counts[i]; j++) {
					dices[j] = d(6);
					sortedDices[j] = dices[j];
				}
				sortedDices.sort((a, b) => (b - a));
				let sum = 0;
				for (let j = 0; j < 3; j++) {
					sum += sortedDices[j];
				}
				setResults[i]("k3 = {" + dices + "}k3 = " + sum);
			}
		};
		for (let i in abilities) {
			let [count, setCount] = useState(3);
			let [result, setResult] = useState("");
			counts[i] = count;
			results[i] = result;
			setResults[i] = setResult;
			let increase = () => {
				if (totalCount < 28) {
					setCount(count + 1);
				}
			}
			let decrease = () => {
				if (count > 3) {
					setCount(count - 1);
				}
			}
			useEffect(() => {
				let sum = 0;
				for (let i in counts) {
					sum += counts[i];
				}
				setTotalCount(sum);
				for (let i in results) {
					setResults[i]("");
				}
			}, [count]);
			abilityLines[i] = <div key={i}>
				{abilities[i]}：
				<Minus onClick={decrease} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
				{count}d6
				<Plus onClick={increase} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
				{result}
			</div>
		}
		return (<Admonition icon={<D6 onClick={handleClick} />} type="info" title={title}><div>骰池：{totalCount}/24(28)</div>{abilityLines}</Admonition>);
	} else if (method == "purchase") {
		let abilities = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];
		let abilityLines = [];
		let counts = [];
		let setCounts = [];
		let [totalCount, setTotalCount] = useState(0);
		let costs = { '7': -4, '8': -2, '9': -1, '10': 0, '11': 1, '12': 2, '13': 3, '14': 5, '15': 7, '16': 10, '17': 13, '18': 17 };
		let handleClick = () => {
			for (let i in abilities) {
				setCounts[i](10);
			}
		};
		for (let i in abilities) {
			let [count, setCount] = useState(10);
			counts[i] = count;
			setCounts[i] = setCount;
			let increase = () => {
				if (count < 18) {
					setCount(count + 1);
				}
			}
			let decrease = () => {
				if (count > 7) {
					setCount(count - 1);
				}
			}
			useEffect(() => {
				let sum = 0;
				for (let i in counts) {
					sum += costs[counts[i]];
				}
				setTotalCount(sum);
			}, [count]);
			abilityLines[i] = <div key={i}>
				{abilities[i]}：
				<Minus onClick={decrease} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
				<span style={{ width: 'calc(2ch)', display: 'inline-block', textAlign: 'right' }}>{count}</span>
				<Plus onClick={increase} style={{ verticalAlign: 'middle', paddingBottom: 2 }} />
			</div>
		}
		return (<Admonition icon={<Refresh onClick={handleClick} />} type="info" title={title}><div>已花费点数：{totalCount}</div>{abilityLines}</Admonition>);
	}
}