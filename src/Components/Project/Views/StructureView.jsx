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
import AddConstantModal from "../Types/AddConstantModal";
import AddEnumerationModal from "../Types/AddEnumerationModal";
import AddModuleModal from "../Types/AddModuleModal";
import AddStructModal from "../Types/AddStructModal";
import AddDirectiveModal from "../Types/AddDirectiveModal";
import AddTypedefModal from "../Types/AddTypedefModal";
import AddUnionModal from "../Types/AddUnionModal";
import AddValueTypeModal from "../Types/AddValueTypeModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ADD_CONSTANT = "Add Constant";
const ADD_ENUMERATION = "Add Enumeration";
const ADD_DIRECTIVE = "Add Directive";
const ADD_MODULE = "Add Module";
const ADD_STRUCT = "Add Struct";
const ADD_TYPEDEF = "Add Typedef";
const ADD_UNION = "Add Union";
const ADD_VALUETYPE = "Add ValueType";

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

export default function StructureView({ project, onUpdate }) {
	const [xmlContent, setXmlContent] = React.useState(null);
	const [anchorElTypesContextMenu, setAnchorElTypesContextMenu] =
		React.useState(null);
	const [anchorElModuleContextMenu, setAnchorElModuleContextMenu] =
		React.useState(null);
	const [selectedNode, setSelectedNode] = React.useState(null);
	const [isOpenConstModal, setIsOpenConstModal] = React.useState(false);
	const [isOpenEnumModal, setIsOpenEnumModal] = React.useState(false);
	const [isOpenModuleModal, setIsOpenModuleModal] = React.useState(false);
	const [isOpenStructModal, setIsOpenStructModal] = React.useState(false);
	const [isOpenDirectiveModal, setIsOpenDirectiveModal] = React.useState(false);
	const [isOpenTypedefModal, setIsOpenTypedefModal] = React.useState(false);
	const [isOpenUnionModal, setIsOpenUnionModal] = React.useState(false);
	const [isOpenValueTypeModal, setIsOpenValueTypeModal] = React.useState(false);

	React.useEffect(() => {
		if (project) setXmlContent(project.fileContent);
	}, []);

	const handleOnAdd = (updatedXmlContent) => {
		project.fileContent = updatedXmlContent;
		onUpdate(project);
		setXmlContent(updatedXmlContent);
	};

	const handleOpenContextMenu = (event, nodeKey, xmlNode) => {
		event.stopPropagation();
		event.preventDefault();
		const nodeName = xmlNode.nodeName;
		setSelectedNode(xmlNode);
		if (nodeName.toLowerCase() === "types") {
			console.log(event.currentTarget);
			setAnchorElTypesContextMenu(event.currentTarget);
		} else if (nodeName.toLowerCase() === "module") {
			setAnchorElModuleContextMenu(event.currentTarget);
		}
	};

	const handleTypesCloseContextMenu = (setting) => {
		console.log(setting);
		if (setting === ADD_CONSTANT) {
			setIsOpenConstModal(true);
		} else if (setting === ADD_ENUMERATION) {
			setIsOpenEnumModal(true);
		} else if (setting === ADD_DIRECTIVE) {
			setIsOpenDirectiveModal(true);
		} else if (setting === ADD_MODULE) {
			setIsOpenModuleModal(true);
		} else if (setting === ADD_STRUCT) {
			setIsOpenStructModal(true);
		} else if (setting === ADD_TYPEDEF) {
			setIsOpenTypedefModal(true);
		} else if (setting === ADD_UNION) {
			setIsOpenUnionModal(true);
		} else if (setting === ADD_VALUETYPE) {
			setIsOpenValueTypeModal(true);
		}
		setAnchorElTypesContextMenu(null);
	};

	const handleModuleCloseContextMenu = (setting) => {
		console.log(setting);
		if (setting === ADD_CONSTANT) {
			setIsOpenConstModal(true);
		} else if (setting === ADD_ENUMERATION) {
			setIsOpenEnumModal(true);
		} else if (setting === ADD_DIRECTIVE) {
			setIsOpenDirectiveModal(true);
		} else if (setting === ADD_MODULE) {
			setIsOpenModuleModal(true);
		} else if (setting === ADD_STRUCT) {
			setIsOpenStructModal(true);
		} else if (setting === ADD_TYPEDEF) {
			setIsOpenTypedefModal(true);
		} else if (setting === ADD_UNION) {
			setIsOpenUnionModal(true);
		} else if (setting === ADD_VALUETYPE) {
			setIsOpenValueTypeModal(true);
		}
		setAnchorElModuleContextMenu(null);
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
					handleOpenContextMenu(event, nodeKey, xmlNode)
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
				// defaultCollapseIcon={<ExpandMoreIcon />}
				defaultCollapseIcon={<ArrowDropDownIcon />}
				defaultExpandIcon={<ArrowRightIcon />}>
				{rootXmlNode && buildTree(rootXmlNode)}
			</TreeView>
			<Menu
				sx={{ mt: "45px" }}
				id="types-context-menu"
				anchorEl={anchorElTypesContextMenu}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElTypesContextMenu)}
				onClose={handleTypesCloseContextMenu}>
				{settings.map((setting) => (
					<MenuItem
						key={setting}
						onClick={(event) => {
							handleTypesCloseContextMenu(setting);
						}}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>

			<Menu
				sx={{ mt: "45px" }}
				id="module-context-menu"
				anchorEl={anchorElModuleContextMenu}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElModuleContextMenu)}
				onClose={handleModuleCloseContextMenu}>
				{settings.map((setting) => (
					<MenuItem
						key={setting}
						onClick={(event) => {
							handleModuleCloseContextMenu(setting);
						}}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>

			<AddConstantModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				isOpen={isOpenConstModal}
				onClose={() => setIsOpenConstModal(false)}
				onAdd={handleOnAdd}
			/>
			<AddDirectiveModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenDirectiveModal}
				onClose={() => setIsOpenDirectiveModal(false)}
				onAdd={handleOnAdd}
			/>
			<AddEnumerationModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenEnumModal}
				onClose={() => setIsOpenEnumModal(false)}
				onAdd={handleOnAdd}
			/>
			<AddModuleModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenModuleModal}
				onClose={() => setIsOpenModuleModal(false)}
				onAdd={handleOnAdd}
			/>
			<AddStructModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenStructModal}
				onClose={() => setIsOpenStructModal(false)}
				onAdd={handleOnAdd}
			/>

			<AddTypedefModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenTypedefModal}
				onClose={() => setIsOpenTypedefModal(false)}
				onAdd={handleOnAdd}
			/>
			{/* <AddUnionModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenUnionModal}
				onClose={() => setIsOpenUnionModal(false)}
				onAdd={handleOnAdd}
			/> */}
			{/* <AddValueTypeModal
				xmlDoc={xmlDoc}
				selectedNode={selectedNode}
				open={isOpenValueTypeModal}
				onClose={() => setIsOpenValueTypeModal(false)}
				onAdd={handleOnAdd}
			/> */}
		</>
	);
}
