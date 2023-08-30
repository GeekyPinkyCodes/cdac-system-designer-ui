import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { addChildNode } from "../../utils";

const AddStructModal = ({ xmlDoc, selectedNode, open, onClose, onAdd }) => {
	const [structName, setStructName] = useState("");
	const [baseType, setBaseType] = useState("");

	const handleClose = () => {
		setStructName("");
		setBaseType("");
		onClose();
	};

	const addStruct = async (
		name,
		baseType,
		nested,
		extensibility,
		autoid,
		transferMode,
		languageBinding,
		dataRepresentation
	) => {
		console.log(
			name,
			baseType,
			nested,
			extensibility,
			autoid,
			transferMode,
			languageBinding,
			dataRepresentation
		);

		const newNode = xmlDoc.createElement("struct");
		newNode.setAttribute("name", name);
		if (baseType) newNode.setAttribute("base_type", baseType);
		if (nested) newNode.setAttribute("nested", nested);
		if (extensibility) newNode.setAttribute("extensibility", extensibility);
		if (autoid) newNode.setAttribute("autoid", autoid);
		if (transferMode) newNode.setAttribute("transfer_mode", transferMode);
		if (languageBinding)
			newNode.setAttribute("language_binding", languageBinding);
		if (dataRepresentation)
			newNode.setAttribute("allowed_data_representation", dataRepresentation);

		var xmlString = addChildNode(xmlDoc, selectedNode, newNode);
		onAdd(xmlString);
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the struct
		addStruct(structName, baseType);
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
				<Grid item xs={12} md={6}>
					<FormControl fullWidth margin="normal">
						<InputLabel>Type</InputLabel>
						<Select
							value={baseType}
							onChange={(e) => setBaseType(e.target.value)}>
							<MenuItem value="NewStruct1">NewStruct1</MenuItem>
							<MenuItem value="HostType">HostType</MenuItem>
						</Select>
					</FormControl>
				</Grid>
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
