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

	React.useEffect(() => {
		fetchAndSetXmlContent();
	}, []);

	const fetchAndSetXmlContent = async () => {
		var project = JSON.parse(localStorage.getItem("CurrentProject"));
		var result = await fetch(
			`http://localhost:4000/projects/${project.id}/_read`
		);
		result = await result.json();
		console.log(result.content);
		setXmlContent(result.content);
	};

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
	const rootXmlNode = xmlDoc.querySelector("types");

	const buildTree = (xmlNode) => {
		const nodeName = xmlNode.nodeName;
		const childNodes = xmlNode.children;

		return (
			<TreeItem
				key={nodeName}
				nodeId={nodeName}
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
		<TreeView
			defaultCollapseIcon={<ArrowDropDownIcon />}
			defaultExpandIcon={<ArrowRightIcon />}>
			{rootXmlNode && buildTree(rootXmlNode)}
		</TreeView>
	);
}
