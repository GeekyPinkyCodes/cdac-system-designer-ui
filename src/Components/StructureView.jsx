import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ClassIcon from "@mui/icons-material/Class";
import FunctionsIcon from "@mui/icons-material/Functions";
import AppsIcon from "@mui/icons-material/Apps";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddConstantModal from "./AddConstantModal";
import AddEnumerationModal from "./AddEnumerationModal";

const ADD_CONSTANT = "Add Constant";
const ADD_ENUMERATION = "Add Enumeration";
const ADD_DIRECTIVE = "Add Directive";
const ADD_MODULE = "Add Module";
const ADD_STRUCT = "Add Struct";
const ADD_TYPEDEF = "Add Typedef";
const ADD_UNION = "Add Union";
const ADD_VALUETYPE = "Add Valuetype";

const settings = [
	ADD_CONSTANT,
	ADD_ENUMERATION,
	ADD_DIRECTIVE,
	ADD_MODULE,
	ADD_STRUCT,
	ADD_TYPEDEF,
	ADD_UNION,
	ADD_VALUETYPE,
];

const iconMappings = {
	delete: <DeleteIcon />,
	label: <Label />,
	types: <FolderIcon />,
	boolean: <CheckCircleOutlineIcon />,
	string: <TextFieldsIcon />,
	int: <Filter1Icon />,
	double: <Filter2Icon />,
	char: <FontDownloadIcon />,
	array: <ViewModuleIcon />,
	class: <ClassIcon />,
	method: <FunctionsIcon />,
	module: <AppsIcon />,
	const: <LocalOfferIcon />, // icon for const
	enum: <SupervisorAccountIcon />, // icon for enum
	directive: <InfoIcon />, // icon for directive
	struct: <ClassIcon />, // icon for struct
	union: <LocalOfferIcon />, // icon for union
	discriminator: <ArrowRightIcon />, // icon for discriminator
};

export default function StructureView() {
	const [xmlContent, setXmlContent] = React.useState(null);
	const [anchorElContextMenu, setAnchorElContextMenu] = React.useState(null);
	const [selectedNode, setSelectedNode] = React.useState(null);
	const [isOpenConstModal, setIsOpenConstModal] = React.useState(false);
	const [isOpenEnumModal, setIsOpenEnumModal] = React.useState(false);

	React.useEffect(() => {
		fetchAndSetXmlContent();
	}, []);

	const handleOpenContextMenu = (event, nodeKey, nodeName) => {
		event.stopPropagation();
		event.preventDefault();
		console.log(nodeKey, nodeName);
		if (nodeName.toLowerCase() === "types") {
			setSelectedNode(nodeKey);
			setAnchorElContextMenu(event.currentTarget);
		}
	};

	const handleCloseContextMenu = (setting) => {
		console.log(setting);
		if (setting === ADD_CONSTANT) {
			setIsOpenConstModal(true);
		} else if (setting === ADD_ENUMERATION) {
			setIsOpenEnumModal(true);
		}
		setAnchorElContextMenu(null);
		setSelectedNode(null);
	};

	const fetchAndSetXmlContent = async () => {
		var project = JSON.parse(localStorage.getItem("CurrentProject"));
		if (project) {
			var result = await fetch(`http://localhost:4000/projects/${project.id}`);
			result = await result.json();
			console.log(result.fileContent);
			setXmlContent(result.fileContent);
		}
	};

	async function saveToDatabase(updatedXmlContent) {
		try {
			const project = JSON.parse(localStorage.getItem("CurrentProject"));
			if (project) {
				await fetch(`http://localhost:4000/projects/${project.id}/_save`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: updatedXmlContent,
					}),
				});

				console.log("XML content updated and stored successfully.");
			}
		} catch (error) {
			console.error("Error storing updated XML content:", error);
		}
	}

	const addEnum = async (name, extensibility, dataRepresentation) => {
		console.log(name, extensibility, dataRepresentation);

		const newNode = xmlDoc.createElement("enum");
		newNode.setAttribute("name", name);
		if (extensibility) newNode.setAttribute("extensibility", extensibility);
		if (dataRepresentation)
			newNode.setAttribute("allowed_data_representation", dataRepresentation);

		// Find the <types> element and append the new const node
		const typesNode = xmlDoc.querySelector("types");
		typesNode.appendChild(newNode);

		// Serialize the updated XML content to a string
		const updatedXmlContent = new XMLSerializer().serializeToString(xmlDoc, {
			format: true, // Add formatting (indentation and line breaks)
		});
		console.log(updatedXmlContent);

		// Update the state with the new XML contentss
		setXmlContent(updatedXmlContent);

		// Store the updated XML content using an API (replace the API URL)
		await saveToDatabase(updatedXmlContent);
		setIsOpenConstModal(false); // Close the modal
	};

	const addConstant = async (name, type, value) => {
		console.log(name, type, value);

		// Modify xmlDoc and build the new XML content
		const newNode = xmlDoc.createElement("const");
		newNode.setAttribute("name", name);
		newNode.setAttribute("type", type);
		newNode.setAttribute("value", value);

		// Find the <types> element and append the new const node
		const typesNode = xmlDoc.querySelector("types");
		typesNode.appendChild(newNode);

		// Serialize the updated XML content to a string
		const updatedXmlContent = new XMLSerializer().serializeToString(xmlDoc, {
			format: true, // Add formatting (indentation and line breaks)
		});
		console.log(updatedXmlContent);

		// Update the state with the new XML content
		setXmlContent(updatedXmlContent);

		// Store the updated XML content using an API (replace the API URL)
		await saveToDatabase(updatedXmlContent);
		setIsOpenConstModal(false); // Close the modal
	};

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
	const rootXmlNode = xmlDoc.querySelector("types");
	let idCounter = 1;

	const buildTree = (xmlNode) => {
		const nodeName = xmlNode.nodeName;
		const childNodes = xmlNode.children;
		const nodeKey = nodeName + "-" + idCounter++;

		return (
			<TreeItem
				onContextMenu={(event) =>
					handleOpenContextMenu(event, nodeKey, nodeName)
				}
				key={nodeKey}
				nodeId={nodeKey}
				label={`${nodeName} ${xmlNode.getAttribute("name") ?? ""}`}
				icon={iconMappings[nodeName]}>
				{Array.from(childNodes).map((childNode, index) => (
					<React.Fragment
						key={`${nodeName}-${index}-${xmlNode.getAttribute("name")}`}>
						{buildTree(childNode)}
					</React.Fragment>
				))}
			</TreeItem>
		);
	};
	return (
		<>
			<TreeView
				defaultCollapseIcon={<ArrowDropDownIcon />}
				defaultExpandIcon={<ArrowRightIcon />}>
				{rootXmlNode && buildTree(rootXmlNode)}
			</TreeView>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorElContextMenu}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElContextMenu)}
				onClose={handleCloseContextMenu}>
				{settings.map((setting) => (
					<MenuItem
						key={setting}
						onClick={(event) => {
							handleCloseContextMenu(setting);
						}}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
			<AddConstantModal
				isOpen={isOpenConstModal}
				onClose={() => setIsOpenConstModal(false)}
				onAdd={addConstant}
			/>
			<AddEnumerationModal
				open={isOpenEnumModal}
				onClose={() => setIsOpenEnumModal(false)}
				onAdd={addEnum}
			/>
		</>
	);
}
