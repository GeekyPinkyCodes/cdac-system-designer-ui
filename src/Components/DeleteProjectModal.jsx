import React from "react";
import { Modal, Paper, Button } from "@mui/material";

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

const DeleteProjectModal = ({ isOpen, project, onCancel }) => {
	const handleDeleteProject = async () => {
		console.log(project && project.name + " Deleted!!!");
		await fetch("http://localhost:4000/projects/" + project.id, {
			method: "delete",
		});
		localStorage.removeItem("CurrentProject");
		onCancel();
	};

	return (
		<Modal open={isOpen} onClose={onCancel}>
			<Paper style={modalPaperStyle}>
				<div className="modal">
					<h2>Delete Project</h2>
					<p>
						Are you sure you want to delete the project "
						{project && project.name}"? This action cannot be undone.
					</p>
					<Button onClick={handleDeleteProject} color="secondary">
						Delete
					</Button>
					<Button onClick={onCancel} color="primary">
						Cancel
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default DeleteProjectModal;
