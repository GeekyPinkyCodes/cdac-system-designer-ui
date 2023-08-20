import * as React from "react";
import { Grid } from "@mui/material";
import ProjectExplorer from "./ProjectExplorer";
import EditorWindow from "./EditorWindow";
import SelectOrCreateProject from "./SelectOrCreateProject";

export default function ProjectWindow() {
	const [value, setValue] = React.useState(0);
	const [searchText, setSearchText] = React.useState("");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const codeExample = `
    function greeting() {
      console.log('Hello, world!');
    }
  `;
	const language = "js";
	const projectList = [
		{
			id: 1,
			name: "TestProject1",
		},
		{
			id: 2,
			name: "TestProject2",
		},
	];

	const onCreateProject = (projectName) => {
		console.log("Create Project" + projectName);
	};

	return (
		<Grid container spacing={1}>
			{/* <SelectOrCreateProject
				projects={projectList}
				onCreate={onCreateProject}

			/> */}
			<Grid item xs={4}>
				<ProjectExplorer />
			</Grid>
			<Grid item xs={8}>
				<EditorWindow language={language} content={codeExample} />
			</Grid>
		</Grid>
	);
}
