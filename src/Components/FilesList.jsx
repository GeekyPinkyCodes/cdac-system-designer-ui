import React from "react";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import { Description as FileIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FilesList = ({ files }) => {
	return (
		<List>
			{files.map((file, index) => (
				<div key={index}>
					<ListItem>
						<ListItemIcon>
							<FileIcon />
						</ListItemIcon>
						<ListItemText primary={file} />
					</ListItem>
					{index < files.length - 1 && <Divider />}
				</div>
			))}
		</List>
	);
};

export default FilesList;
