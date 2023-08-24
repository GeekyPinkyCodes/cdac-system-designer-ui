import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Grid, InputLabel, Select } from "@mui/material";

const AddEnumerationModal = ({ open, onClose, onAdd }) => {
	const [name, setName] = useState("");
	const [isExtensibility, setIsExtensibility] = useState(false);
	const [extensibility, setExtensibility] = useState(null);
	const [isDataRepresentation, setIsDataRepresentation] = useState(false);
	const [dataRepresentation, setDataRepresentation] = useState(null);

	const handleClose = () => {
		setName("");
		setIsExtensibility(false);
		setDataRepresentation(false);
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the enumeration with selected options
		onAdd(name, extensibility, dataRepresentation);

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add Enumeration</DialogTitle>
			<DialogContent fullWidth>
				<Grid container spacing={2}>
					<Grid item sm={12}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Name"
							type="text"
							fullWidth
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid item sm={12}>
						<Grid item sm={6}>
							<Checkbox
								checked={isExtensibility}
								onChange={() => setIsExtensibility(!isExtensibility)}
							/>
						</Grid>
						<Grid item sm={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel>@extensibility</InputLabel>
								<Select
									disabled={!isExtensibility}
									value={extensibility}
									onChange={(e) => setExtensibility(e.target.value)}>
									<MenuItem value="final">FINAL</MenuItem>
									<MenuItem value="mutable">MUTABLE</MenuItem>
									<MenuItem value="appendable">APPENDABLE</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid item sm={12}>
						<Grid item sm={6}>
							<Checkbox
								checked={isDataRepresentation}
								onChange={() => setIsDataRepresentation(!isDataRepresentation)}
							/>
						</Grid>
						<Grid item sm={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel>@allowed_data_representation</InputLabel>
								<Select
									disabled={!isDataRepresentation}
									value={dataRepresentation}
									onChange={(e) => setDataRepresentation(e.target.value)}>
									<MenuItem value="xcdr/xcdr2">XCDRIXCDR2</MenuItem>
									<MenuItem value="xcdr">XCDR</MenuItem>
									<MenuItem value="xcdr2">XCDR2</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Grid>
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

export default AddEnumerationModal;
