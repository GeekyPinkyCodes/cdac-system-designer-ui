import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import StructureView from "./Views/StructureView";

function CustomTabPanel(props) {
	const { children, value, index, project, ...other } = props;

	useEffect(() => {
		// This effect will be triggered whenever the value of currentProject changes.
		// You can use it to force a rerender.
	}, [project]); // Add currentProject to the dependency array

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
	project: PropTypes.any,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function ProjectExplorer({ project, onUpdate }) {
	const [value, setValue] = React.useState(0);

	useEffect(() => {
		// This effect will be triggered whenever the value of project changes.
		// You can use it to force a rerender.
	}, [project]); // Add project to the dependency array

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
						<Tab label="Types" {...a11yProps(0)} />
						<Tab label="Qos" {...a11yProps(1)} />
						<Tab label="Domain" {...a11yProps(2)} />
						<Tab label="Participant" {...a11yProps(2)} />
					</Tabs>
				</Box>
				{project && (
					<CustomTabPanel value={value} index={0} project={project}>
						<StructureView project={project} onUpdate={onUpdate} />
					</CustomTabPanel>
				)}
			</Paper>
		</>
	);
}

export default ProjectExplorer;
