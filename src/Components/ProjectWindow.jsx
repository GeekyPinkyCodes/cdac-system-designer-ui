import * as React from "react";
import { Grid } from "@mui/material";
import ProjectExplorer from "./ProjectExplorer";
import EditorWindow from "./EditorWindow";

export default function ProjectWindow() {
	return (
		<Grid container spacing={1}>
			<Grid item xs={4}>
				<ProjectExplorer />
			</Grid>
			<Grid item xs={8}>
				<EditorWindow />
			</Grid>
		</Grid>
	);
}
