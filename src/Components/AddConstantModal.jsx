import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid, Paper } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";

const modalPaperStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600, // Adjusted width
	maxHeight: "80vh", // Adjusted height to 80% of the viewport height
	padding: 20,
	backgroundColor: "white",
	outline: "none",
	overflowY: "auto", // Scrollable content
};

const AddConstantModal = ({ isOpen, onClose, onAdd }) => {
	const [constantName, setConstantName] = useState("");
	const [constantType, setConstantType] = useState("");
	const [constantValue, setConstantValue] = useState("");

	const handleAdd = () => {
		// Validate data if needed
		// Call the onAdd callback with the new constant data
		onAdd(constantName, constantType, constantValue);

		// Reset fields and close the modal
		setConstantName("");
		setConstantType("");
		setConstantValue("");
		onClose();
	};

	return (
		<Modal open={isOpen} onClose={onClose}>
			<div style={modalPaperStyle}>
				<div className="modal">
					<h2>Add Constant</h2>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Name"
								value={constantName}
								onChange={(e) => setConstantName(e.target.value)}
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel>Type</InputLabel>
								<Select
									value={constantType}
									onChange={(e) => setConstantType(e.target.value)}>
									<MenuItem value="string">String</MenuItem>
									<MenuItem value="number">Number</MenuItem>
									<MenuItem value="boolean">Boolean</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								label="Value"
								value={constantValue}
								onChange={(e) => setConstantValue(e.target.value)}
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={8} flexGrow>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: 20,
								}}>
								<Button variant="contained" onClick={handleAdd}>
									Add
								</Button>
								<Button
									variant="outlined"
									onClick={onClose}
									style={{ marginLeft: 20 }}>
									Cancel
								</Button>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</Modal>
	);
};

export default AddConstantModal;
