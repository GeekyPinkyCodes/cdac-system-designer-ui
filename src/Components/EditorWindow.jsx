import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import CodeBlock from "./CodeBlock";
import DynamicTreeView from "./DynamicTreeView";
import XmlToIdlConverter from "./XmlToIdlConverter";
import XmlToJsonConverter from "./XmlToJsonConverter";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function EditorWindow(props) {
	const [value, setValue] = React.useState(0);
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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Paper>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example">
						<Tab label="Structure" {...a11yProps(0)} />
						<Tab label="XML" {...a11yProps(1)} />
						<Tab label="IDL" {...a11yProps(2)} />
						<Tab label="JSON" {...a11yProps(3)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<DynamicTreeView />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<CodeBlock language={"xml"} code={xmlContent} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					<XmlToIdlConverter xmlContent={xmlContent} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={3}>
					<XmlToJsonConverter xmlContent={xmlContent} />
				</CustomTabPanel>
			</Paper>
		</>
	);
}
