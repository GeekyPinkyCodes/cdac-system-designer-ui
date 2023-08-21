import React, { useState } from "react";
import { Modal, Paper, TextField, Button } from "@mui/material";

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

const CreateProjectModal = ({ isOpen, onClose }) => {
	const [newProjectName, setNewProjectName] = useState("");
	const handleCreateProject = async () => {
		if (newProjectName.trim() !== "") {
			let result = await fetch("http://localhost:4000/projects", {
				method: "post",
				body: JSON.stringify({ name: newProjectName }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			result = await result.json();
			localStorage.setItem("CurrentProject", JSON.stringify(result));
			console.log(JSON.stringify(result) + " Created!!!");
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
