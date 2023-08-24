import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddStructModal = ({ open, onClose, onAdd }) => {
	const [structName, setStructName] = useState("");
	const [baseType, setBaseType] = useState("");

	const handleClose = () => {
		setStructName("");
		setBaseType("");
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the struct
		onAdd({ name: structName, baseType });

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Struct</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="structName"
					label="Struct Name"
					type="text"
					fullWidth
					value={structName}
					onChange={(e) => setStructName(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="baseType"
					label="Base Type"
					type="text"
					fullWidth
					value={baseType}
					onChange={(e) => setBaseType(e.target.value)}
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

export default AddStructModal;
