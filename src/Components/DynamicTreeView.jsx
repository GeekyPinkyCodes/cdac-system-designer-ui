// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TreeView from "@mui/lab/TreeView";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import TreeItem from "@mui/lab/TreeItem";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import xml2js from "xml2js"; // Import xml-js library functions

// export default function DynamicTreeView({ initialXmlInput }) {
// 	const [focusDisabledItems, setFocusDisabledItems] = useState(false);
// 	const [xmlInput, setXmlInput] = useState(initialXmlInput); // Manage XML data as state
// 	const [parsedTree, setParsedTree] = useState("");

// 	const handleToggle = (event) => {
// 		setFocusDisabledItems(event.target.checked);
// 	};

// 	const handleXmlChange = (newXml) => {
// 		setXmlInput(newXml);
// 	};
// 	const parser = new xml2js.Parser();
// 	parser.parseString(xmlInput, function (err, result) {
// 		setParsedTree(result);
// 	});

// 	const renderTreeItems = (items) =>
// 		items.map((item) => (
// 			<TreeItem
// 				key={item.id}
// 				nodeId={item.id}
// 				label={item.label}
// 				disabled={item.disabled}>
// 				{item.children && renderTreeItems(item.children)}
// 			</TreeItem>
// 		));

// 	const handleSave = () => {
// 		const parser = new xml2js.Parser();
// 		parser.pa(xmlInput, function (err, result) {
// 			setParsedTree(result);
// 		});
// 		const updatedXml = js2xml(parsedTree, { compact: true, spaces: 2 }); // Convert JS object back to XML
// 		// You can perform actions to save the updatedXml
// 		console.log("Updated XML:", updatedXml);
// 	};

// 	return (
// 		<Box
// 			sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
// 			px={2}>
// 			<Box sx={{ mb: 1 }}>
// 				<FormControlLabel
// 					control={
// 						<Switch
// 							checked={focusDisabledItems}
// 							onChange={handleToggle}
// 							name="focusDisabledItems"
// 						/>
// 					}
// 					label="Focus disabled items"
// 				/>
// 			</Box>
// 			<TreeView
// 				aria-label="disabled items"
// 				defaultCollapseIcon={<ExpandMoreIcon />}
// 				defaultExpandIcon={<ChevronRightIcon />}
// 				disabledItemsFocusable={focusDisabledItems}
// 				multiSelect>
// 				{renderTreeItems([parsedTree])}
// 			</TreeView>
// 			<button onClick={handleSave}>Save</button>
// 		</Box>
// 	);
// }
