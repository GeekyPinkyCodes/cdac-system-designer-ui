import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AddDirectiveModal = ({ open, onClose, onAdd }) => {
	const [directiveKind, setDirectiveKind] = useState("");
	const [directiveValue, setDirectiveValue] = useState("");

	const handleClose = () => {
		setDirectiveKind("");
		setDirectiveValue("");
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the directive
		onAdd({ kind: directiveKind, value: directiveValue });

		// Clear the fields
		setDirectiveKind("");
		setDirectiveValue("");
	};

	const handleAddAndClose = () => {
		handleAdd();
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Directive</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<InputLabel>Directive Kind</InputLabel>
					<Select
						value={directiveKind}
						onChange={(e) => setDirectiveKind(e.target.value)}
						label="Directive Kind">
						<MenuItem value="DIRECTIVE_1">Directive 1</MenuItem>
						<MenuItem value="DIRECTIVE_2">Directive 2</MenuItem>
						<MenuItem value="DIRECTIVE_3">Directive 3</MenuItem>
						{/* Add more directive options as needed */}
					</Select>
				</FormControl>
				<TextField
					margin="dense"
					id="directiveValue"
					label="Directive Value"
					type="text"
					fullWidth
					value={directiveValue}
					onChange={(e) => setDirectiveValue(e.target.value)}
				/>
			</DialogContent>
			<div style={{ padding: "16px" }}>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary">
					Add More
				</Button>
				<Button onClick={handleAddAndClose} color="primary">
					OK
				</Button>
			</div>
		</Dialog>
	);
};

export default AddDirectiveModal;
