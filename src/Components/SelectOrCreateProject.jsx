import React, { useState, useEffect } from "react";
import {
	Button,
	Modal,
	Paper,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import CreateProjectModal from "./CreateProjectModal"; // Import the new modal component

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

const SelectOrCreateProject = ({ onCreate, isOpen, onClose }) => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);
	const [projectDetails, setProjectDetails] = useState(null);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	useEffect(() => {
		// Clear selected project and details when the modal is opened
		if (isOpen) {
			fetchProjects();
			setSelectedProject(null);
			setProjectDetails(null);
		}
	}, [isOpen]);

	const fetchProjectDetails = async (projectId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/projects/${projectId}`
			);
			const data = await response.json();
			console.log(data);
			setProjectDetails(data);
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
		setSelectedProject(projectId);
		fetchProjectDetails(projectId);
	};

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	console.log(projects);

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Paper style={modalPaperStyle}>
				<div className="modal">
					<h2>Select or Create Project</h2>
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
					<Button onClick={handleOpenCreateModal} color="primary">
						Create New Project
					</Button>
					{selectedProject && (
						<div>
							<h3>Project Details</h3>
							{projectDetails ? (
								<div>
									<p>Project Name: {projectDetails.name}</p>
									<p>File Name: {projectDetails.fileName}</p>
								</div>
							) : (
								<p>Loading project details...</p>
							)}
						</div>
					)}
					<Button onClick={onClose} color="primary">
						Close
					</Button>
				</div>
			</Paper>
			{/* <CreateProjectModal
				isOpen={isCreateModalOpen}
				onClose={handleCloseCreateModal}
				onCreate={(newProjectName) => {
					onCreate(newProjectName);
					handleCloseCreateModal();
				}}
			/> */}
		</Modal>
	);
};

export default SelectOrCreateProject;
