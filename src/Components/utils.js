const saveProjectToDb = async (project) => {
	try {
		if (project) {
			await fetch(`http://localhost:4000/projects/${project.id}/_save`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: project.fileContent,
				}),
			});

			console.log("XML content updated and stored successfully.");
		}
	} catch (error) {
		console.error("Error storing updated XML content:", error);
	}
};

// const addNodeToPath = (
// 	xmlDoc,
// 	nodePath,
// 	newNodeName,
// 	attributeName,
// 	attributeValue
// ) => {
// 	const nodeNames = nodePath.split(" > ");

// 	let currentNode = xmlDoc.documentElement;
// 	for (const nodeName of nodeNames) {
// 		const foundNode = findNodeByAttributeName(
// 			currentNode,
// 			attributeName,
// 			nodeName
// 		);
// 		if (foundNode) {
// 			currentNode = foundNode;
// 		} else {
// 			console.log(
// 				`Node with attribute ${attributeName}='${nodeName}' not found in path.`
// 			);
// 			return;
// 		}
// 	}

// 	const newChildNode = xmlDoc.createElement(newNodeName);
// 	newChildNode.setAttribute(attributeName, attributeValue);
// 	currentNode.appendChild(newChildNode);
// };

const fetchProjects = async () => {
	// Replace this with your actual API call to fetch project details
	try {
		const response = await fetch(`http://localhost:4000/projects`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching project details:", error);
	}
};

const fetchProjectById = async (projectId) => {
	console.log("Fetching project with Id: " + projectId);
	var result = await fetch(`http://localhost:4000/projects/${projectId}`);
	return await result.json();
};

const fetchUserById = async (userId) => {
	console.log("Fetching user with Id: " + userId);
	var result = await fetch(`http://localhost:4000/users/${userId}`);
	return await result.json();
};

const deleteProjectById = async (projectId) => {
	console.log("Deleting project with Id: " + projectId);
	await fetch("http://localhost:4000/projects/" + projectId, {
		method: "delete",
	});
};

const createProject = async (name) => {
	let result = await fetch("http://localhost:4000/projects", {
		method: "post",
		body: JSON.stringify({ name: name }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await result.json();
};

const addChildNodeToNodeWithAttribute = (
	xmlDoc,
	attributeName,
	attributeValue,
	childNodeToAdd
) => {
	const parentNode = findNodeByAttribute(
		xmlDoc.documentElement,
		attributeName,
		attributeValue
	);

	if (parentNode) {
		const clonedChildNode = childNodeToAdd.cloneNode(true);
		parentNode.appendChild(clonedChildNode);
		return xmlDoc; // Return the updated xmlDoc
	} else {
		console.log(
			`Node with attribute ${attributeName}='${attributeValue}' not found.`
		);
		return xmlDoc; // Return the original xmlDoc
	}
};

const findNodeByAttribute = (parent, attributeName, attributeValue) => {
	for (const childNode of parent.children) {
		if (childNode.getAttribute(attributeName) === attributeValue) {
			return childNode;
		}
	}
	return null;
};

const findNodeByNodeName = (parent, nodeName) => {
	for (const childNode of parent.children) {
		if (childNode.nodeName === nodeName) {
			return childNode;
		}
	}
	return null;
};

const findNodeByAttributeAndAddChild = (
	xmlDoc,
	attributeName,
	attributeValue,
	childNodeToAdd
) => {
	const parentNode = findNodeByAttribute(
		xmlDoc.documentElement,
		attributeName,
		attributeValue
	);

	if (parentNode) {
		const clonedChildNode = childNodeToAdd.cloneNode(true);
		parentNode.appendChild(clonedChildNode);
		return xmlDoc; // Return the updated xmlDoc
	} else {
		console.log(
			`Node with attribute ${attributeName}='${attributeValue}' not found.`
		);
		return xmlDoc; // Return the original xmlDoc
	}
};

const findNodeByNodeNameAndAddChild = (xmlDoc, nodeName, childNodeToAdd) => {
	const parentNode = findNodeByNodeName(xmlDoc.documentElement, nodeName);

	if (parentNode) {
		const clonedChildNode = childNodeToAdd.cloneNode(true);
		parentNode.appendChild(clonedChildNode);
		return xmlDoc; // Return the updated xmlDoc
	} else {
		console.log(`Node with name '${nodeName}' not found.`);
		return xmlDoc; // Return the original xmlDoc
	}
};

function addChildNode(xmlDoc, selectedNode, newNode) {
	if (selectedNode && selectedNode.getAttribute("name")) {
		const newXmlDoc = findNodeByAttributeAndAddChild(
			xmlDoc,
			"name",
			selectedNode.getAttribute("name"),
			newNode
		);
		// Serialize the updated XML content to a string
		const updatedXmlContent = new XMLSerializer().serializeToString(newXmlDoc, {
			format: true, // Add formatting (indentation and line breaks)
		});
		// Update the state with the new XML content
		return updatedXmlContent;
	} else {
		const typesNode = xmlDoc.querySelector("types");
		typesNode.appendChild(newNode);

		// Serialize the updated XML content to a string
		const updatedXmlContent = new XMLSerializer().serializeToString(xmlDoc, {
			format: true, // Add formatting (indentation and line breaks)
		});
		return updatedXmlContent;
	}
}

export {
	findNodeByAttribute,
	fetchProjectById,
	fetchUserById,
	saveProjectToDb,
	fetchProjects,
	deleteProjectById,
	createProject,
	// addNodeToPath,
	addChildNodeToNodeWithAttribute,
	findNodeByAttributeAndAddChild,
	findNodeByNodeNameAndAddChild,
	addChildNode,
};
