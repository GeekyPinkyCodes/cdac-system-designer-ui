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
import { addChildNode, findNodeByAttribute } from "../../utils";

const AddModuleModal = ({ xmlDoc, selectedNode, open, onClose, onAdd }) => {
	const [error, setError] = useState(null);
	const [moduleName, setModuleName] = useState("");
	const [isAutoId, setIsAutoId] = useState(false);
	const [autoId, setAutoId] = useState(null);
	const [isTransferModes, setIsTransferModes] = useState([false]);
	const [transferModes, setTransferModes] = useState([]);
	const [isLanguageBindings, setIsLanguageBindings] = useState([false]);
	const [languageBindings, setLanguageBindings] = useState([]);
	const [isAllowedDataRepresentations, setIsAllowedDataRepresentations] =
		useState([false]);
	const [allowedDataRepresentations, setAllowedDataRepresentations] = useState(
		[]
	);

	const handleClose = () => {
		setModuleName("");
		setAutoId(false);
		setTransferModes([]);
		setLanguageBindings([]);
		setAllowedDataRepresentations([]);
		onClose();
	};

	const addModule = async (
		name,
		autoid,
		transferMode,
		languageBinding,
		dataRepresentation
	) => {
		console.log(
			name,
			autoid,
			transferMode,
			languageBinding,
			dataRepresentation
		);

		const newNode = xmlDoc.createElement("module");
		newNode.setAttribute("name", name);
		if (autoid) newNode.setAttribute("autoid", autoid);
		if (transferMode) newNode.setAttribute("transfer_mode", transferMode);
		if (languageBinding)
			newNode.setAttribute("language_binding", languageBinding);
		if (dataRepresentation)
			newNode.setAttribute("allowed_data_representation", dataRepresentation);

		// Find the <types> element and append the new module node
		var xmlString = addChildNode(xmlDoc, selectedNode, newNode);
		onAdd(xmlString);
	};

	const handleAdd = () => {
		// Call the callback function to add the module with selected options
		var existingNode = findNodeByAttribute(selectedNode, "name", moduleName);
		if (existingNode) {
			setError("Const with same name already exists");
			return;
		}

		addModule(
			moduleName,
			autoId,
			transferModes,
			languageBindings,
			allowedDataRepresentations
		);

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Module</DialogTitle>
			<DialogContent>
				<p style={{ color: "red" }}>{error}</p>
				<TextField
					autoFocus
					margin="dense"
					id="moduleName"
					label="Module Name"
					type="text"
					fullWidth
					value={moduleName}
					onChange={(e) => setModuleName(e.target.value)}
				/>

				<Grid item sm={12}>
					<Grid item sm={6}>
						<Checkbox
							checked={isAutoId}
							onChange={() => setIsAutoId(!isAutoId)}
						/>
					</Grid>
					<Grid item sm={6}>
						<FormControl fullWidth margin="normal">
							<InputLabel>@autoId</InputLabel>
							<Select
								disabled={!isAutoId}
								value={autoId}
								onChange={(e) => setAutoId(e.target.value)}>
								<MenuItem value="hash">HASH</MenuItem>
								<MenuItem value="sequential">SEQUENTIAL</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid item sm={12}>
					<Grid item sm={6}>
						<Checkbox
							checked={isTransferModes}
							onChange={() => setIsTransferModes(!isTransferModes)}
						/>
					</Grid>
					<Grid item sm={6}>
						<FormControl fullWidth margin="normal">
							<InputLabel>@transfer_mode</InputLabel>
							<Select
								disabled={!isTransferModes}
								value={transferModes}
								onChange={(e) => setTransferModes(e.target.value)}>
								<MenuItem value="inband">INBAND</MenuItem>
								<MenuItem value="shmem_ref">SHMEM_REF</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid item sm={12}>
					<Grid item sm={6}>
						<Checkbox
							checked={isLanguageBindings}
							onChange={() => setIsLanguageBindings(!isLanguageBindings)}
						/>
					</Grid>
					<Grid item sm={6}>
						<FormControl fullWidth margin="normal">
							<InputLabel>@language_binding</InputLabel>
							<Select
								disabled={!isLanguageBindings}
								value={languageBindings}
								onChange={(e) => setLanguageBindings(e.target.value)}>
								<MenuItem value="plain">PLAIN</MenuItem>
								<MenuItem value="flat_data">FLAT_DATA</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid item sm={12}>
					<Grid item sm={6}>
						<Checkbox
							checked={isAllowedDataRepresentations}
							onChange={() =>
								setIsAllowedDataRepresentations(!isAllowedDataRepresentations)
							}
						/>
					</Grid>
					<Grid item sm={6}>
						<FormControl fullWidth margin="normal">
							<InputLabel>@allowed_data_representation</InputLabel>
							<Select
								disabled={!isAllowedDataRepresentations}
								value={allowedDataRepresentations}
								onChange={(e) => setAllowedDataRepresentations(e.target.value)}>
								<MenuItem value="xcdr|xcdr2">XCDR|XCDR2</MenuItem>
								<MenuItem value="xcdr">XCDR</MenuItem>
								<MenuItem value="xcdr2">XCDR2</MenuItem>
							</Select>
						</FormControl>
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

export default AddModuleModal;
