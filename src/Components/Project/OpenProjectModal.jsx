import React, { useState, useEffect } from "react";
import {
	Button,
	Modal,
	Paper,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { fetchProjectById, fetchProjects } from "../utils";

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

const OpenProjectModal = ({ isOpen, onClose, onUpdate }) => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Clear selected project and details when the modal is opened
		if (isOpen) {
			fetchAndLoadProjects();
		}
	}, [isOpen]);

	const fetchAndLoadProjects = async () => {
		const projects = await fetchProjects();
		setProjects(projects);
	};

	const handleProjectClick = async (projectId) => {
		const project = await fetchProjectById(projectId);
		onUpdate(project);
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
