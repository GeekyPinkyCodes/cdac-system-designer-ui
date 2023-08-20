import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Paper, TextField } from "@mui/material";
import FilesList from "./FilesList";
import DynamicTreeView from "./DynamicTreeView";

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

const files = ["file1.txt", "document.pdf", "image.jpg", "video.mp4"];
const xmlFile = `<food>
<name>Belgian Waffles</name>
<price>$5.95</price>
<description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
<calories>650</calories>
</food>`;

export default function ProjectExplorer() {
	const [value, setValue] = React.useState(0);
	const [searchText, setSearchText] = React.useState("");

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
				{/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TextField
						sx={{
							marginLeft: 20,
							width: 300,
						}}
						label="Search"
						variant="outlined"
						fullWidth
						margin="normal"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}></TextField>
				</Box> */}
				<CustomTabPanel value={value} index={0}>
					<FilesList files={files} />
					{/* <DynamicTreeView initialXmlInput={xmlFile} /> */}
				</CustomTabPanel>
			</Paper>
		</>
	);
}