import React, { useState, useEffect } from "react";
import {
	Button,
	Modal,
	Paper,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

const modalPaperStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	padding: 20,
	backgroundColor: "white",
	outline: "none",
};

const OpenProjectModal = ({ isOpen, onClose }) => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Clear selected project and details when the modal is opened
		if (isOpen) {
			fetchProjects();
		}
	}, [isOpen]);

	const fetchProjectDetails = async (projectId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/projects/${projectId}`
			);
			const data = await response.json();
			console.log(data);
			localStorage.setItem("CurrentProject", JSON.stringify(data));
		} catch (error) {
			console.error("Error fetching project details:", error);
		}
	};

	const fetchProjects = async () => {
		// Replace this with your actual API call to fetch project details
		try {
			const response = await fetch(`http://localhost:4000/projects`);
			const data = await response.json();
			console.log(data);
			setProjects(data);
		} catch (error) {
			console.error("Error fetching project details:", error);
		}
	};

	const handleProjectClick = (projectId) => {
		fetchProjectDetails(projectId);
		onClose();
	};

	console.log(projects);

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Paper style={modalPaperStyle}>
				<div className="modal">
					<h2>Select Project</h2>
					<List>
						{projects.map((project) => (
							<ListItem
								button
								key={project.id}
								onClick={() => handleProjectClick(project.id)}>
								<ListItemText primary={project.name} />
							</ListItem>
						))}
					</List>
					<Button onClick={onClose} color="primary">
						Close
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default OpenProjectModal;
