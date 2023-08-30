import React, { useState } from "react";
import { Modal, Paper, TextField, Button } from "@mui/material";
import { createProject } from "../utils";

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

const CreateProjectModal = ({ isOpen, onClose, onUpdate }) => {
	const [newProjectName, setNewProjectName] = useState("");
	const handleCreateProject = async () => {
		if (newProjectName.trim() !== "") {
			const project = await createProject(newProjectName);
			onUpdate(project);
			console.log(JSON.stringify(project.name) + " Created!!!");
			onClose();
		}
	};

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Paper style={modalPaperStyle}>
				<div className="modal">
					<h2>Create New Project</h2>
					<TextField
						label="Project Name"
						value={newProjectName}
						onChange={(e) => setNewProjectName(e.target.value)}
						fullWidth
					/>
					<Button onClick={handleCreateProject} color="primary">
						Create
					</Button>
					<Button onClick={onClose} color="secondary">
						Cancel
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default CreateProjectModal;
