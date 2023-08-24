import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddTypedefModal = ({ open, onClose, onAdd }) => {
	const [typedefName, setTypedefName] = useState("");
	const [type, setType] = useState("");

	const handleClose = () => {
		setTypedefName("");
		setType("");
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the typedef
		onAdd({ name: typedefName, type });

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Typedef</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="typedefName"
					label="Typedef Name"
					type="text"
					fullWidth
					value={typedefName}
					onChange={(e) => setTypedefName(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="type"
					label="Type"
					type="text"
					fullWidth
					value={type}
					onChange={(e) => setType(e.target.value)}
				/>
			</DialogContent>
			<div style={{ padding: "16px" }}>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary">
					Add
				</Button>
			</div>
		</Dialog>
	);
};

export default AddTypedefModal;
