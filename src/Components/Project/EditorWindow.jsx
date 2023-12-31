import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import XmlView from "./Views/XmlView";
import StructureView from "./Views/StructureView";
import XmlToIdlConverter from "./Views/XmlToIdlConverter";
import XmlToJsonConverter from "./Views/XmlToJsonConverter";

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

export default function EditorWindow({ project, onUpdate }) {
	const [value, setValue] = React.useState(0);
	const [xmlContent, setXmlContent] = React.useState(null);

	React.useEffect(() => {
		if (project) {
			setXmlContent(project.fileContent);
		}
	}, [project]);

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
					<StructureView project={project} onUpdate={onUpdate} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<XmlView xmlContent={xmlContent} />
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
