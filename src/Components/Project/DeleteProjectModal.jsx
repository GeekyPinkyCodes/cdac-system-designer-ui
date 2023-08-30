import React from "react";
import { Modal, Paper, Button } from "@mui/material";
import { deleteProjectById } from "../utils";

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

const DeleteProjectModal = ({ isOpen, project, onCancel, onDelete }) => {
	React.useEffect(() => {
		// This effect will be triggered whenever the value of project changes.
		// You can use it to force a rerender.
	}, [project]); // Add project to the dependency array

	const handleDeleteProject = async () => {
		deleteProjectById(project.id);
		onDelete();
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
