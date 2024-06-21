import $ from 'jquery';
import {featDict} from '@site/static/script/featsIndex';
import {featTree} from '@site/static/script/featsIndex';
import {getUrlAttributes} from '@site/static/script/common';

function connect(content, connector, translation) {
    let str = "";
    for (let key in content) {
        let cur = content[key];
        str += (translation[cur] ?? cur) + connector;
    }
    return str.substring(0, str.length - connector.length);
}
function getTranslatedSource (ft) {
    let sourceTrans = "";
    for (let key in ft["source"]) {
        let cur = ft["source"][key].split(" pg.")[0];
        sourceTrans += (translations.sourceTranslations[cur] ?? cur) + ", ";
    }
    return sourceTrans.substring(0, sourceTrans.length - 2);
}
function getSimpTranslatedSource (ft) {
    if (ft["source"].length == 1) {
        return getTranslatedSource(ft);
    }
    for (let key in ft["source"]) {
        let cur = translations.sourceTranslations[ft["source"][key].split(" pg.")[0]];
        if (!cur.includes("-")) {
            return cur + ", ...";
        }
    }
    for (let key in ft["source"]) {
        let cur = translations.sourceTranslations[ft["source"][key].split(" pg.")[0]];
        if (cur.includes("PCS") || cur.includes("PPC")) {
            return cur + ", ...";
        }
    }
    for (let key in ft["source"]) {
        let cur = translations.sourceTranslations[ft["source"][key].split(" pg.")[0]];
        return cur + " ...";
    }
    return "";
}
function markTree (key, tree, mark) {
	let relavant = false;
	for (let i in tree) {
		let node = tree[i];
		if (mark) {
			node["marked"] = true;
			markTree(key, node["children"], true);
		}
		if (node["key"] == key) {
			node["marked"] = true;
			node["force"] = true;
			markTree(key, node["children"], true);
			relavant = true;
		} else {
			if (markTree(key, node["children"], false)) {
				node["marked"] = true;
				node["force"] = true;
				relavant = true;
			}
		}
	}
	return relavant;
}
function printTree (tree, key, indent) {
	let str = "";
	for (let i in tree) {
		let node = tree[i];
		if (node["marked"]) {
			let ft = featDict[node["key"]];
			let name = getTitle(ft, false);
			if (node["key"] != key) {
				str += indent + "<a style=\"color:gray\" href=\"/pathfinder/feat?feat=" + node["key"] + "\">" + name + "</a>";
			} else {
				str += indent + "<a>" + name + "</a>";
			}
			str += "<br>" + printTree(node["children"], key, indent + "&#12288;");
		}
	}
	return str;
}
function buildFeatTree (key) {
	let tree = JSON.parse(JSON.stringify(featTree));
	markTree(key, tree);
	return printTree(tree, key, "");
}
function getTitle (ft, withLink = true) {
	let en_name = withLink ? ("<a href=\"" + ft["url"] + "\">" + ft["name"] + "</a>") : ft["name"];
    let name = (ft["name_zh"] != null) ? (ft["name_zh"] + " (" + en_name + ")") : en_name;
    if (ft["race_zh"] != null) {
        name += " [" + ft["race_zh"] + "]";
    }
    name += " <sup>" + getTranslatedSource(ft) + "</sup>";
	return name;
}
function loadFeat(ft, div, containSource = false) {
	let sources = {};
	for (let k in featDict) {
		let source = getTranslatedSource(featDict[k]).split(", ");
		for (let sk in source) {
			sources[source[sk].split("-")[0]] = "";
		}
	}

    div.innerHTML = "";

	if (containSource) {
		window.top.document.title = ft["name_zh"] ?? ft["name"];
	}

    // title
    let name = getTitle(ft);
	// descriptors
	let descriptors = ft["descriptors"];
	if (descriptors != null) {
		name += "〔" + connect(descriptors, ", ", translations.featDescriptorsTranslations) + "〕";
	}
    $(div).append($("<h3>" + name + "</h3>"));

    // other
    if (ft["text_zh"] != null) $(div).append($("<p>" + ft["text_zh"] + "</p>"));
	else if (ft["text"] != null) $(div).append($("<p>" + ft["text"] + "</p>"));
    if (ft["prerequisites_zh"] != null) $(div).append($("<p><b>先决条件: </b>" + ft["prerequisites_zh"] + "</p>"));
	else if (ft["prerequisites"] != null) $(div).append($("<p><b>先决条件: </b>" + ft["prerequisites"] + "</p>"));
    if (ft["benefit_zh"] != null) $(div).append($("<p><b>专长效果: </b>" + ft["benefit_zh"] + "</p>"));
	else if (ft["benefit"] != null) $(div).append($("<p><b>专长效果: </b>" + ft["benefit"] + "</p>"));
    if (ft["normal_zh"] != null) $(div).append($("<p><b>通常状况: </b>" + ft["normal_zh"] + "</p>"));
	else if (ft["normal"] != null) $(div).append($("<p><b>通常状况: </b>" + ft["normal"] + "</p>"));
    if (ft["special_zh"] != null) $(div).append($("<p><b>特殊说明: </b>" + ft["special_zh"] + "</p>"));
	else if (ft["special"] != null) $(div).append($("<p><b>特殊说明: </b>" + ft["special"] + "</p>"));
    if (ft["goal_zh"] != null) $(div).append($("<p><b>专长目标: </b>" + ft["goal_zh"] + "</p>"));
	else if (ft["goal"] != null) $(div).append($("<p><b>专长目标: </b>" + ft["goal"] + "</p>"));
    if (ft["completionBenefit_zh"] != null) $(div).append($("<p><b>完成收益: </b>" + ft["completionBenefit_zh"] + "</p>"));
	else if (ft["completionBenefit"] != null) $(div).append($("<p><b>完成收益: </b>" + ft["completionBenefit"] + "</p>"));

    // source
    let sourceStr = "";
    for (let key in ft["source"]) {
        sourceStr += "<br>" + ft["source"][key];
    }
    $(div).append($("<p><b>出处</b>" + sourceStr + "</p>"));

	// stamina
	if (ft["staminaText_zh"] != null || ft["staminaText"] != null) {
		$(div).append($("<hr><h4>战策</h4></div>"));
		if (ft["staminaText_zh"] != null) $(div).append($("<p>" + ft["staminaText_zh"] + "</p>"));
		else if (ft["staminaText"] != null) $(div).append($("<p>" + ft["staminaText"] + "</p>"));
		$(div).append($("<p><b>出处</b><br>" + ft["staminaSource"] + "</p>"));

	}

	// mythic version
	if (ft["mythicBenefit_zh"] != null || ft["mythicBenefit"] != null) {
		$(div).append($("<hr><h4>神话版本</h4>"));
		if (ft["mythicText_zh"] != null) $(div).append($("<p>" + ft["mythicText_zh"] + "</p>"));
		else if (ft["mythicText"] != null) $(div).append($("<p>" + ft["mythicText"] + "</p>"));
		if (ft["mythicPrerequisites_zh"] != null) $(div).append($("<p><b>先决条件: </b>" + ft["mythicPrerequisites_zh"] + "</p>"));
		else if (ft["mythicPrerequisites"] != null) $(div).append($("<p><b>先决条件: </b>" + ft["mythicPrerequisites"] + "</p>"));
		if (ft["mythicBenefit_zh"] != null) $(div).append($("<p><b>专长效果: </b>" + ft["mythicBenefit_zh"] + "</p>"));
		else if (ft["mythicBenefit"] != null) $(div).append($("<p><b>专长效果: </b>" + ft["mythicBenefit"] + "</p>"));
		if (ft["mythicNormal_zh"] != null) $(div).append($("<p><b>通常状况: </b>" + ft["mythicNormal_zh"] + "</p>"));
		else if (ft["mythicNormal"] != null) $(div).append($("<p><b>通常状况: </b>" + ft["mythicNormal"] + "</p>"));
		if (ft["mythicSpecial_zh"] != null) $(div).append($("<p><b>特殊说明：</b>" + ft["mythicSpecial_zh"] + "</p>"));
		else if (ft["mythicSpecial"] != null) $(div).append($("<p><b>特殊说明：</b>" + ft["mythicSpecial"] + "</p>"));
		$(div).append($("<p><b>出处</b><br>" + ft["mythicSource"] + "</p>"));
	}

	// feat tree
	$(div).append($("<hr>"));
	$(div).append($("<p><b>专长树</b><br></p>"));
	$(div).append($("<p>" + buildFeatTree(ft["key"]) + "</p>"));
    
}
function loadUrlFeat() {
    let key = getUrlAttributes()["feat"];
	key = key.toLowerCase();
    fetch("/pathfinder/feats/" + key + ".json").then(response => {
        if (response.ok) {
			return response.text();
        } else {
			return null;
		}
    }).then(text => {
		if (text != null) {
			let ft = JSON.parse(text);
			loadFeat(ft, document.getElementById("box"), true);
		}
    }).catch(error => {
        console.log(error);
    });
}
function addBoxes(dict, element, array, nonempty = false, check = true, sort = true, extra = null) {
    let boxAll = document.createElement("div");
    boxAll.style = "display: flex; ";
    let checkboxAll = document.createElement("input");
    checkboxAll.type = "checkbox";
    checkboxAll.name = "all";
    checkboxAll.checked = check;
    boxAll.appendChild(checkboxAll);
    array.push(checkboxAll);
    let labelAll = document.createElement("div");
    labelAll.innerHTML = "全选";
    boxAll.appendChild(labelAll);
    element.appendChild(boxAll);
    checkboxAll.addEventListener("change", (event) => {
        for (let i in array) {
            array[i].checked = event.currentTarget.checked;
        }
    });

    if (!nonempty) {
        let boxNone = document.createElement("div");
        boxNone.style = "display: flex; ";
        let checkboxNone = document.createElement("input");
        checkboxNone.type = "checkbox";
        checkboxNone.name = "none";
        checkboxNone.checked = check;
        boxNone.appendChild(checkboxNone);
        array.push(checkboxNone);
        let labelNone = document.createElement("div");
        labelNone.innerHTML = "无";
        boxNone.appendChild(labelNone);
        element.appendChild(boxNone);
    }

    let keys;
    if (sort) {
        keys = Object.keys(dict);
        keys.sort();
    } else {
        keys = dict;
    }
    for (let i in keys) {
        let box = document.createElement("div");
        box.style = "display: flex; ";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = keys[i];
        checkbox.checked = check;
        box.appendChild(checkbox);
        array.push(checkbox);
        let label = document.createElement("div");
        label.innerHTML = sort ? dict[keys[i]] : keys[i];
        box.appendChild(label);
        element.appendChild(box);
    }

    let extraKeys;
    if (sort) {
        extraKeys = Object.keys(extra);
        extraKeys.sort();
    } else {
        extraKeys = extra;
    }
    for (let i in extraKeys) {
        let box = document.createElement("div");
        box.style = "display: flex; ";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = extraKeys[i];
        checkbox.checked = check;
        box.appendChild(checkbox);
        array.push(checkbox);
        let label = document.createElement("div");
        label.innerHTML = sort ? extra[extraKeys[i]] : extraKeys[i];
        box.appendChild(label);
        element.appendChild(box);
    }

}
var descriptorsBoxes = [];
var sourceBoxes = [];
var source2Boxes = [];
var translations;
export function loadTransAndSearchElements () {
    fetch("/pathfinder/script/translations.json").then(response => {
        if (response.ok) {
			return response.text();
        } else {
            alert('Failed to fetch translation content.');
			return null;
		}
    }).then(text => {
		if (text == null) {
			return;
		}
        translations = JSON.parse(text);

		let commonDescriptors = ["Combat", "Critical", "Item Creation", "Metamagic", "Monster", "Style", "Teamwork"];
		let commonDescriptorTrans = {};
		let uncommonDescriptorTrans = {};
		for (let key in translations.featDescriptorsTranslations) {
			uncommonDescriptorTrans[key] = translations.featDescriptorsTranslations[key];
		}
		for (let i in commonDescriptors) {
			let key = commonDescriptors[i];
			commonDescriptorTrans[key] = uncommonDescriptorTrans[key];
			delete uncommonDescriptorTrans[key];
		}

        addBoxes(commonDescriptorTrans, document.getElementById("descriptors"), descriptorsBoxes, false, true, true, uncommonDescriptorTrans);
		addBoxes(["CRB", "APG", "ARG", "ACG", "UM", "UC", "UI", "OA"], document.getElementById("source"), sourceBoxes, true, true, false);
		addBoxes(["Bst", "UCa", "MA", "MC", "Uch", "HA", "VC", "AG", "BotD", "UW", "PA", "AP", "PCS", "PPC", "Mod", "other"], document.getElementById("source2"), source2Boxes, true, true, false);
    }).catch(error => {
        console.log(error);
    });
}
export function loadTransAndUrlFeat () {
	fetch ("/pathfinder/script/translations.json").then(response => {
        if (response.ok) {
			return response.text();
        } else {
            alert('Failed to fetch translation content.');
			return null;
		}
	}).then(text => {
		if (text == null) {
			return;
		}
		translations = JSON.parse(text);
        loadUrlFeat();
    }).catch(error => {
        console.log(error);
	});
}
function cell(text) {
    let cell = document.createElement("td");
    cell.innerHTML = text ?? "";
    return cell;
}
function centerCell(text) {
    let cell = document.createElement("td");
    cell.innerHTML = text ?? "";
    cell.style.textAlign = "center";
    return cell;
}
function objectCell(object) {
    let cell = document.createElement("td");
    cell.appendChild(object);
    return cell;
}
function restrict(text, len) {
    if (text == null) {
        return null;
    }
    if (text.length < len + 3) {
        return text;
    } else {
        return text.substring(0, len) + "...";
    }
}
function sourceLegal (ft) {
	let source = ft["source"];
	let source_legal = false;
	for (let i in sourceBoxes) {
		if (sourceBoxes[i].checked) {
			for (let j in source) {
				let src = translations.sourceTranslations[source[j].split(" pg.")[0]];
				source_legal |= sourceBoxes[i].name == src.split("-")[0];
				if (source_legal) break;
			}
		}
	}
	for (let i in source2Boxes) {
		if (source2Boxes[i].checked) {
			for (let j in source) {
				let src = translations.sourceTranslations[source[j].split(" pg.")[0]];
				source_legal |= source2Boxes[i].name == src.split("-")[0];
				if (source_legal) break;
			}
		}
	}
	return source_legal;
}
function featLegal (ft) {
	let name = document.getElementById("name").value;
	let name_legal = (ft["name_zh"] != null && ft["name_zh"].includes(name)) || (ft["name"] != null && ft["name"].toLowerCase().includes(name.toLowerCase()));

	let descriptors = ft["descriptors"];
	if (descriptors == null) {
		descriptors = ["none"];
	}
	let descriptors_legal = false;
	for (let i in descriptorsBoxes) {
		for (let j in descriptors) {
			descriptors_legal |= descriptorsBoxes[i].checked && (descriptorsBoxes[i].name == descriptors[j] || descriptorsBoxes[i].name == "all");
			if (descriptors_legal) break;
		}
		if (descriptors_legal) break;
	}

	let source_legal = sourceLegal(ft);

	let en_legal = (!document.getElementById("en").checked) || ft["name_zh"] == null;

	let legal = (name != "" && name_legal) || (name == "" && descriptors_legal && source_legal && en_legal);
	return legal;
}
function populateFeat (ft, table, indent, gray) {
	let row = document.createElement("tr");
	let div = document.createElement("div");

	let nameLink = document.createElement("a");
	nameLink.href = "/pathfinder/feat?feat=" + ft["key"];
	nameLink.target = "_blank";
	nameLink.innerHTML = indent + (ft["name_zh"] ?? ft["name"]);
	if (gray) {
		nameLink.style.color = "gray";
	}
	
	let nameCell = objectCell(nameLink);
	nameCell.className = "tooltip";
	row.appendChild(nameCell);

	row.appendChild(centerCell(connect(ft["descriptors"], ", ", translations.featDescriptorsTranslations)));
	row.appendChild(centerCell(getSimpTranslatedSource(ft)));

	table.appendChild(row);

	let tooltip = document.createElement("span");
	tooltip.className = "tooltiptext";
	tooltip.innerHTML = "loading...";
	nameCell.appendChild(tooltip);
	nameCell.onmouseenter = () => {
		if (document.body.clientWidth < 600) {
			return;
		}
		tooltip.style.visibility = "visible";
		tooltip.style.top = "10px";

		if (tooltip.innerHTML == "loading...") {
			fetch("/pathfinder/feats/" + ft["key"] + ".json").then(response => {
				if (!response.ok) {
					alert('Failed to fetch feat content.');
				}
				return response.text();
			}).then(text => {
				ft = JSON.parse(text);
				tooltip.innerHTML = "";
				loadFeat(ft, tooltip);
			}).catch(error => {
				alert('Error: ' + error.message);
				throw error;
			});
		}
	};
	nameCell.onmouseleave = () => {
		tooltip.style.visibility = "hidden";
	};
}
function populateTree (table, tree, indent) {
	for (let i in tree) {
		let node = tree[i];
		if (node["marked"]) {
			let ft = featDict[node["key"]];
			if (sourceLegal(ft) || node["force"]) {
				populateFeat(ft, table, indent, !featLegal(ft));
			}
			populateTree(table, node["children"], indent + "&#12288;");
		}
	}
}
export function search() {
    let tableDiv = document.getElementById("table");
    tableDiv.innerHTML = "";
    let table = document.createElement("table");
	table.style.border = "";
    table.style.whiteSpace = "nowrap";
    let title = document.createElement("tr");
    title.style.textAlign = "center";
    title.innerHTML = "<th>专长</th><th>描述符</th><th>出处</th>"
    table.appendChild(title);
	let showTree = document.getElementById("showTree").checked;
	if (showTree) {
		let tree = JSON.parse(JSON.stringify(featTree));
		for (let key in featDict) {
			let ft = featDict[key];
			if (featLegal(ft)) {
				markTree(key, tree, false);
			}
		}
		populateTree(table, tree, "");
	} else {
		for (let key in featDict) {
			let ft = featDict[key];
			if (featLegal(ft)) {
				populateFeat(ft, table, "", false);
			}
		}
	}
    tableDiv.appendChild(table);
}
document.onkeyup = (event) => {
    if (event.key == "Enter") {
        search();
    }
};