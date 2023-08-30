import * as React from "react";
import { Grid } from "@mui/material";
import ProjectExplorer from "./ProjectExplorer";
import EditorWindow from "./EditorWindow";

export default function ProjectWindow({ project, onUpdate }) {
	React.useEffect(() => {
		// This effect will be triggered whenever the value of project changes.
		// You can use it to force a rerender.
	}, [project]); // Add project to the dependency array

	return (
		<Grid container spacing={1}>
			<Grid item xs={4}>
				{project && <ProjectExplorer project={project} onUpdate={onUpdate} />}
			</Grid>
			<Grid item xs={8}>
				{project && <EditorWindow project={project} onUpdate={onUpdate} />}
			</Grid>
		</Grid>
	);
}
